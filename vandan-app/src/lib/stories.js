/**
 * User Stories — upload, fetch, 24h expiry
 * Stories stored in Supabase: `user_stories` table + `stories` storage bucket
 */
import { supabase } from './supabase';

/**
 * Upload a story (image or short video)
 * @param {File} file - Image/video file from input
 * @param {string} userName - Who posted it
 * @returns {object|null} - The created story record
 */
export async function uploadStory(file, userName) {
  if (!supabase || !file) return null;

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const isVideo = file.type.startsWith('video/');

  // Upload to storage
  const { error: uploadErr } = await supabase.storage
    .from('stories')
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadErr) {
    console.error('Story upload failed:', uploadErr.message);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from('stories').getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  // Insert into table
  const { data, error: dbErr } = await supabase
    .from('user_stories')
    .insert([{
      user_name: userName,
      media_url: publicUrl,
      media_type: isVideo ? 'video' : 'image',
      storage_path: path,
    }])
    .select()
    .single();

  if (dbErr) {
    console.error('Story DB insert failed:', dbErr.message);
    return null;
  }

  return data;
}

/**
 * Fetch all active stories (last 24 hours)
 * @returns {Array} - Stories sorted newest first
 */
export async function fetchStories() {
  if (!supabase) return [];

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('user_stories')
    .select('*')
    .gte('created_at', oneDayAgo)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch stories error:', error.message);
    return [];
  }

  return data || [];
}

/**
 * Delete expired stories (cleanup — can be called periodically)
 */
export async function cleanupExpiredStories() {
  if (!supabase) return;

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Get expired stories
  const { data: expired } = await supabase
    .from('user_stories')
    .select('id, storage_path')
    .lt('created_at', oneDayAgo);

  if (!expired?.length) return;

  // Delete from storage
  const paths = expired.map(s => s.storage_path).filter(Boolean);
  if (paths.length) {
    await supabase.storage.from('stories').remove(paths);
  }

  // Delete from DB
  const ids = expired.map(s => s.id);
  await supabase.from('user_stories').delete().in('id', ids);
}
