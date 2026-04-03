import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'
import { ALL_PRODUCTS } from './data/products'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart, User, Trash2 } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [activeNav, setActiveNav] = useState('MEN');
  const [sneakersView, setSneakersView] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const toggleFilter = (item, type) => {
    if (type === 'category') {
      setSelectedCategories(prev =>
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    } else {
      setSelectedThemes(prev =>
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    }
  };

  const handleNavigate = (destination) => {
    setSelectedProduct(null);
    setSelectedCategories([]);
    setSelectedThemes([]);
    if (destination === 'SNEAKERS') {
      setSneakersView(true);
    } else {
      setSneakersView(false);
    }
    if (destination !== 'home') setActiveNav(destination);
  };

  const addToCart = (product, size) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size);
      if (exists) {
        return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlistItems.some(i => i.id === id);

  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter(product => {
      const sneakerMatch = sneakersView ? product.id >= 30 && product.id <= 44 : true;
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(product.theme);
      return sneakerMatch && categoryMatch && themeMatch;
    });

    if (sortOption === 'low-high') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortOption === 'high-low') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortOption === 'newest') result = [...result].sort((a, b) => b.id - a.id);

    return result;
  }, [selectedCategories, selectedThemes, sortOption, sneakersView]);

  return (
    <div className="zappify-app">
      <Header
        onOpenOverlay={setActiveOverlay}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, i) => sum + i.qty, 0)}
        wishlistCount={wishlistItems.length}
        activeNav={activeNav}
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
      />

      <main className="app-main">
        <div className="container-broad main-layout">
          <AnimatePresence mode="wait">
            {!selectedProduct ? (
              <motion.div
                key="grid"
                className="grid-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="layout-split">
                  <Sidebar
                    selectedCategories={selectedCategories}
                    selectedThemes={selectedThemes}
                    onToggleFilter={toggleFilter}
                  />
                  <ProductGrid
                    products={filteredProducts}
                    onProductClick={setSelectedProduct}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={isWishlisted}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                className="detail-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ProductDetail
                  product={selectedProduct}
                  onBack={() => setSelectedProduct(null)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(selectedProduct.id)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="zappify-footer">
        <div className="container-broad">
          <div className="footer-bottom">
            <p>&copy; 2026 Zappify Shoe Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeOverlay && (
          <Overlay
            type={activeOverlay}
            onClose={() => setActiveOverlay(null)}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            onRemoveFromCart={removeFromCart}
            onToggleWishlist={toggleWishlist}
            onLoginSuccess={setLoggedInUser}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const Overlay = ({ type, onClose, cartItems, wishlistItems, onRemoveFromCart, onToggleWishlist, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const isDrawer = type === 'cart' || type === 'wishlist';
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="overlay-system">
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {isDrawer ? (
        <motion.div
          className="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="overlay-header">
            <h3>{type === 'cart' ? 'SHOPPING BAG' : 'MY WISHLIST'}</h3>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>

          <div className="overlay-content">
            {type === 'cart' ? (
              cartItems.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag size={48} />
                  <p>Your bag is currently empty.</p>
                  <button className="btn-primary" onClick={onClose}>CONTINUE SHOPPING</button>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item, i) => (
                    <div key={i} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-size">Size: UK {item.size}</p>
                        <p className="cart-item-qty">Qty: {item.qty}</p>
                        <p className="cart-item-price">₹ {(item.price * item.qty).toLocaleString('en-IN')}</p>
                      </div>
                      <button className="remove-btn" onClick={() => onRemoveFromCart(item.id, item.size)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span>Total</span>
                    <span>₹ {cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button className="btn-primary checkout-btn">PROCEED TO CHECKOUT</button>
                </div>
              )
            ) : (
              wishlistItems.length === 0 ? (
                <div className="empty-state">
                  <Heart size={48} />
                  <p>Your wishlist is currently empty.</p>
                  <button className="btn-primary" onClick={onClose}>CONTINUE SHOPPING</button>
                </div>
              ) : (
                <div className="cart-items">
                  {wishlistItems.map((item, i) => (
                    <div key={i} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">₹ {item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button className="remove-btn" onClick={() => onToggleWishlist(item)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <div className="modal-header">
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>
          <div className="modal-content login-modal">
            <User size={48} className="user-icon-large" />
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Join Zappify today' : 'Login to your Zappify account'}</p>

            <div className="auth-form">
              {isSignUp && <input type="text" placeholder="Full Name" />}
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              {isSignUp && <input type="password" placeholder="Confirm Password" />}
              <button className="btn-primary auth-btn">{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</button>
              <div className="separator"><span>OR CONTINUE WITH</span></div>
              <div className="google-btn-wrap">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    onLoginSuccess(decoded);
                    onClose();
                  }}
                  onError={() => console.log('Google login failed')}
                  width="100%"
                  text={isSignUp ? 'signup_with' : 'signin_with'}
                />
              </div>
            </div>

            <p className="auth-footer">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App
