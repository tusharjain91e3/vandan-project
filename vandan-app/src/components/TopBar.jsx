import DiyaLogo from './DiyaLogo';

export default function TopBar({ userName, userPhoto, onProfileClick }) {
  return (
    <div className="topbar">
      <div className="topbar__brand">
        <div className="topbar__logo"><DiyaLogo /></div>
        <div>
          <div className="topbar__brand-name">वंदन</div>
          <span className="topbar__brand-tag">दिल से, हर रोज़</span>
        </div>
      </div>
      <button onClick={onProfileClick} style={{
        width: 40, height: 40, borderRadius: 11,
        background: 'rgba(43,24,16,.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer',
      }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--rosewood)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l6 6" /><path d="M4 6h7M7 4v2M9 6c0 3.5-1.5 6-3 8" />
          <path d="M12 20l4-9 4 9" /><path d="M19.1 18h-6.2" />
        </svg>
      </button>
    </div>
  );
}
