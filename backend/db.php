<?php
// Database connection (PDO) + shared HTTP helpers.
// Configuration is read from environment variables (see .env.example).

declare(strict_types=1);

function env(string $key, ?string $default = null): ?string
{
    $val = getenv($key);
    return ($val === false || $val === '') ? $default : $val;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env('DB_HOST', '127.0.0.1');
    $port = env('DB_PORT', '3306');
    $name = env('DB_NAME', 'yuki_content');
    $user = env('DB_USER', 'root');
    $pass = env('DB_PASS', '');

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        json_response(['error' => 'Database connection failed'], 500);
    }
    return $pdo;
}

function cors(): void
{
    // Allow the configured frontend origin (comma-separated list) or all in dev.
    $allowed = env('CORS_ORIGIN', '*');
    $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($allowed === '*' || $origin === '') {
        header('Access-Control-Allow-Origin: *');
    } else {
        $list = array_map('trim', explode(',', $allowed));
        if (in_array($origin, $list, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token');

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// Optional shared-secret guard for write operations.
// Set ADMIN_TOKEN in the environment to require it; leave empty to disable.
function require_admin(): void
{
    $token = env('ADMIN_TOKEN', '');
    if ($token === null || $token === '') {
        return; // auth disabled
    }
    $provided = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
    if (!hash_equals($token, $provided)) {
        json_response(['error' => 'Unauthorized'], 401);
    }
}

function slugify(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    return trim($text, '-') ?: 'content-' . substr(md5((string) microtime(true)), 0, 8);
}
