-- ═══════════════════════════════════════════════════════════
-- RUN THIS ONCE in Supabase SQL Editor
-- Creates videos table + storage bucket + all policies
-- ═══════════════════════════════════════════════════════════

-- 1. Videos table
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  card_key TEXT,
  video_url TEXT NOT NULL,
  lang TEXT DEFAULT 'hi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read videos
DO $$ BEGIN
  CREATE POLICY "Allow reading videos" ON videos FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow anyone to insert videos
DO $$ BEGIN
  CREATE POLICY "Allow inserting videos" ON videos FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow anyone to delete videos (for upsert)
DO $$ BEGIN
  CREATE POLICY "Allow deleting videos" ON videos FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_videos_category ON videos (category, created_at DESC);

-- 2. Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Storage policies — allow upload, read, overwrite
DO $$ BEGIN
  CREATE POLICY "Public video read" ON storage.objects
    FOR SELECT USING (bucket_id = 'videos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow video upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'videos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow video overwrite" ON storage.objects
    FOR UPDATE USING (bucket_id = 'videos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow video delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'videos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
