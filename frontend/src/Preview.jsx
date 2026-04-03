export default function Preview() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: 'sans-serif',
      padding: '40px 20px',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>
          <span style={{ color: '#e85d04' }}>Z</span>appify
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Premium Shoe Store
        </p>

        <div style={{ marginTop: '20px', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' }}>
          <div style={{
            width: '393px',
            height: '852px',
            background: '#1a1a1a',
            borderRadius: '54px',
            padding: '14px',
            border: '2px solid rgba(255,255,255,0.15)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px #000',
          }}>
            {/* Side buttons */}
            <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '36px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', left: '-3px', top: '170px', width: '3px', height: '64px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', left: '-3px', top: '248px', width: '3px', height: '64px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', right: '-3px', top: '180px', width: '3px', height: '80px', background: '#333', borderRadius: '0 2px 2px 0' }} />

            <div style={{ flex: 1, width: '100%', borderRadius: '42px', overflow: 'hidden', background: '#fff', position: 'relative' }}>
              {/* Dynamic island */}
              <div style={{
                position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)',
                width: '120px', height: '34px', background: '#000', borderRadius: '20px', zIndex: 100,
              }} />

              {/* Overlay UI */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
                background: '#fff', paddingTop: '58px',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#222' }}>
                    <span style={{ color: '#e85d04' }}>Z</span>appify
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Heart */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    {/* Bag */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    {/* Person */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>

                {/* Search Bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#f2f2f2', margin: '4px 16px 10px', borderRadius: '14px',
                  padding: '11px 14px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span style={{ fontSize: '14px', color: '#aaa' }}>What are you looking for?</span>
                </div>

                {/* Category Chips */}
                <div style={{
                  display: 'flex', gap: '8px', overflowX: 'auto', padding: '2px 16px 10px',
                  scrollbarWidth: 'none',
                }}>
                  {['All', 'Men Low Top Sneakers', 'Men High Top Sneakers', 'Men Mid Top Sneakers', 'Men Clogs'].map((cat, i) => (
                    <div key={cat} style={{
                      flexShrink: 0, padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                      background: i === 0 ? '#e85d04' : '#f2f2f2',
                      color: i === 0 ? '#fff' : '#888',
                      whiteSpace: 'nowrap',
                    }}>{cat}</div>
                  ))}
                </div>
              </div>

              {/* iframe behind overlay */}
              <iframe src="/?embed=1" style={{ width: '100%', height: '100%', border: 'none', paddingTop: '185px', boxSizing: 'border-box' }} title="Zappify App" />
            </div>

            <div style={{ width: '134px', height: '5px', background: 'rgba(255,255,255,0.4)', borderRadius: '3px', marginTop: '10px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
