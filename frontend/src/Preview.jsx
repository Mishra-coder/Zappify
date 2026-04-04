import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preview() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preview-page">
      <div className="preview-top">
        <div className="preview-title">
          <span>Z</span>appify
        </div>
        <p className="preview-subtitle-text">
          Premium Shoe Store
        </p>

        <div className="phone-scaler">
          <div className="phone-frame">
            <div className="side-btn btn-silent" />
            <div className="side-btn btn-up" />
            <div className="side-btn btn-down" />
            <div className="side-btn btn-power" style={{ left: 'auto' }} />

            <div className="inner-frame">
              <div className="dynamic-island" />

              <AnimatePresence mode="wait">
                {showSplash ? (
                  <motion.div
                    key="phone-splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="preview-phone-splash"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="align-center"
                    >
                      <img src="/logo.png" alt="Zappify" className="preview-logo-img" />
                      <div className="preview-logo-subtitle">Premium Shoes</div>
                      <div className="preview-spinner" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="phone-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="preview-phone-content"
                  >
                    <div className="phone-header-wrapper">
                      <div className="phone-header">
                        <div className="phone-brand">
                          <span>Z</span>appify
                        </div>
                        <div className="phone-icons">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                          </svg>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                      </div>

                      <div className="phone-search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <span>What are you looking for?</span>
                      </div>

                      <div className="phone-categories">
                        {['All', 'Men Low Top', 'Men High Top', 'Men Mid Top', 'Men Clogs'].map((cat, i) => (
                          <div key={cat} className={`phone-cat-chip ${i === 0 ? 'active' : ''}`}>{cat}</div>
                        ))}
                      </div>
                    </div>

                    <iframe src="/?embed=1" className="phone-iframe" title="Zappify App" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="home-bar" />
          </div>
        </div>

        <motion.div 
          className="qr-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="qr-text">
            <h3>Experience on Mobile</h3>
            <p>Scan to see the real Zappify app on your phone</p>
          </div>
          <div className="qr-code-wrapper">
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin)}`} alt="QR Code" />
          </div>
          <button className="share-btn" onClick={() => {
            navigator.clipboard.writeText(window.location.origin);
            alert("Link copied! Share it with anyone.");
          }}>
            Copy App Link
          </button>
        </motion.div>
      </div>
    </div>
  );
}
