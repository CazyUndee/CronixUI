import { Link } from 'react-router-dom';

const languages = [
  { name: 'JavaScript', icon: 'JS' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'React', icon: 'RE' },
  { name: 'Vue', icon: 'VU' },
  { name: 'Svelte', icon: 'SV' },
  { name: 'Solid', icon: 'SD' },
  { name: 'Python', icon: 'PY' },
  { name: 'Go', icon: 'GO' },
  { name: 'Rust', icon: 'RS' },
  { name: 'Flutter', icon: 'FL' },
  { name: 'WinUI', icon: 'WN' },
];

const features = [
  { title: 'Dark Theme', desc: 'Beautiful dark aesthetic with crimson accents' },
  { title: '10+ Frameworks', desc: 'One design system for all your projects' },
  { title: 'Accessible', desc: 'Built with accessibility in mind' },
  { title: 'Lightweight', desc: 'Minimal bundle size, maximum impact' },
];

const components = [
  'Buttons', 'Inputs', 'Cards', 'Modal', 'Dropdown', 'Tabs',
  'Accordion', 'Table', 'Toast', 'Navigation', 'Avatar', 'Badge',
  'Progress', 'Slider', 'Toggle', 'Pagination', 'Search', 'Command Palette',
];

export default function Home() {
  return (
    <>
      <section style={{
        padding: '120px 0',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(107, 35, 35, 0.15) 0%, transparent 60%)',
      }}>
        <div className="container">
          <span className="badge badge-accent" style={{ marginBottom: '24px' }}>
            v1.1.2 - Multi-platform UI toolkit
          </span>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: 700,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #f0ede8 0%, #c97a7a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Beautiful UI components<br />for every platform
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'var(--cn-text-muted)',
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}>
            A dark-themed UI toolkit with crimson accents and Outfit typography. 
            Available for JavaScript, TypeScript, React, Vue, Svelte, Solid, Python, Go, Rust, and Flutter.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            <Link to="/install" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
              Get Started
            </Link>
            <Link to="/components" className="btn" style={{ padding: '14px 28px', fontSize: '16px' }}>
              Browse Components
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {languages.map((lang) => (
              <div key={lang.name} style={{
                width: '48px',
                height: '48px',
                background: 'var(--cn-surface)',
                border: '1px solid var(--cn-border)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--cn-text-muted)',
              }}>
                {lang.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--cn-text-muted)', fontSize: '14px' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--cn-surface)' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '16px' }}>40+ Components</h2>
          <p style={{ textAlign: 'center', color: 'var(--cn-text-muted)', marginBottom: '48px' }}>
            Production-ready components for every need
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {components.map((comp) => (
              <div key={comp} className="card" style={{ 
                padding: '12px 20px', 
                cursor: 'pointer',
                background: 'var(--cn-surface-2)',
              }}>
                {comp}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/components" className="btn btn-primary">
              View All Components
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Ready to get started?</h2>
          <p style={{ color: 'var(--cn-text-muted)', marginBottom: '32px' }}>
            Install CronixUI in your project today
          </p>
          <Link to="/install" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            Installation Guide
          </Link>
        </div>
      </section>
    </>
  );
}