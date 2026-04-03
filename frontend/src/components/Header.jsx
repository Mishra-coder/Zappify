import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

const Header = ({ onOpenOverlay, onNavigate, cartCount, wishlistCount, activeNav, loggedInUser, onLogout, onOpenAccount }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky-header glass">
      <nav className="container-broad">
        <div className="header-wrapper">
          <div className="logo-section">
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="brand-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
              <span className="logo-accent">Z</span>appify
            </div>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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

          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="What are you looking for?"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <div className="user-actions">
            {loggedInUser ? (
              <div className="user-profile-wrap">
                <button className="user-avatar-btn" onClick={onOpenAccount}>
                  <img src={loggedInUser.picture} alt={loggedInUser.name} className="user-avatar" />
                </button>
              </div>
            ) : (
              <button className="action-btn" title="Profile" onClick={() => onOpenOverlay('login')}>
                <User size={22} />
              </button>
            )}
            <button className="action-btn" title="Wishlist" onClick={() => onOpenOverlay('wishlist')}>
              <Heart size={22} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            <button className="action-btn cart-btn" title="Cart" onClick={() => onOpenOverlay('cart')}>
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
