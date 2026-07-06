-- Building in Public — content schema
-- MySQL 5.7+ / 8.0
--
-- Usage:
--   mysql -u root -p < schema.sql


CREATE TABLE IF NOT EXISTS content (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title          VARCHAR(255)  NOT NULL,
  slug           VARCHAR(255)  NOT NULL,
  excerpt        VARCHAR(500)  DEFAULT NULL,
  description    TEXT          DEFAULT NULL,
  featured_image VARCHAR(1000) DEFAULT NULL,
  platform       ENUM('x','tiktok','instagram','linkedin','youtube','blog') NOT NULL DEFAULT 'blog',
  content_type   ENUM('video','article','thread','post','insight') NOT NULL DEFAULT 'article',
  category       VARCHAR(100)  NOT NULL DEFAULT 'Development',
  source_url     VARCHAR(1000) DEFAULT NULL,
  embed_url      VARCHAR(1000) DEFAULT NULL,
  published_date DATE          DEFAULT NULL,
  views          INT UNSIGNED  NOT NULL DEFAULT 0,
  featured       TINYINT(1)    NOT NULL DEFAULT 0,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_slug (slug),
  KEY idx_platform (platform),
  KEY idx_category (category),
  KEY idx_content_type (content_type),
  KEY idx_featured (featured),
  KEY idx_published_date (published_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: link content to projects for "Related Content" (relationship is OPTIONAL).
-- A content item does NOT need to belong to a project.
CREATE TABLE IF NOT EXISTS project_content (
  project_slug VARCHAR(100) NOT NULL,
  content_id   INT UNSIGNED NOT NULL,
  position     INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (project_slug, content_id),
  KEY idx_project (project_slug),
  CONSTRAINT fk_pc_content FOREIGN KEY (content_id)
    REFERENCES content (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Seed data (mirrors the frontend fallback dataset in src/lib/content.ts)
-- ---------------------------------------------------------------------------
INSERT INTO content
  (title, slug, excerpt, description, featured_image, platform, content_type, category, source_url, embed_url, published_date, views, featured)
VALUES
  ('LinkedIn Launches a Dedicated Video Feed', 'linkedin-launches-video-feed',
   'LinkedIn just launched a dedicated video feed — here''s why it signals where social media is heading, and the opportunity it opens for developers and founders.',
   'LinkedIn just launched a dedicated video feed, and it says a lot about where social media is heading. People don''t just want to read long posts anymore — they want quick, valuable content they can consume in seconds. For developers, founders, and creators, this is a chance to build an audience on a platform traditionally dominated by text.',
   NULL, 'tiktok', 'video', 'Content Creation', 'https://www.tiktok.com/@yuki_dev04/video/7653418372796812566', NULL, '2026-06-20', 0, 1),

  ('What I Love Most About Tech', 'what-i-love-most-about-tech',
   'Nothing in tech is ever truly finished. The next big feature might start with a simple question: "What if we did it this way instead?"',
   'The thing I love most about tech is that nothing is ever truly finished. The next big feature might not come from a research lab or an AI model — it might come from someone asking a simple question: "What if we did it this way instead?" That''s how products evolve.',
   NULL, 'tiktok', 'video', 'Development', 'https://www.tiktok.com/@yuki_dev04/video/7652330434168098070', NULL, '2026-06-17', 0, 0),

  ('Building Search Autocomplete', 'building-search-autocomplete',
   'Autocomplete seems simple until you see what''s behind it — debouncing, caching popular searches, and learning from user behavior.',
   'Autocomplete seems simple until you realize how much is happening behind the scenes. From debouncing requests to caching popular searches and learning from user behavior, these are the techniques that make search feel instant. Small details like this separate basic apps from great ones.',
   NULL, 'tiktok', 'video', 'Tutorials', 'https://www.tiktok.com/@yuki_dev04/video/7652093930527411478', NULL, '2026-06-16', 0, 0),

  ('AI Is Killing Stack Overflow & Tailwind', 'ai-killing-stackoverflow-tailwind',
   'How AI is undercutting the business models of Stack Overflow and Tailwind.',
   'AI is killing the business models of Stack Overflow and Tailwind.',
   NULL, 'tiktok', 'video', 'Development', 'https://www.tiktok.com/@yuki_dev04/video/7603859450054724886', NULL, '2026-02-06', 0, 0),

  ('I Recently Built and Launched', 'recently-built-and-launched',
   'A recent build-and-launch milestone, shared on LinkedIn.',
   NULL,
   NULL, 'linkedin', 'post', 'Founder Journey', 'https://www.linkedin.com/posts/osayuki-obazee-677765331_activity-ugcPost-7431731955479695360-M7nK', NULL, '2026-02-23', 0, 1),

  ('Frontend Development Meets Unity Game Dev', 'frontend-development-unity-gamedev',
   'On frontend development and building a game with Unity.',
   NULL,
   NULL, 'linkedin', 'post', 'Content Creation', 'https://www.linkedin.com/posts/osayuki-obazee-677765331_frontenddevelopment-unity-gamedev-ugcPost-7443266455003000832-taYw', NULL, '2026-03-27', 0, 0);

-- Example optional project relationships (manual selection)
-- INSERT INTO project_content (project_slug, content_id, position) VALUES
--   ('mexo', (SELECT id FROM content WHERE slug='building-a-football-database'), 0);
