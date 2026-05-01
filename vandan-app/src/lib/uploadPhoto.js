import { supabase } from './supabase';

/**
 * Upload a user photo to Supabase Storage and return the public URL.
 * Shows preview via data URL immediately, then replaces with persistent URL.
 * @param {File} file - Image file
 * @param {function} onPreview - Called immediately with data URL for instant preview
 * @returns {string|null} - Supabase public URL or data URL fallback
 */
export async function uploadUserPhoto(file, onPreview) {
  if (!file) return null;

  // Instant preview
  let dataUrl = null;
  try {
    dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    if (onPreview) onPreview(dataUrl);
  } catch {}

  // Upload to Supabase
  if (supabase) {
    try {
      const ext = file.name?.split('.').pop() || 'jpg';
      const path = `avatars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('stories').upload(path, file, {
        contentType: file.type, upsert: true,
      });
      if (!error) {
        const { data } = supabase.storage.from('stories').getPublicUrl(path);
        // Save to localStorage
        try {
          const saved = JSON.parse(localStorage.getItem('vandan_user') || '{}');
          saved.photo = data.publicUrl;
          localStorage.setItem('vandan_user', JSON.stringify(saved));
        } catch {}
        return data.publicUrl;
      }
    } catch (e) {
      console.error('Photo upload error:', e);
    }
  }

  // Fallback: return data URL (not persistent but works)
  return dataUrl;
}
