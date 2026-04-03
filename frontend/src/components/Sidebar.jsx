import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const categories = [
  'Men Low Top Sneakers',
  'Men High Top Sneakers',
  'Men Mid Top Sneakers',
  'Men Mules',
  'Men Clogs'
];

const themes = [
  'Urban Tech',
  'Retro Classic',
  'Cyber Sport',
  'Minimalist'
];

const Sidebar = ({ selectedCategories, selectedThemes, onToggleFilter }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isThemesOpen, setIsThemesOpen] = useState(true);

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

      <div className="filter-section">
        <div 
          className="section-title" 
          onClick={() => setIsThemesOpen(!isThemesOpen)}
        >
          <h4>THEMES</h4>
          <ChevronDown 
            size={18} 
            style={{ transform: isThemesOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: '0.3s' }} 
          />
        </div>
        {isThemesOpen && (
          <ul className="filter-list">
            {themes.map((theme, i) => (
              <li key={i} className="filter-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedThemes.includes(theme)}
                    onChange={() => onToggleFilter(theme, 'theme')}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="item-name">{theme}</span>
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
