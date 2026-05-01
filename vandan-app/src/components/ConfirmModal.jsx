export default function ConfirmModal({ isOpen, onClose, onWhatsAppShare, userName, userPhone }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-backdrop" onClick={onClose}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-modal__ring">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div className="confirm-modal__title">WhatsApp पर भेजें</div>
        <div className="confirm-modal__text">
          <strong style={{ fontSize: 15, color: 'var(--rosewood)' }}>{userName}</strong><br />
          <span style={{ fontFamily: 'var(--ui)', fontSize: 12, color: 'var(--stone)' }}>{userPhone}</span><br /><br />
          परिवार को मिल गया आपका वंदन कार्ड
        </div>
        <button className="confirm-modal__cta" onClick={onWhatsAppShare}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" style={{ marginRight: 6 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" /></svg>
          WhatsApp पर भेजें
        </button>
        <button className="confirm-modal__dismiss" onClick={onClose}>एक और देखें</button>
      </div>
    </div>
  );
}
