import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const categories = [
  'Running',
  'Lifestyle',
  'Basketball',
  'Training & Gym',
  'Jordan',
  'Skateboarding',
  'Walking',
];

const Sidebar = ({ selectedCategories, onToggleFilter }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="filter-header">
        <Filter size={20} />
        <h3>FILTERS</h3>
      </div>

      <div className="filter-section">
        <div
          className="section-title"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <h4>CATEGORIES</h4>
          <ChevronDown
            size={18}
            style={{ transform: isCategoriesOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: '0.3s' }}
          />
        </div>
        {isCategoriesOpen && (
          <ul className="filter-list">
            {categories.map((cat, i) => (
              <li key={i} className="filter-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => onToggleFilter(cat, 'category')}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="item-name">{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
