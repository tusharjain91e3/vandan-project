import { useState } from 'react';
import DefaultAvatar from './DefaultAvatar';
import { shareInviteWithImage } from '../lib/shareCard';

export default function ShareInviteScreen({ isVisible, onBack, userName, userPhoto }) {
  const [sharing, setSharing] = useState(false);

  if (!isVisible) return null;

  const handleShare = async () => {
    setSharing(true);
    const shareText = `🙏 *${userName}* ने आपको *वंदन* पर बुलाया है!\n\n🪔 हर रोज़ सुंदर कार्ड भेजें — सुप्रभात, भक्ति, गीता, त्यौहार\n✨ 100+ कार्ड · 6 भाषाएं · WhatsApp Ready\n\n👉 अभी जुड़ें: https://vandan-app.vercel.app`;

    const shared = await shareInviteWithImage({ userName, shareText });

    if (!shared) {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
    setSharing(false);
  };

  return (
    <div className="share-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, height: 56, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <button style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(43,24,16,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onBack}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B1810" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
      </div>

      <div style={{ padding: '64px 0 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#F0FBF4', border: '1.5px solid rgba(37,211,102,.28)', borderRadius: 100, padding: '7px 18px', fontFamily: 'var(--deva)', fontSize: 14, fontWeight: 600, color: '#17a84a' }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#17a84a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          कार्ड भेज दिया!
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 0' }}>
        <div className="share-screen__card-echo">
          <img src="https://images.pexels.com/photos/35742994/pexels-photo-35742994.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,.0) 35%,rgba(0,0,0,.55) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 52, left: 0, right: 0, fontFamily: 'var(--deva)', fontSize: 16, fontWeight: 700, color: '#FFF8EE', textAlign: 'center', lineHeight: 1.4, padding: '0 16px', textShadow: '0 1px 14px rgba(0,0,0,.85)' }}>
            जो था अच्छा था,<br />जो है बेहतर है,<br />जो होगा बेहतरीन होगा
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'rgba(255,249,240,.97)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px', borderTop: '1px solid rgba(43,24,16,.05)' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              {userPhoto ? (
                <img src={userPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <DefaultAvatar name={userName} size={26} />
              )}
            </div>
            <span style={{ fontFamily: 'var(--deva)', fontSize: 13, fontWeight: 800, color: 'var(--rosewood)' }}>{userName}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="share-screen__headline">परिवार को भी दें यह खुशी</div>
        <div className="share-screen__sub">क्या घर में कोई है जिसे रोज़<br />सुंदर कार्ड मिलना चाहिए?</div>

        <div className="share-screen__social-proof">
          <div className="share-screen__social-avatars">
            <img src="https://images.pexels.com/photos/6472469/pexels-photo-6472469.jpeg?auto=compress&cs=tinysrgb&w=60" alt="" />
            <img src="https://images.pexels.com/photos/4428278/pexels-photo-4428278.jpeg?auto=compress&cs=tinysrgb&w=60" alt="" />
            <img src="https://images.pexels.com/photos/9366083/pexels-photo-9366083.jpeg?auto=compress&cs=tinysrgb&w=60" alt="" />
          </div>
          <div className="share-screen__social-text">10,000+ परिवार रोज़ भेज रहे हैं</div>
        </div>

        <button className="share-screen__wa-cta" onClick={handleShare} disabled={sharing} style={sharing ? { opacity: 0.6 } : undefined}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" /></svg>
          हाँ, WhatsApp पर भेजें
        </button>
        <button className="share-screen__skip" onClick={onBack}>नहीं, अभी नहीं</button>
      </div>
    </div>
  );
}
