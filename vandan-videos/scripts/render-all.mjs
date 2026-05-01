#!/usr/bin/env node
/**
 * Render videos → Upload to Supabase Storage → Insert URLs
 * Usage: npm run render:all
 * Or:    npm run render:all -- --limit 34
 */
import 'dotenv/config';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const BUCKET = 'videos';

const { ALL_VIDEOS } = await import('../src/data-extended.js');

// Parse --limit flag
const limitArg = process.argv.find(a => a.startsWith('--limit'));
const limitIdx = process.argv.indexOf('--limit');
const LIMIT = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1]) : ALL_VIDEOS.length;

const videos = ALL_VIDEOS.slice(0, LIMIT);

if (!existsSync('out')) mkdirSync('out');

async function uploadAndInsert(video) {
  if (!supabase) { console.log('  ⚠ No Supabase config'); return; }

  const filePath = `out/${video.id}.mp4`;
  const storagePath = `${video.id}.mp4`;
  const fileBuffer = readFileSync(filePath);

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType: 'video/mp4', upsert: true });

  if (uploadErr) { console.log(`  ⚠ Upload: ${uploadErr.message}`); return; }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  await supabase.from('videos').delete().eq('card_key', video.id);
  const { error: dbErr } = await supabase.from('videos').insert([{
    category: video.category, card_key: video.id, video_url: data.publicUrl, lang: 'hi',
  }]);

  if (dbErr) console.log(`  ⚠ DB: ${dbErr.message}`);
  else console.log(`  ✓ Uploaded`);
}

console.log(`🎬 Rendering ${videos.length} videos...\n`);

let success = 0;
for (let i = 0; i < videos.length; i++) {
  const v = videos[i];
  const outFile = `out/${v.id}.mp4`;
  console.log(`[${i + 1}/${videos.length}] ${v.id} (${v.category})`);

  try {
    execSync(`npx remotion render src/index.jsx ${v.id} ${outFile} --codec h264`, { stdio: 'pipe', timeout: 180_000 });
    console.log(`  ✓ Rendered`);
    success++;
  } catch (err) {
    console.error(`  ✗ Render failed`);
    continue;
  }

  await uploadAndInsert(v);
}

console.log(`\n🎬 Done! ${success}/${videos.length} rendered. Videos in out/`);
