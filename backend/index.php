<?php
// Building in Public - PHP REST API (front controller).
//
// Routes (prefix with your deploy path, e.g. /api):
//   GET    /content                 list (filters: platform, category, content_type, featured, search, limit, offset, sort)
//   POST   /content                 create
//   GET    /content/{id}            single
//   PUT    /content/{id}            full update
//   PATCH  /content/{id}            partial update
//   DELETE /content/{id}            delete
//   POST   /content/{id}/feature    toggle / set featured  { "featured": true }
//   POST   /import                  { "url": "..." } -> draft metadata (no scraping)
//   GET    /meta                    categories / platforms / content types
//   GET    /projects/{slug}/content related content for a project
//
// Write operations honor ADMIN_TOKEN (X-Admin-Token header) when set.

declare(strict_types=1);

require __DIR__ . '/db.php';
require __DIR__ . '/platform.php';

cors();

const PLATFORMS      = ['x', 'tiktok', 'instagram', 'linkedin', 'youtube', 'blog'];
const CONTENT_TYPES  = ['video', 'article', 'thread', 'post', 'insight'];
const CATEGORIES     = ['Development', 'Building Products', 'Founder Journey', 'Tutorials', 'Career', 'Freelancing', 'Content Creation'];

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Resolve the path either from PATH_INFO (pretty URLs) or ?path= fallback.
$path = $_SERVER['PATH_INFO'] ?? ($_GET['path'] ?? '/');
$path = '/' . trim((string) $path, '/');
$segments = $path === '/' ? [] : explode('/', ltrim($path, '/'));

try {
    // /meta
    if ($segments === ['meta']) {
        json_response([
            'platforms'     => PLATFORMS,
            'content_types' => CONTENT_TYPES,
            'categories'    => CATEGORIES,
        ]);
    }

    // /import
    if ($segments === ['import'] && $method === 'POST') {
        require_admin();
        $body = read_json_body();
        $url  = trim((string) ($body['url'] ?? ''));
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            json_response(['error' => 'A valid url is required'], 422);
        }
        json_response(['draft' => import_metadata($url)]);
    }

    // /projects/{slug}/content
    if (count($segments) === 3 && $segments[0] === 'projects' && $segments[2] === 'content') {
        $slug = $segments[1];
        $stmt = db()->prepare(
            'SELECT c.* FROM content c
             JOIN project_content pc ON pc.content_id = c.id
             WHERE pc.project_slug = ?
             ORDER BY pc.position ASC'
        );
        $stmt->execute([$slug]);
        json_response(['data' => array_map('serialize_content', $stmt->fetchAll())]);
    }

    // /content ...
    if (($segments[0] ?? '') === 'content') {
        // /content
        if (count($segments) === 1) {
            if ($method === 'GET')  list_content();
            if ($method === 'POST') create_content();
            json_response(['error' => 'Method not allowed'], 405);
        }

        $id = (int) ($segments[1] ?? 0);
        if ($id <= 0) {
            json_response(['error' => 'Invalid id'], 400);
        }

        // /content/{id}/feature
        if (count($segments) === 3 && $segments[2] === 'feature' && $method === 'POST') {
            feature_content($id);
        }

        // /content/{id}
        if (count($segments) === 2) {
            if ($method === 'GET')                       get_content($id);
            if ($method === 'PUT' || $method === 'PATCH') update_content($id, $method === 'PATCH');
            if ($method === 'DELETE')                    delete_content($id);
        }

        json_response(['error' => 'Method not allowed'], 405);
    }

    json_response(['error' => 'Not found'], 404);
} catch (Throwable $e) {
    json_response(['error' => 'Server error', 'detail' => $e->getMessage()], 500);
}

// ---------------------------------------------------------------------------

function serialize_content(array $r): array
{
    return [
        'id'            => (int) $r['id'],
        'title'         => $r['title'],
        'slug'          => $r['slug'],
        'excerpt'       => $r['excerpt'],
        'description'   => $r['description'],
        'featuredImage' => $r['featured_image'],
        'platform'      => $r['platform'],
        'contentType'   => $r['content_type'],
        'category'      => $r['category'],
        'sourceUrl'     => $r['source_url'],
        'embedUrl'      => $r['embed_url'],
        'publishedDate' => $r['published_date'],
        'views'         => (int) $r['views'],
        'featured'      => (bool) ((int) $r['featured']),
        'createdAt'     => $r['created_at'] ?? null,
        'updatedAt'     => $r['updated_at'] ?? null,
    ];
}

