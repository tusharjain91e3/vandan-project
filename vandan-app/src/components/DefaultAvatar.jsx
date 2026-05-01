/** Generic avatar — shows user initial or person icon. No old guy photo. */
export default function DefaultAvatar({ name, size = 44, className = '', style = {} }) {
  const initial = name ? name.charAt(0).toUpperCase() : '';
  const fontSize = Math.round(size * 0.42);

  return (
    <div
      className={className}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(145deg, #C8611A, #8B3500)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
        ...style,
      }}
    >
      {initial ? (
        <span style={{ fontFamily: 'var(--deva)', fontSize, fontWeight: 700, color: '#FFF8EE' }}>{initial}</span>
      ) : (
        <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </div>
  );
}
