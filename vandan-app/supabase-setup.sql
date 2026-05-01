-- Run this in your Supabase SQL Editor to create the leads table

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  country_code TEXT DEFAULT '+91',
  full_phone TEXT,
  source TEXT DEFAULT 'signup',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the app to write leads without auth)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Allow reading all leads (for admin/you to export)
CREATE POLICY "Allow reading leads" ON leads
  FOR SELECT
  USING (true);

-- Create an index on created_at for fast sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Unique constraint on full_phone to avoid duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_unique_phone ON leads (full_phone);

-- Allow updating leads (for upsert when same phone re-registers)
DO $$ BEGIN
  CREATE POLICY "Allow updating leads" ON leads FOR UPDATE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════════════════════════════════════════════════
-- VIDEOS TABLE — stores video URLs for card downloads
-- ═══════════════════════════════════════════════════════════
-- Upload videos to Supabase Storage, then insert a row here
-- with the public URL. The app fetches from this table.
--
-- Example insert:
-- INSERT INTO videos (category, card_key, video_url)
-- VALUES ('morning', 'm1', 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/videos/morning-m1.mp4');
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,       -- e.g. 'morning', 'devotional', 'festival'
  card_key TEXT,                 -- e.g. 'm1', 'd3' (optional, for card-specific videos)
  video_url TEXT NOT NULL,       -- public URL from Supabase Storage
  lang TEXT DEFAULT 'hi',        -- language of the video (optional)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (app needs to fetch video URLs)
CREATE POLICY "Allow reading videos" ON videos
  FOR SELECT
  USING (true);

-- Allow inserts (for you to add videos via dashboard or API)
CREATE POLICY "Allow inserting videos" ON videos
  FOR INSERT
  WITH CHECK (true);

-- Index for fast lookups by category
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos (category, created_at DESC);
