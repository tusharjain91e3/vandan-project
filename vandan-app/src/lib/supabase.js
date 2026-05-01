import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Google Sheets webhook URL — set this after creating the Apps Script
const GOOGLE_SHEET_URL = 'https://script.google.com/a/macros/habuild.in/s/AKfycbzdslPqGj4hUt11GEwVkukbcQmdRTVQTzPM5jJo_EnYAGQQoSrtcBHzf3FU5V_w5PJ_3w/exec';

export async function saveLead({ name, phone, countryCode, source = 'signup' }) {
  const fullPhone = countryCode + phone;

  // localStorage backup
  const leads = JSON.parse(localStorage.getItem('vandan_leads') || '[]');
  if (!leads.some(l => l.phone === fullPhone)) {
    leads.push({ name, phone: fullPhone, countryCode, source, createdAt: new Date().toISOString() });
    localStorage.setItem('vandan_leads', JSON.stringify(leads));
  }

  // Save to Supabase
  if (supabase) {
    try {
      const { data: existing } = await supabase
        .from('leads')
        .select('id')
        .eq('full_phone', fullPhone)
        .limit(1);

      if (existing && existing.length > 0) {
        await supabase.from('leads').update({ name, source }).eq('full_phone', fullPhone);
      } else {
        await supabase.from('leads').insert([{
          name, phone, country_code: countryCode, full_phone: fullPhone, source,
        }]);
      }
    } catch (e) { console.error('Supabase error:', e); }
  }

  // Push to Google Sheets (fire and forget — don't block UI)
  if (GOOGLE_SHEET_URL) {
    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, country_code: countryCode, full_phone: fullPhone, phone, source }),
    }).catch(() => {});
  }
}

export function getLeadCount() {
  return JSON.parse(localStorage.getItem('vandan_leads') || '[]').length;
}

export function getAllLeads() {
  return JSON.parse(localStorage.getItem('vandan_leads') || '[]');
}

// ── Videos ──────────────────────────────────────────────
const _cache = {};
const CACHE_TTL = 60 * 1000; // 1 min cache — fresh content on reload

/** Fetch all video URLs for a category. */
export async function getVideosByCategory(category) {
  const cached = _cache[category];
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('videos')
      .select('card_key, video_url')
      .eq('category', category);

    if (error || !data?.length) return [];
    _cache[category] = { data, ts: Date.now() };
    return data;
  } catch (e) {
    console.error('Video fetch error:', e);
    return [];
  }
}

/** Get a random video URL for a category. Falls back to any video. */
export async function getRandomVideoUrl(category) {
  const videos = await getVideosByCategory(category);
  if (videos.length) return videos[Math.floor(Math.random() * videos.length)].video_url;
  // Fallback: any video from any category
  return await getAnyVideoUrl();
}

/** Get any available video URL (last resort fallback). */
async function getAnyVideoUrl() {
  if (!supabase) return null;
  try {
    const { data } = await supabase.from('videos').select('video_url').limit(10);
    if (!data?.length) return null;
    return data[Math.floor(Math.random() * data.length)].video_url;
  } catch { return null; }
}

/** Get a specific video URL by card_key, or random from category.
 *  Falls back to any available video if category has none. */
export async function getVideoUrl(category, cardKey) {
  const videos = await getVideosByCategory(category);
  if (videos.length) {
    if (cardKey) {
      const match = videos.find(v => v.card_key === cardKey);
      if (match) return match.video_url;
    }
    return videos[Math.floor(Math.random() * videos.length)].video_url;
  }
  // Fallback: try any category that has videos
  if (!supabase) return null;
  try {
    const { data } = await supabase.from('videos').select('video_url').limit(1);
    return data?.[0]?.video_url || null;
  } catch { return null; }
}
