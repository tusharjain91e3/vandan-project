#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const { ALL_VIDEOS } = await import('../src/data-extended.js');

if (!existsSync('instagram')) mkdirSync('instagram');

// Category emoji map
const EMOJI = {
  morning: '🌅', geeta: '📿', devotional: '🙏', motivation: '💪',
  night: '🌙', festival: '🎉', gratitude: '🙏', birthday: '🎂',
};

const HASHTAGS = `#vandan #वंदन #suprabhat #goodmorning #bhagavadgita #gita #krishna #mahadev #motivation #hindi #quotes #devotional #bhakti #festival #gratitude #birthday #whatsapp #family #india #hindiquotes #morningmotivation #nightquotes #spirituality #reels #reelsinstagram #trending #viral`;

console.log(`🎬 Rendering ${ALL_VIDEOS.length} Instagram reels (1080x1920)...\n`);

const captions = [];
let done = 0;

for (const v of ALL_VIDEOS) {
  const outFile = `instagram/${v.id}.mp4`;
  done++;
  console.log(`[${done}/${ALL_VIDEOS.length}] ${v.id} (${v.category})`);

  try {
    execSync(
      `npx remotion render src/indexInsta.jsx ${v.id} ${outFile} --codec h264`,
      { stdio: 'pipe', timeout: 180000 }
    );
    console.log(`  ✓ Rendered`);
  } catch (err) {
    console.log(`  ✗ Failed`);
    continue;
  }

  // Generate caption
  const emoji = EMOJI[v.category] || '🪔';
  const quote = v.quote.replace(/\n/g, ' ');
  const caption = `${emoji} ${quote}\n\n${v.attr ? `— ${v.attr}\n\n` : ''}🪔 वंदन — हर रोज़ सुंदर कार्ड भेजें\n✨ 100+ कार्ड · 6 भाषाएं · WhatsApp Ready\n📲 Link in bio\n\n${HASHTAGS}`;
  captions.push({ id: v.id, category: v.category, caption });
}

// Write all captions to a single file
const captionText = captions.map((c, i) =>
  `═══ REEL ${i + 1}: ${c.id} (${c.category}) ═══\nFile: instagram/${c.id}.mp4\n\n${c.caption}\n\n`
).join('\n');

writeFileSync('instagram/CAPTIONS.txt', captionText);
console.log(`\n🎬 Done! ${done} reels in instagram/ folder`);
console.log(`📝 Captions saved to instagram/CAPTIONS.txt`);
