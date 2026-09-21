import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Reset mobile menu state on route change during render
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Lock body scroll and set focus when menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables && focusables.length > 0) {
          focusables[0].focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--cn-border)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--cn-text)',
              textDecoration: 'none',
            }}
            aria-label="CronixUI Home"
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'var(--cn-accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                color: '#ffffff',
              }}
            >
              CN
            </div>
            <span style={{ fontWeight: 600, fontSize: '18px', letterSpacing: '-0.01em' }}>
              CronixUI
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="desktop-nav">
            <NavLink
              to="/components"
              className={({ isActive }) => `btn ${isActive ? '' : 'btn-ghost'}`}
              style={({ isActive }) => ({
                background: isActive ? 'var(--cn-surface-2)' : 'transparent',
                border: 'none',
              })}
            >
              Components
            </NavLink>
            <NavLink
              to="/demo"
              className={({ isActive }) => `btn ${isActive ? '' : 'btn-ghost'}`}
              style={({ isActive }) => ({
                background: isActive ? 'var(--cn-surface-2)' : 'transparent',
                border: 'none',
              })}
            >
              Demo
            </NavLink>
            <NavLink
              to="/install"
              className={({ isActive }) => `btn ${isActive ? '' : 'btn-ghost'}`}
              style={({ isActive }) => ({
                background: isActive ? 'var(--cn-surface-2)' : 'transparent',
                border: 'none',
              })}
            >
              Install
            </NavLink>
            <a
              href="https://github.com/CazyUndee/CronixUI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ border: 'none', background: 'transparent' }}
              aria-label="GitHub Repository (opens in new tab)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={triggerRef}
            type="button"
            className="mobile-nav-toggle btn btn-ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-dialog"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        >
          <div
            ref={dialogRef}
            id="mobile-nav-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="mobile-nav-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-nav-header">
              <span style={{ fontWeight: 600, fontSize: '18px' }}>CronixUI</span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeMenu}
                aria-label="Close menu"
                style={{ padding: '8px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/components"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}
              >
                Components
              </NavLink>
              <NavLink
                to="/demo"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}
              >
                Demo
              </NavLink>
              <NavLink
                to="/install"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}
              >
                Install
              </NavLink>
              <a
                href="https://github.com/CazyUndee/CronixUI"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-link"
              >
                GitHub Repository ↗
              </a>
            </nav>
          </div>
        </div>
      )}

      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        <Outlet />
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--cn-border)',
          padding: '48px 0',
          marginTop: '80px',
          background: 'var(--cn-surface)',
        }}
        aria-label="Site Footer"
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ maxWidth: '360px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    background: 'var(--cn-accent)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: '#ffffff',
                  }}
                >
                  CN
                </div>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>CronixUI</span>
              </div>
              <p style={{ color: 'var(--cn-text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                Dark-themed UI toolkit with crimson accents. 53 components across 12 languages and 11 native platforms.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cn-accent-text)', marginBottom: '12px' }}>
                  Navigation
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/components">Components Catalogue</Link></li>
                  <li><Link to="/demo">Live Playground</Link></li>
                  <li><Link to="/install">Installation</Link></li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cn-accent-text)', marginBottom: '12px' }}>
                  Resources
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <li>
                    <a href="https://github.com/CazyUndee/CronixUI" target="_blank" rel="noopener noreferrer">
                      GitHub Repository ↗
                    </a>
                  </li>
                  <li>
                    <a href="https://deepwiki.com/CazyUndee/CronixUI" target="_blank" rel="noopener noreferrer">
                      Documentation Wiki ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--cn-border)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              color: 'var(--cn-text-dim)',
              fontSize: '13px',
            }}
          >
            <span>© {new Date().getFullYear()} CronixUI. Free software under GPL-3.0 License.</span>
            <span>v1.1.5 · Outfit Typography · Crimson Accents</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
