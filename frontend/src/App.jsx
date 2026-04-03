import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'
import { ALL_PRODUCTS } from './data/products'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart, User, ArrowRight } from 'lucide-react'

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);

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
    if (destination === 'home' || destination === 'MEN' || destination === 'SNEAKERS') {
      setSelectedProduct(null);
      setSelectedCategories([]);
      setSelectedThemes([]);
    }
  };

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(product.theme);
      return categoryMatch && themeMatch;
    });
  }, [selectedCategories, selectedThemes]);

  return (
    <div className="zappify-app">
      <Header 
        onOpenOverlay={setActiveOverlay} 
        onNavigate={handleNavigate}
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
                  <ProductGrid products={filteredProducts} onProductClick={setSelectedProduct} />
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
                <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
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
          />
        )}
      </AnimatePresence>

      </div>
  )
}

const Overlay = ({ type, onClose }) => {
  const isDrawer = type === 'cart' || type === 'wishlist';

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
            <div className="empty-state">
              {type === 'cart' ? <ShoppingBag size={48} /> : <Heart size={48} />}
              <p>Your {type} is currently empty.</p>
              <button className="btn-primary" onClick={onClose}>CONTINUE SHOPPING</button>
            </div>
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
            <h2>Welcome Back</h2>
            <p>Login to your Zappify account</p>
            
            <div className="auth-form">
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button className="btn-primary auth-btn">SIGN IN</button>
              <div className="separator"><span>OR CONTINUE WITH</span></div>
              <button className="btn-outline google-btn">GOOGLE</button>
            </div>
            
            <p className="auth-footer">Don't have an account? <span>Sign Up</span></p>
          </div>
        </motion.div>
      )}

      </div>
  );
};

export default App
