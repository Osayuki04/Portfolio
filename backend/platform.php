<?php
// Platform detection + semi-automated metadata retrieval.
//
// NO SCRAPING. We only call official oEmbed endpoints where they exist.
// When metadata cannot be retrieved, the import returns a best-effort draft
// that the admin can complete manually.

declare(strict_types=1);

function detect_platform(string $url): string
{
    $host = strtolower((string) parse_url($url, PHP_URL_HOST));
    $host = preg_replace('/^www\./', '', $host) ?? $host;

    if (str_contains($host, 'tiktok.com'))    return 'tiktok';
    if (str_contains($host, 'instagram.com')) return 'instagram';
    if (str_contains($host, 'linkedin.com'))  return 'linkedin';
    if ($host === 'x.com' || str_contains($host, 'twitter.com')) return 'x';
    if (str_contains($host, 'youtube.com') || str_contains($host, 'youtu.be')) return 'youtube';
    return 'blog';
}

function guess_content_type(string $platform): string
{
    return match ($platform) {
        'tiktok', 'youtube' => 'video',
        'x'                 => 'thread',
        'instagram'         => 'post',
        'linkedin'          => 'article',
        default             => 'article',
    };
}

function http_get_json(string $url): ?array
{
    $opts = [
        'http' => ['method' => 'GET', 'timeout' => 6, 'header' => "Accept: application/json\r\nUser-Agent: yuki-bip/1.0\r\n"],
        'ssl'  => ['verify_peer' => true, 'verify_peer_name' => true],
    ];
    $ctx  = stream_context_create($opts);
    $body = @file_get_contents($url, false, $ctx);
    if ($body === false) {
        return null;
    }
    $data = json_decode($body, true);
    return is_array($data) ? $data : null;
}

/**
 * Returns a draft content entry for the given URL.
 * Fields that could not be resolved are returned empty for manual entry.
 */
function import_metadata(string $url): array
{
    $platform = detect_platform($url);
    $draft = [
        'title'          => '',
        'excerpt'        => '',
        'description'    => '',
        'featured_image' => '',
        'platform'       => $platform,
        'content_type'   => guess_content_type($platform),
        'category'       => 'Development',
        'source_url'     => $url,
        'embed_url'      => '',
        'published_date' => '',
        'metadata_found' => false,
    ];

    $oembed = null;
    if ($platform === 'tiktok') {
        $oembed = http_get_json('https://www.tiktok.com/oembed?url=' . rawurlencode($url));
    } elseif ($platform === 'x') {
        $oembed = http_get_json('https://publish.twitter.com/oembed?omit_script=1&url=' . rawurlencode($url));
    } elseif ($platform === 'youtube') {
        $oembed = http_get_json('https://www.youtube.com/oembed?format=json&url=' . rawurlencode($url));
    }
    // Instagram & LinkedIn oEmbed require an app access token that is not
    // publicly available, so those fall back to manual entry by design.

    if (is_array($oembed)) {
        $draft['metadata_found'] = true;
        if (!empty($oembed['title'])) {
            $draft['title'] = (string) $oembed['title'];
        } elseif (!empty($oembed['author_name'])) {
            $draft['title'] = (string) $oembed['author_name'] . ' on ' . ucfirst($platform);
        }
        if (!empty($oembed['thumbnail_url'])) {
            $draft['featured_image'] = (string) $oembed['thumbnail_url'];
        }
        if (!empty($oembed['author_name'])) {
            $draft['description'] = 'By ' . (string) $oembed['author_name'];
        }
        if (!empty($oembed['html'])) {
            $draft['embed_url'] = $url; // store source; embed HTML can be rendered client-side
        }
    }

    if ($draft['title'] === '') {
        $draft['title'] = ucfirst($platform) . ' post';
    }
    if ($draft['excerpt'] === '' && $draft['description'] !== '') {
        $draft['excerpt'] = mb_substr($draft['description'], 0, 200);
    }

    return $draft;
}
