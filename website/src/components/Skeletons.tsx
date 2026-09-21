export function HomeSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading Home page..."
      aria-live="polite"
      className="container"
      style={{ padding: '120px 24px 88px' }}
    >
      <div style={{ maxWidth: '900px' }}>
        <div style={{ width: '120px', height: '20px', background: 'var(--cn-surface-2)', borderRadius: '4px', marginBottom: '28px' }} />
        <div style={{ width: '80%', height: '56px', background: 'var(--cn-surface-2)', borderRadius: '8px', marginBottom: '16px' }} />
        <div style={{ width: '60%', height: '56px', background: 'var(--cn-surface-2)', borderRadius: '8px', marginBottom: '32px' }} />
        <div style={{ width: '90%', height: '24px', background: 'var(--cn-surface-2)', borderRadius: '4px', marginBottom: '40px' }} />
        <div style={{ display: 'flex', gap: '14px' }}>
          <div style={{ width: '140px', height: '48px', background: 'var(--cn-surface-2)', borderRadius: '8px' }} />
          <div style={{ width: '160px', height: '48px', background: 'var(--cn-surface-2)', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
}

export function ComponentsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading Components catalogue..."
      aria-live="polite"
      className="container"
      style={{ padding: '64px 24px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ width: '240px', height: '40px', background: 'var(--cn-surface-2)', borderRadius: '8px', margin: '0 auto 16px' }} />
        <div style={{ width: '400px', maxWidth: '100%', height: '20px', background: 'var(--cn-surface-2)', borderRadius: '4px', margin: '0 auto' }} />
      </div>
      <div style={{ maxWidth: '480px', height: '44px', background: 'var(--cn-surface-2)', borderRadius: '8px', margin: '0 auto 48px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card" style={{ height: '140px', background: 'var(--cn-surface-2)' }} />
        ))}
      </div>
    </div>
  );
}

export function InstallSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading Installation guide..."
      aria-live="polite"
      className="container"
      style={{ padding: '64px 24px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ width: '220px', height: '40px', background: 'var(--cn-surface-2)', borderRadius: '8px', margin: '0 auto 16px' }} />
        <div style={{ width: '320px', maxWidth: '100%', height: '20px', background: 'var(--cn-surface-2)', borderRadius: '4px', margin: '0 auto' }} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ width: '90px', height: '38px', background: 'var(--cn-surface-2)', borderRadius: '8px' }} />
        ))}
      </div>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="card" style={{ height: '260px', background: 'var(--cn-surface-2)' }} />
      </div>
    </div>
  );
}

export function DemoSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading Live Playground..."
      aria-live="polite"
      className="demo-page"
    >
      <header className="demo-hero">
        <div style={{ width: '180px', height: '18px', background: 'var(--cn-surface-2)', borderRadius: '4px', marginBottom: '24px' }} />
        <div style={{ width: '360px', maxWidth: '100%', height: '52px', background: 'var(--cn-surface-2)', borderRadius: '8px', marginBottom: '28px' }} />
        <div style={{ width: '500px', maxWidth: '100%', height: '20px', background: 'var(--cn-surface-2)', borderRadius: '4px', marginBottom: '36px' }} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ width: '150px', height: '44px', background: 'var(--cn-surface-2)', borderRadius: '8px' }} />
          <div style={{ width: '180px', height: '44px', background: 'var(--cn-surface-2)', borderRadius: '8px' }} />
        </div>
      </header>
    </div>
  );
}
