import React from 'react';

export default function Preview() {
  return (
    <div style={styles.page}>
      <div style={styles.bg} />
      <div style={styles.content}>
        <div style={styles.brand}>
          <span style={styles.brandZ}>Z</span>appify
        </div>
        <p style={styles.tagline}>Premium Shoe Store</p>
        <div style={styles.phoneWrap}>
          <div style={styles.phone}>
            <div style={styles.notch} />
            <div style={styles.screen}>
              <iframe
                src="/"
                style={styles.iframe}
                title="Zappify App"
              />
            </div>
            <div style={styles.homeBar} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: 'sans-serif',
    padding: '40px 20px',
    flexDirection: 'column',
  },
  bg: {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse at 20% 50%, rgba(232,93,4,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(100,100,255,0.1) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '-1px',
  },
  brandZ: {
    color: '#e85d04',
  },
  tagline: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    margin: 0,
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  phoneWrap: {
    marginTop: '20px',
    filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))',
  },
  phone: {
    width: '375px',
    height: '780px',
    background: '#111',
    borderRadius: '50px',
    padding: '12px',
    border: '2px solid rgba(255,255,255,0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notch: {
    width: '120px',
    height: '28px',
    background: '#111',
    borderRadius: '0 0 20px 20px',
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  screen: {
    flex: 1,
    width: '100%',
    borderRadius: '40px',
    overflow: 'hidden',
    background: '#fff',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  homeBar: {
    width: '120px',
    height: '4px',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '2px',
    marginTop: '8px',
  },
};
