#!/usr/bin/env node
import 'dotenv/config';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const BUCKET = 'videos';

const { ALL_VIDEOS } = await import('../src/data-extended.js');

// Build lookup: id → category
const idToCat = {};
ALL_VIDEOS.forEach(v => { idToCat[v.id] = v.category; });

// Find all rendered mp4 files
const files = readdirSync('out').filter(f => f.endsWith('.mp4'));

console.log(`📤 Uploading ${files.length} videos to Supabase...\n`);

let success = 0;
for (const file of files) {
  const id = file.replace('.mp4', '');
  const category = idToCat[id] || 'unknown';
  const filePath = `out/${file}`;

  process.stdout.write(`[${success + 1}/${files.length}] ${id}...`);

  const fileBuffer = readFileSync(filePath);

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(file, fileBuffer, { contentType: 'video/mp4', upsert: true });

  if (uploadErr) {
    console.log(` ✗ ${uploadErr.message}`);
    continue;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(file);

  await supabase.from('videos').delete().eq('card_key', id);
  const { error: dbErr } = await supabase.from('videos').insert([{
    category, card_key: id, video_url: data.publicUrl, lang: 'hi',
  }]);

  if (dbErr) {
    console.log(` ✗ DB: ${dbErr.message}`);
  } else {
    console.log(` ✓`);
    success++;
  }
}

console.log(`\n📤 Done! ${success}/${files.length} uploaded.`);
