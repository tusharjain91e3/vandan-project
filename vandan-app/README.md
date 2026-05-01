# 🪔 वंदन — Vandan

**Daily greeting card app for Indian families.** Users browse beautiful cards (सुप्रभात, भक्ति, गीता, त्यौहार), personalize them with their name, and share videos on WhatsApp.

**Live:** https://vandan-app.vercel.app

---

## 🏗 Architecture

```
vandan-app/          → React web app (Vite + React 19)
vandan-videos/       → Remotion video renderer (generates .mp4 files)
Supabase             → Database (leads, videos) + Storage (video files)
Vercel               → Hosting
```

## 🔑 Key Features

| Feature | How it works |
|---------|-------------|
| **Video cards** | Remotion-rendered videos play in the feed from Supabase Storage |
| **Personalized download** | Downloads video with user's name burned in (client-side canvas compositing) |
| **WhatsApp share** | `navigator.share` sends video file directly on mobile |
| **Invite family** | Shares a branded signup image via WhatsApp |
| **6 languages** | Hindi, English, Marathi, Tamil, Telugu, Gujarati |
| **8 categories** | Morning, Gita, Devotional, Motivation, Night, Festival, Gratitude, Birthday |
| **Lead capture** | Collects name + phone (unique) in Supabase `leads` table |
| **Background music** | Each category has its own Indian music (flute, veena, bhajan, etc.) |

## 📁 Project Structure

### vandan-app (React)
```
src/
├── App.jsx                  → Main app, state management
├── components/
│   ├── Card.jsx             → Static quote card with image
│   ├── VideoCard.jsx        → Video card (plays Supabase videos, lazy loads, audio toggle)
│   ├── CardFeed.jsx         → Feed layout (1 video + 8 cards per category)
│   ├── CategoryTabs.jsx     → Tab navigation
│   ├── TopBar.jsx           → Header with language button
│   ├── SignupScreen.jsx     → Onboarding (name + phone)
│   ├── NamePhotoSheet.jsx   → Bottom sheet for name/phone
│   └── ...                  → Other UI components
├── data/
│   ├── constants.js         → Photos, gradients, categories, stories
│   └── quotes.js            → Quotes in 6 languages, UI labels
├── lib/
│   ├── supabase.js          → Supabase client, leads, video fetching
│   ├── videoWithName.js     → Burns user name onto video (client-side)
│   └── shareCard.js         → Creates invite image for sharing
└── styles/
    └── vandan.css           → All CSS
```

### vandan-videos (Remotion)
```
src/
├── GreetingCard.jsx         → Video template (Ken Burns + text + music + badge)
├── data-extended.js         → 50 video definitions
scripts/
├── render-all.mjs           → Renders + uploads to Supabase (one command)
music/                       → 8 royalty-free Indian music tracks
```

## 🚀 Quick Start

### Run the app locally
```bash
cd vandan-app
npm install
npm run dev
```

### Generate and upload new videos
```bash
cd vandan-videos
npm install
npm run render:all    # Renders 50 videos + uploads to Supabase automatically
```

### Deploy
```bash
cd vandan-app
vercel deploy --prod --yes
```

## 🔧 Environment Variables

Create `.env` in both projects:

**vandan-app/.env**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**vandan-videos/.env**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 🗄 Supabase Setup

Run this SQL once in Supabase SQL Editor:

```sql
-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, phone TEXT,
  country_code TEXT DEFAULT '+91', full_phone TEXT,
  source TEXT DEFAULT 'signup', created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "p1" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "p2" ON leads FOR SELECT USING (true);
CREATE POLICY "p3" ON leads FOR UPDATE USING (true);
CREATE UNIQUE INDEX IF NOT EXISTS idx_phone ON leads (full_phone);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY, category TEXT NOT NULL, card_key TEXT,
  video_url TEXT NOT NULL, lang TEXT DEFAULT 'hi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "p4" ON videos FOR SELECT USING (true);
CREATE POLICY "p5" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "p6" ON videos FOR DELETE USING (true);

-- Storage
INSERT INTO storage.buckets (id,name,public) VALUES ('videos','videos',true) ON CONFLICT DO NOTHING;
CREATE POLICY "p7" ON storage.objects FOR SELECT USING (bucket_id='videos');
CREATE POLICY "p8" ON storage.objects FOR INSERT WITH CHECK (bucket_id='videos');
CREATE POLICY "p9" ON storage.objects FOR UPDATE USING (bucket_id='videos');
CREATE POLICY "p10" ON storage.objects FOR DELETE USING (bucket_id='videos');
```

## 📱 How Personalized Video Download Works

The Remotion videos are generic (no user name). When a user downloads:

1. App fetches `.mp4` from Supabase into a hidden `<video>`
2. Plays frame-by-frame onto a `<canvas>`
3. Each frame: draws video + name strip (saffron avatar + user name) + वंदन badge
4. `MediaRecorder` records the canvas → `.webm` blob
5. Downloads the personalized video

Code: `src/lib/videoWithName.js`

## 🎵 Music

Each category has its own royalty-free Indian track:
- Morning → Carnatic Flute | Gita → Saraswathi Veena
- Devotional → Hindi Bhajan | Motivation → Mohan Veena
- Night → Classical | Festival → Folk Song
- Gratitude → Folk Flute | Birthday → Qawwali

Tap the 🔇 speaker icon on video cards to hear music.

## 📝 Adding New Videos

```bash
# 1. Edit data-extended.js — add entries to ALL_VIDEOS array
# 2. Run one command:
cd vandan-videos && npm run render:all
# Done! Videos rendered + uploaded + DB updated automatically
```

## 🔮 Future Ideas

- User photo burned into video (camera capture)
- Per-language video rendering
- Daily push notifications
- WhatsApp Business API auto-sending
- Admin content dashboard
- PWA offline support
- Analytics (most shared cards)

## 🛠 Tech Stack

**Frontend:** React 19, Vite 8, CSS
**Video:** Remotion 4, MediaRecorder API, ffmpeg
**Backend:** Supabase (PostgreSQL + Storage)
**Hosting:** Vercel

---

*Built with Claude Code* 🚀
