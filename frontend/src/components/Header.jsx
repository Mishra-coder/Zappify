import { useState } from 'react';
import { Search, ShoppingBag, Heart, User, X } from 'lucide-react';

const Header = ({ onOpenOverlay, onNavigate, cartCount, wishlistCount, activeNav, loggedInUser, onOpenAccount, searchQuery, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky-header">
      <nav className="container-broad">
        <div className="header-wrapper">
          <div className="brand-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <span className="logo-accent">Z</span>appify
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <button
                className={`nav-item ${activeNav === 'ALL' || (!activeNav) ? 'active' : ''}`}
                onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              >
                ALL
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeNav === 'MEN' ? 'active' : ''}`}
                onClick={() => { onNavigate('MEN'); setIsMobileMenuOpen(false); }}
              >
                MEN
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeNav === 'SNEAKERS' ? 'active' : ''}`}
                onClick={() => { onNavigate('SNEAKERS'); setIsMobileMenuOpen(false); }}
              >
                SNEAKERS
              </button>
            </li>
          </ul>

          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => onSearch('')}><X size={16} /></button>
            )}
          </div>

          <div className="user-actions">
            <button className="action-btn" title="Wishlist" onClick={() => onOpenOverlay('wishlist')}>
              <Heart size={22} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            <button className="action-btn cart-btn" title="Cart" onClick={() => onOpenOverlay('cart')}>
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            {loggedInUser ? (
              <div className="user-profile-wrap">
                <button className="user-avatar-btn" onClick={onOpenAccount}>
                  <img
                    src={loggedInUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(loggedInUser.name)}&background=e85d04&color=fff`}
                    alt={loggedInUser.name}
                    className="user-avatar"
                  />
                </button>
              </div>
            ) : (
              <button className="action-btn" title="Profile" onClick={() => onOpenOverlay('login')}>
                <User size={22} />
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
