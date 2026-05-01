/**
 * Compresses a video blob client-side by re-encoding at lower bitrate.
 * Downloads video → plays in hidden video → draws to smaller canvas → records.
 * Output: ~500KB-1MB webm file that shares instantly.
 */
export async function compressVideoForShare(videoBlob, userName) {
  const blobUrl = URL.createObjectURL(videoBlob);
  try {
    return await encode(blobUrl, userName);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function encode(blobUrl, userName) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.preload = 'auto';
    video.src = blobUrl;

    const timeout = setTimeout(() => {
      video.pause();
      reject(new Error('Compress timeout'));
    }, 20000);

    video.onerror = () => { clearTimeout(timeout); reject(new Error('Video error')); };

    video.oncanplaythrough = () => {
      // Small canvas = smaller file
      const W = 360;
      const H = Math.round((video.videoHeight / video.videoWidth) * W) || 450;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const fps = 12;
      const stream = canvas.captureStream(fps);
      const mimeType = getBestType();
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 400000 });
      const chunks = [];

      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => {
        clearTimeout(timeout);
        resolve(new Blob(chunks, { type: mimeType }));
      };

      recorder.start();

      function draw() {
        ctx.drawImage(video, 0, 0, W, H);

        // Draw name strip
        if (userName) {
          const sh = Math.round(H * 0.1);
          const sy = H - sh;
          ctx.fillStyle = 'rgba(255,249,240,0.93)';
          ctx.fillRect(0, sy, W, sh);

          // Avatar circle
          const as = Math.round(sh * 0.65);
          const ax = 8, ay = sy - as * 0.15;
          ctx.beginPath();
          ctx.arc(ax + as / 2, ay + as / 2, as / 2 + 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFF9F0';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ax + as / 2, ay + as / 2, as / 2, 0, Math.PI * 2);
          const g = ctx.createLinearGradient(ax, ay, ax + as, ay + as);
          g.addColorStop(0, '#C8611A'); g.addColorStop(1, '#8B3500');
          ctx.fillStyle = g;
          ctx.fill();
          ctx.fillStyle = '#FFF8EE';
          ctx.font = `700 ${Math.round(as * 0.5)}px serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(userName.charAt(0), ax + as / 2, ay + as / 2);

          // Name
          ctx.fillStyle = '#2B1810';
          ctx.font = `800 ${Math.round(sh * 0.35)}px serif`;
          ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
          ctx.fillText(userName, ax + as + 6, sy + sh / 2);
        }

        if (!video.ended && !video.paused) {
          requestAnimationFrame(draw);
        } else {
          setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, 100);
        }
      }

      video.onplay = draw;
      video.play().catch(() => { clearTimeout(timeout); reject(new Error('Play blocked')); });

      // Stop after video duration
      const dur = Math.min((video.duration || 10) * 1000, 10500);
      setTimeout(() => { video.pause(); if (recorder.state === 'recording') recorder.stop(); }, dur);
    };

    video.load();
  });
}

function getBestType() {
  for (const t of ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return 'video/webm';
}
