-- Replace every em dash (U+2014) with a plain hyphen in existing content rows.
-- The em dash is built from its UTF-8 bytes (E2 80 94) and pinned to the table's
-- collation, so this works from any client charset. Safe to re-run.
UPDATE content SET
  title       = REPLACE(title,       _utf8mb4 0xE28094 COLLATE utf8mb4_unicode_ci, '-'),
  excerpt     = REPLACE(excerpt,     _utf8mb4 0xE28094 COLLATE utf8mb4_unicode_ci, '-'),
  description = REPLACE(description, _utf8mb4 0xE28094 COLLATE utf8mb4_unicode_ci, '-'),
  category    = REPLACE(category,    _utf8mb4 0xE28094 COLLATE utf8mb4_unicode_ci, '-');