function list_content(): void
{
    $where  = [];
    $params = [];

    foreach (['platform' => 'platform', 'category' => 'category', 'content_type' => 'content_type'] as $q => $col) {
        if (!empty($_GET[$q])) {
            $where[]      = "$col = ?";
            $params[]     = $_GET[$q];
        }
    }
    if (isset($_GET['featured']) && $_GET['featured'] !== '') {
        $where[]  = 'featured = ?';
        $params[] = filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }
    if (!empty($_GET['search'])) {
        $where[]  = '(title LIKE ? OR excerpt LIKE ? OR description LIKE ? OR category LIKE ?)';
        $term     = '%' . $_GET['search'] . '%';
        array_push($params, $term, $term, $term, $term);
    }

    $sql = 'SELECT * FROM content';
    if ($where) {
        $sql .= ' WHERE ' . implode(' AND ', $where);
    }

    $sort = $_GET['sort'] ?? 'recent';
    $sql .= $sort === 'popular' ? ' ORDER BY views DESC' : ' ORDER BY published_date DESC, id DESC';

    $limit  = max(1, min(100, (int) ($_GET['limit'] ?? 50)));
    $offset = max(0, (int) ($_GET['offset'] ?? 0));
    $sql   .= " LIMIT $limit OFFSET $offset";

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    json_response(['data' => array_map('serialize_content', $stmt->fetchAll())]);
}

function get_content(int $id): void
{
    $stmt = db()->prepare('SELECT * FROM content WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        json_response(['error' => 'Not found'], 404);
    }
    json_response(['data' => serialize_content($row)]);
}

function validate_payload(array $b, bool $partial): array
{
    $out = [];
    $map = [
        'title' => 'title', 'excerpt' => 'excerpt', 'description' => 'description',
        'featuredImage' => 'featured_image', 'platform' => 'platform',
        'contentType' => 'content_type', 'category' => 'category',
        'sourceUrl' => 'source_url', 'embedUrl' => 'embed_url',
        'publishedDate' => 'published_date', 'views' => 'views', 'featured' => 'featured',
        'slug' => 'slug',
    ];
    foreach ($map as $in => $col) {
        if (array_key_exists($in, $b)) {
            $out[$col] = $b[$in];
        }
    }
    if (!$partial && empty($out['title'])) {
        json_response(['error' => 'title is required'], 422);
    }
    if (isset($out['platform']) && !in_array($out['platform'], PLATFORMS, true)) {
        json_response(['error' => 'invalid platform'], 422);
    }
    if (isset($out['content_type']) && !in_array($out['content_type'], CONTENT_TYPES, true)) {
        json_response(['error' => 'invalid content_type'], 422);
    }
    if (isset($out['featured'])) {
        $out['featured'] = filter_var($out['featured'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }
    return $out;
}

function create_content(): void
{
    require_admin();
    $b    = read_json_body();
    $data = validate_payload($b, false);
    $data['slug'] = !empty($data['slug']) ? slugify((string) $data['slug']) : slugify((string) $data['title']);

    // ensure unique slug
    $data['slug'] = unique_slug($data['slug']);

    $cols = array_keys($data);
    $ph   = implode(', ', array_fill(0, count($cols), '?'));
    $sql  = 'INSERT INTO content (' . implode(', ', $cols) . ") VALUES ($ph)";
    $stmt = db()->prepare($sql);
    $stmt->execute(array_values($data));

    get_content((int) db()->lastInsertId());
}

function update_content(int $id, bool $partial): void
{
    require_admin();
    $data = validate_payload(read_json_body(), $partial);
    if (!$data) {
        json_response(['error' => 'nothing to update'], 422);
    }
    if (isset($data['slug'])) {
        $data['slug'] = unique_slug(slugify((string) $data['slug']), $id);
    }
    $set    = implode(', ', array_map(fn ($c) => "$c = ?", array_keys($data)));
    $params = array_values($data);
    $params[] = $id;
    $stmt = db()->prepare("UPDATE content SET $set WHERE id = ?");
    $stmt->execute($params);
    get_content($id);
}

function feature_content(int $id): void
{
    require_admin();
    $b = read_json_body();
    $featured = array_key_exists('featured', $b)
        ? (filter_var($b['featured'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0)
        : null;
    if ($featured === null) {
        // toggle
        $stmt = db()->prepare('UPDATE content SET featured = NOT featured WHERE id = ?');
        $stmt->execute([$id]);
    } else {
        $stmt = db()->prepare('UPDATE content SET featured = ? WHERE id = ?');
        $stmt->execute([$featured, $id]);
    }
    get_content($id);
}

function delete_content(int $id): void
{
    require_admin();
    $stmt = db()->prepare('DELETE FROM content WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['deleted' => $id]);
}

function unique_slug(string $slug, ?int $ignoreId = null): string
{
    $base = $slug;
    $i    = 1;
    while (true) {
        $sql  = 'SELECT id FROM content WHERE slug = ?' . ($ignoreId ? ' AND id <> ?' : '');
        $stmt = db()->prepare($sql);
        $stmt->execute($ignoreId ? [$slug, $ignoreId] : [$slug]);
        if (!$stmt->fetch()) {
            return $slug;
        }
        $slug = $base . '-' . (++$i);
    }
}
