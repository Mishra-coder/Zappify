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
            <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '36px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', left: '-3px', top: '170px', width: '3px', height: '64px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', left: '-3px', top: '248px', width: '3px', height: '64px', background: '#333', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', right: '-3px', top: '180px', width: '3px', height: '80px', background: '#333', borderRadius: '0 2px 2px 0' }} />

            <div style={{ flex: 1, width: '100%', borderRadius: '42px', overflow: 'hidden', background: '#fff', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '34px',
                background: '#000',
                borderRadius: '20px',
                zIndex: 100,
              }} />
              <div style={{ paddingTop: '58px', height: '100%', boxSizing: 'border-box' }}>
                <iframe src="/" style={{ width: '100%', height: '100%', border: 'none' }} title="Zappify App" />
              </div>
            </div>

            <div style={{ width: '134px', height: '5px', background: 'rgba(255,255,255,0.4)', borderRadius: '3px', marginTop: '10px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
