import { CATS } from '../data/constants';
import Card from './Card';
import VideoCard from './VideoCard';

export default function CardFeed({ category, lang, user, onShare, onEditName, onNeedSignup }) {
  const cat = CATS[category] || CATS.morning;
  const { keys, style, ovl } = cat;

  return (
    <div className="feed">
      {/* First item: Video card */}
      <VideoCard
        key={`vc-${category}`}
        category={category}
        lang={lang}
        user={user}
        onEditName={onEditName}
        onShare={onShare}
        onNeedSignup={onNeedSignup}
      />

      {/* Rest: Image cards */}
      {keys.map(k => (
        <Card
          key={k}
          cardKey={k}
          style={style}
          ovlType={ovl}
          lang={lang}
          user={user}
          onEditName={onEditName}
          onShare={onShare}
          onNeedSignup={onNeedSignup}
        />
      ))}
    </div>
  );
}
