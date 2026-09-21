import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        padding: '120px 24px',
        textAlign: 'center',
        maxWidth: '640px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--cn-font-mono)',
          color: 'var(--cn-accent-text)',
          fontSize: '14px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px',
        }}
      >
        404 — Page Not Found
      </span>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em' }}>
        Route not found
      </h1>
      <p style={{ color: 'var(--cn-text-muted)', fontSize: '18px', marginBottom: '36px', lineHeight: 1.6 }}>
        The page you are looking for doesn't exist or has moved. Explore the CronixUI library or return to safety using the options below.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary" style={{ padding: '12px 24px' }}>
          Return Home
        </Link>
        <Link to="/components" className="btn" style={{ padding: '12px 24px' }}>
          Browse Components
        </Link>
        <Link to="/demo" className="btn" style={{ padding: '12px 24px' }}>
          Try Live Demo
        </Link>
        <Link to="/install" className="btn" style={{ padding: '12px 24px' }}>
          Installation Guide
        </Link>
      </div>
    </div>
  );
}
