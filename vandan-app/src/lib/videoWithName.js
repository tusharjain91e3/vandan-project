/**
 * Composites user's name onto a Supabase video.
 * Downloads video as blob first (avoids CORS issues with canvas),
 * then plays from blob URL → draws onto canvas → records.
 */

export async function createPersonalizedVideo(videoUrl, userName, userPhoto) {
  // Step 1: Download video as blob (avoids CORS taint on canvas)
  const response = await fetch(videoUrl);
  if (!response.ok) throw new Error('Video fetch failed');
  const videoBlob = await response.blob();
  const blobUrl = URL.createObjectURL(videoBlob);

  try {
    return await compositeVideo(blobUrl, userName, userPhoto);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function compositeVideo(blobUrl, userName, userPhoto) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.preload = 'auto';
    video.src = blobUrl;

    let resolved = false;

    // Timeout safety — 15 seconds max
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        video.pause();
        reject(new Error('Video compositing timed out'));
      }
    }, 15000);

    video.onerror = () => {
      clearTimeout(timeout);
      if (!resolved) { resolved = true; reject(new Error('Video load error')); }
    };

    video.oncanplaythrough = () => {
      if (resolved) return;

      const W = video.videoWidth || 720;
      const H = video.videoHeight || 900;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const fps = 15; // Lower fps = faster compositing
      const stream = canvas.captureStream(fps);

      // Add audio from original video
      try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination);
        dest.stream.getAudioTracks().forEach(t => stream.addTrack(t));
      } catch (e) {
        // No audio — continue without
      }

      const mimeType = getMediaType();
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2000000 });
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => {
        clearTimeout(timeout);
        if (!resolved) {
          resolved = true;
          resolve(new Blob(chunks, { type: mimeType }));
        }
      };
      recorder.onerror = () => {
        clearTimeout(timeout);
        if (!resolved) { resolved = true; reject(new Error('Recorder error')); }
      };

      recorder.start();

      // Load user photo if available
      let userImg = null;
      if (userPhoto) {
        userImg = new Image();
        userImg.src = userPhoto;
      }

      function drawFrame() {
        if (resolved) return;

        ctx.drawImage(video, 0, 0, W, H);
        drawNameStrip(ctx, W, H, userName, userImg);
        // No badge — video already has वंदन baked in from Remotion

        if (!video.ended && !video.paused) {
          requestAnimationFrame(drawFrame);
        } else {
          setTimeout(() => {
            if (recorder.state === 'recording') recorder.stop();
          }, 200);
        }
      }

      video.onplay = drawFrame;
      video.play().catch(() => {
        clearTimeout(timeout);
        if (!resolved) { resolved = true; reject(new Error('Autoplay blocked')); }
      });

      // Stop after video ends or 10s
      setTimeout(() => {
        video.pause();
        if (recorder.state === 'recording') recorder.stop();
      }, Math.min((video.duration || 10) * 1000 + 500, 10500));
    };

    video.load();
  });
}

function drawNameStrip(ctx, W, H, userName, userImg) {
  const stripH = Math.round(H * 0.1);
  const stripY = H - stripH;

  ctx.fillStyle = 'rgba(255,249,240,0.95)';
  ctx.fillRect(0, stripY, W, stripH);
  ctx.strokeStyle = 'rgba(43,24,16,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, stripY); ctx.lineTo(W, stripY); ctx.stroke();

  const avSize = Math.round(stripH * 0.7);
  const avX = Math.round(W * 0.04);
  const avY = stripY - avSize * 0.2;

  // White ring
  ctx.beginPath();
  ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2 + 3, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF9F0';
  ctx.fill();

  // Avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
  ctx.clip();

  if (userImg && userImg.complete && userImg.naturalWidth > 0) {
    ctx.drawImage(userImg, avX, avY, avSize, avSize);
  } else {
    const g = ctx.createLinearGradient(avX, avY, avX + avSize, avY + avSize);
    g.addColorStop(0, '#C8611A'); g.addColorStop(1, '#8B3500');
    ctx.fillStyle = g;
    ctx.fillRect(avX, avY, avSize, avSize);
    if (userName) {
      ctx.fillStyle = '#FFF8EE';
      ctx.font = `700 ${Math.round(avSize * 0.45)}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(userName.charAt(0).toUpperCase(), avX + avSize / 2, avY + avSize / 2);
    }
  }
  ctx.restore();

  // Name text
  if (userName) {
    ctx.fillStyle = '#2B1810';
    ctx.font = `800 ${Math.round(stripH * 0.32)}px serif`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(userName, avX + avSize + Math.round(W * 0.02), stripY + stripH / 2);
  }
}

function drawBadge(ctx, W) {
  const bW = Math.round(W * 0.15);
  const bH = Math.round(bW * 0.35);
  const bX = W - bW - 12;

  ctx.fillStyle = 'rgba(8,3,0,0.4)';
  ctx.beginPath(); ctx.roundRect(bX, 12, bW, bH, 10); ctx.fill();
  ctx.fillStyle = 'rgba(255,225,155,0.9)';
  ctx.font = `700 ${Math.round(bH * 0.5)}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('वंदन', bX + bW / 2, 12 + bH / 2);
}

function getMediaType() {
  for (const t of ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return 'video/webm';
}
