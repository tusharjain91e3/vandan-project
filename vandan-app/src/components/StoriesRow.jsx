import { useState, useRef, useEffect } from 'react';
import { fetchStories, uploadStory } from '../lib/stories';
import UserStoryViewer from './UserStoryViewer';

export default function StoriesRow({ stories: dummyStories, onStoryClick, userName }) {
  const [userStories, setUserStories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    fetchStories().then(setUserStories);
    const interval = setInterval(() => fetchStories().then(setUserStories), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !userName) return;
    if (file.size > 10 * 1024 * 1024) { alert('10MB से छोटी फ़ाइल चुनें'); return; }
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) { alert('सिर्फ़ फ़ोटो या वीडियो'); return; }
    setUploading(true);
    const result = await uploadStory(file, userName);
    if (result) setUserStories(prev => [result, ...prev]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  // Real stories for viewer
  const realStoryItems = userStories.map(s => ({
    name: s.user_name,
    photo: s.media_type === 'image' ? s.media_url : null,
    isVideo: s.media_type === 'video',
    videoUrl: s.media_type === 'video' ? s.media_url : null,
    id: s.id,
  }));

  const openUserStory = (idx) => {
    setViewerIndex(idx);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="stories">
        {/* Add Story */}
        <div className="story" onClick={() => userName ? fileRef.current?.click() : alert('पहले नाम डालें')} style={{ cursor: 'pointer' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
            background: uploading ? 'rgba(200,97,26,.15)' : 'rgba(43,24,16,.04)',
            border: '2px dashed rgba(200,97,26,.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {uploading ? (
              <div style={{ width: 20, height: 20, border: '2.5px solid var(--saffron)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'loader-spin .7s linear infinite' }} />
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--saffron)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </div>
          <div className="story__name" style={{ color: 'var(--saffron)', fontSize: 11 }}>
            {uploading ? 'अपलोड...' : 'स्टोरी'}
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleUpload} />
        </div>

        {/* User stories (real) */}
        {realStoryItems.map((s, i) => (
          <div key={s.id} className="story" onClick={() => openUserStory(i)}>
            <div className="story__ring">
              <div className="story__avatar">
                {s.photo ? (
                  <img src={s.photo} alt={s.name} onError={e => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#C8611A,#8B3500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                )}
              </div>
            </div>
            <div className="story__name">{s.name}</div>
          </div>
        ))}

        {/* Dummy stories */}
        {dummyStories.map((s, i) => (
          <div key={`d-${i}`} className="story" onClick={() => onStoryClick(i)}>
            <div className={`story__ring${s.seen ? ' story__ring--seen' : ''}`}>
              <div className="story__avatar">
                <img src={s.photo} alt={s.name} onError={e => { e.target.style.display = 'none'; }} />
              </div>
            </div>
            <div className="story__name">{s.name}</div>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      <UserStoryViewer
        stories={realStoryItems}
        startIndex={viewerIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />

      <style>{`@keyframes loader-spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
