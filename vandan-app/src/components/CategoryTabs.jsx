export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="cat-tabs">
      {categories.map(c => (
        <button
          key={c.id}
          className={`cat-tab${activeCategory === c.id ? ' cat-tab--active' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
