/**
 * Creates a personalized video from card data — entirely on canvas.
 * Ken Burns zoom effect + quote text + user name strip.
 * No external image fetching — guaranteed to work.
 */

export async function createVideoFromCard(element, durationMs = 6000) {
  // This is a fallback — we can't reliably capture DOM with cross-origin images.
  // Instead, use createVideoFromData() below.
  return createVideoFromData({}, durationMs);
}

/**
 * Creates a video with gradient bg + Ken Burns + text + name strip.
 * @param {Object} opts - { quote, attr, userName, category }
 * @param {number} durationMs
 * @returns {Promise<Blob>}
 */
export async function createVideoFromData({ quote = '', attr = '', userName = '', category = 'morning' }, durationMs = 6000) {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const fps = 24;

  // Category colors
  const gradients = {
    morning: ['#8B4500', '#D96B2B', '#FF8C00'],
    motivation: ['#0A1525', '#1A3050', '#2D5080'],
    festival: ['#8B0080', '#CC20A0', '#4040CC'],
    devotional: ['#05001A', '#10004A', '#200080'],
    birthday: ['#4A0060', '#9000C0', '#CC00E0'],
    night: ['#020008', '#08001A', '#120030'],
    geeta: ['#2A0A00', '#6B2000', '#A84000'],
    gratitude: ['#5A3010', '#A06020', '#D4A040'],
  };

  const stream = canvas.captureStream(fps);
  const mimeType = getSupportedMimeType();
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 3000000 });
  const chunks = [];
  recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
  recorder.start();

  const totalFrames = Math.ceil(durationMs / (1000 / fps));
  const colors = gradients[category] || gradients.morning;
  const lines = quote.split('\n').filter(Boolean);

  for (let frame = 0; frame < totalFrames; frame++) {
    const progress = frame / totalFrames;

    // Ken Burns zoom on gradient
    const scale = 1.0 + 0.08 * progress;
    const offsetX = (W * (scale - 1)) / 2;
    const offsetY = (H * (scale - 1)) / 2;

    ctx.save();
    ctx.translate(-offsetX, -offsetY);
    ctx.scale(scale, scale);

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W * 0.4, H);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(0.5, colors[1]);
    grad.addColorStop(1, colors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Dark overlay
    const ovl = ctx.createLinearGradient(0, 0, 0, H);
    ovl.addColorStop(0, 'rgba(0,0,0,0.45)');
    ovl.addColorStop(0.4, 'rgba(0,0,0,0.05)');
    ovl.addColorStop(1, 'rgba(0,0,0,0.65)');
    ctx.fillStyle = ovl;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();

    // Gold divider (animates in)
    const dividerProgress = Math.min(1, progress * 4);
    ctx.fillStyle = 'rgba(255,215,120,0.7)';
    ctx.fillRect(W / 2 - 40 * dividerProgress, H * 0.35, 80 * dividerProgress, 3);

    // Quote text — words fade in
    ctx.fillStyle = '#FFF8EE';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = lines.length > 3 ? 52 : 60;
    ctx.font = `700 ${fontSize}px serif`;
    const lineHeight = fontSize * 1.4;
    const totalTextH = lines.length * lineHeight;
    const startY = H * 0.45 - totalTextH / 2;

    lines.forEach((line, i) => {
      const wordDelay = (i * 0.15 + 0.1);
      const wordProgress = Math.max(0, Math.min(1, (progress - wordDelay) * 5));
      ctx.globalAlpha = wordProgress;
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 20;
      ctx.fillText(line.trim(), W / 2, startY + i * lineHeight + (1 - wordProgress) * 15);
    });
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Attribution
    if (attr) {
      const attrProgress = Math.max(0, Math.min(1, (progress - 0.5) * 4));
      ctx.globalAlpha = attrProgress;
      ctx.font = '500 26px sans-serif';
      ctx.fillStyle = 'rgba(255,235,185,0.85)';
      ctx.fillText(attr, W / 2, startY + lines.length * lineHeight + 35);
      ctx.globalAlpha = 1;
    }

    // Name strip at bottom
    const stripH = 130;
    const stripY = H - stripH;
    const stripProgress = Math.max(0, Math.min(1, (progress - 0.3) * 4));

    // Strip background
    ctx.globalAlpha = stripProgress;
    ctx.fillStyle = 'rgba(255,249,240,0.97)';
    ctx.fillRect(0, stripY, W, stripH);
    ctx.strokeStyle = 'rgba(43,24,16,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, stripY);
    ctx.lineTo(W, stripY);
    ctx.stroke();

    // Avatar circle
    const avSize = 90;
    const avX = 50;
    const avY = stripY - avSize * 0.25;

    // White ring
    ctx.beginPath();
    ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2 + 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF9F0';
    ctx.fill();

    // Saffron circle
    ctx.beginPath();
    ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
    const avGrad = ctx.createLinearGradient(avX, avY, avX + avSize, avY + avSize);
    avGrad.addColorStop(0, '#C8611A');
    avGrad.addColorStop(1, '#8B3500');
    ctx.fillStyle = avGrad;
    ctx.fill();

    // Initial
    if (userName) {
      ctx.fillStyle = '#FFF8EE';
      ctx.font = '700 40px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userName.charAt(0).toUpperCase(), avX + avSize / 2, avY + avSize / 2);
    }

    // Name pill
    if (userName) {
      ctx.fillStyle = '#2B1810';
      ctx.font = '800 38px serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(userName, avX + avSize + 35, stripY + stripH / 2);
    }
    ctx.globalAlpha = 1;

    // Vandan badge top-right
    const badgeProgress = Math.max(0, Math.min(1, (progress - 0.6) * 4));
    ctx.globalAlpha = badgeProgress;
    ctx.fillStyle = 'rgba(8,3,0,0.42)';
    ctx.beginPath();
    ctx.roundRect(W - 190, 28, 160, 50, 14);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,225,155,0.95)';
    ctx.font = '700 26px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🪔 वंदन', W - 110, 53);
    ctx.globalAlpha = 1;

    await sleep(1000 / fps);
  }

  return new Promise((resolve) => {
    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: mimeType }));
    };
    recorder.stop();
  });
}

function getSupportedMimeType() {
  const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return 'video/webm';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
