/**
 * Share functions for Vandan app.
 * Invite share uses a static pre-made image (public/invite.png).
 */

/**
 * Share invite with the static signup hero image.
 */
export async function shareInviteWithImage({ userName, shareText }) {
  try {
    // Fetch the static invite image from public folder
    const resp = await fetch('/invite.png');
    const blob = await resp.blob();
    const file = new File([blob], 'vandan-invite.png', { type: 'image/png' });

    if (navigator.share) {
      const data = { text: shareText };
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        data.files = [file];
      }
      await navigator.share(data);
      return true;
    }
  } catch (err) {
    if (err.name === 'AbortError') return true;
    console.error('Share error:', err);
  }
  return false;
}
