import { UI_LABELS } from '../data/quotes';

export default function InviteBanner({ lang = 'hi', onClick }) {
  const L = UI_LABELS[lang] || UI_LABELS.hi;

  return (
    <div className="invite-banner" onClick={onClick}>
      <div className="invite-banner__inner">
        <div className="invite-banner__icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFF8EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div className="invite-banner__text">
          <div className="invite-banner__hed">{L.ib_hed}</div>
          <div className="invite-banner__sub">{L.ib_sub}</div>
        </div>
        <div className="invite-banner__cta">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>
          {L.ib_cta}
        </div>
      </div>
    </div>
  );
}
