/** Reusable loading spinner — use anywhere loading takes time */
export default function Loader({ size = 24, color = 'var(--saffron)', text = '' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size,
        border: `3px solid rgba(200,97,26,.15)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'loader-spin .7s linear infinite',
      }} />
      {text && <span style={{ fontSize: 12, color: 'var(--stone)', fontFamily: 'var(--deva)' }}>{text}</span>}
      <style>{`@keyframes loader-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
