import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--cn-border)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--cn-text)', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--cn-accent)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
            }}>
              CN
            </div>
            <span style={{ fontWeight: 600, fontSize: '18px' }}>CronixUI</span>
          </NavLink>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <NavLink to="/components" className={({ isActive }) => `btn ${isActive ? '' : 'btn-ghost'}`} style={({ isActive }) => ({
              background: isActive ? 'var(--cn-surface-2)' : 'transparent',
              border: 'none',
            })}>
              Components
            </NavLink>
            <NavLink to="/install" className={({ isActive }) => `btn ${isActive ? '' : 'btn-ghost'}`} style={({ isActive }) => ({
              background: isActive ? 'var(--cn-surface-2)' : 'transparent',
              border: 'none',
            })}>
              Install
            </NavLink>
            <a href="https://github.com/CazyUndee/CronixUI" target="_blank" rel="noopener noreferrer" className="btn" style={{ border: 'none', background: 'transparent' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{
        borderTop: '1px solid var(--cn-border)',
        padding: '48px 0',
        marginTop: '80px',
        background: 'var(--cn-surface)',
      }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--cn-text-muted)' }}>
          <p style={{ marginBottom: '8px' }}>CronixUI - Dark-themed UI toolkit with crimson accents</p>
          <p style={{ fontSize: '14px' }}>Available for JavaScript, TypeScript, React, Vue, Svelte, Solid, Python, Go, Rust, Flutter</p>
        </div>
      </footer>
    </div>
  );
}