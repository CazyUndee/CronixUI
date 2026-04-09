import { useState } from 'react';

const installOptions = [
  {
    id: 'js',
    title: 'JavaScript / TypeScript',
    icon: 'JS',
    code: `npm install cronixui`,
    description: 'For vanilla JavaScript and TypeScript projects',
  },
  {
    id: 'react',
    title: 'React',
    icon: 'RE',
    code: `npm install cronixui`,
    description: 'React components (included in main package)',
    note: 'Import styles: import "cronixui/dist/cronixui.css"',
  },
  {
    id: 'vue',
    title: 'Vue',
    icon: 'VU',
    code: `npm install cronixui`,
    description: 'Vue 3 components (included in main package)',
  },
  {
    id: 'svelte',
    title: 'Svelte',
    icon: 'SV',
    code: `npm install cronixui`,
    description: 'Svelte components (included in main package)',
  },
  {
    id: 'solid',
    title: 'Solid',
    icon: 'SD',
    code: `npm install cronixui`,
    description: 'SolidJS components (included in main package)',
  },
  {
    id: 'python',
    title: 'Python',
    icon: 'PY',
    code: `pip install cronixui`,
    description: 'Python classes for building UI',
  },
  {
    id: 'go',
    title: 'Go',
    icon: 'GO',
    code: `go get github.com/CazyUndee/CronixUI/packages/go/cronixui`,
    description: 'Go package for UI components',
  },
  {
    id: 'rust',
    title: 'Rust',
    icon: 'RS',
    code: `cargo add cronixui`,
    description: 'Add to your Cargo.toml:',
    toml: `[dependencies]\ncronixui = "1.1.2"`,
  },
  {
    id: 'flutter',
    title: 'Flutter',
    icon: 'FL',
    code: `# Add to pubspec.yaml
dependencies:
  cronixui:
    git:
      url: https://github.com/CazyUndee/CronixUI.git
      path: packages/flutter`,
    description: 'Flutter widgets via GitHub',
  },
  {
    id: 'winui',
    title: 'WinUI 3',
    icon: 'WN',
    code: `dotnet add package CronixUI.WinUI`,
    description: 'Windows UI 3 controls',
  },
];

export default function Install() {
  const [activeTab, setActiveTab] = useState('js');

  const activeOption = installOptions.find(opt => opt.id === activeTab)!;

  return (
    <div className="container" style={{ padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>Installation</h1>
        <p style={{ color: 'var(--cn-text-muted)', fontSize: '18px' }}>
          Install CronixUI for your preferred platform
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '48px', 
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {installOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveTab(opt.id)}
            className={`btn ${activeTab === opt.id ? 'btn-primary' : ''}`}
            style={{
              background: activeTab === opt.id ? 'var(--cn-accent)' : 'var(--cn-surface)',
              borderColor: activeTab === opt.id ? 'var(--cn-accent)' : 'var(--cn-border)',
            }}
          >
            {opt.title}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--cn-surface-2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '14px',
            }}>
              {activeOption.icon}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{activeOption.title}</h2>
              <p style={{ color: 'var(--cn-text-muted)', fontSize: '14px' }}>{activeOption.description}</p>
            </div>
          </div>

          <div style={{ 
            background: 'var(--cn-bg)', 
            borderRadius: 'var(--cn-radius)', 
            padding: '16px',
            fontFamily: 'var(--cn-font-mono)',
            fontSize: '14px',
            overflow: 'auto',
          }}>
            <code>{activeOption.code}</code>
          </div>

          {activeOption.toml && (
            <div style={{ 
              background: 'var(--cn-bg)', 
              borderRadius: 'var(--cn-radius)', 
              padding: '16px',
              fontFamily: 'var(--cn-font-mono)',
              fontSize: '14px',
              marginTop: '12px',
              overflow: 'auto',
            }}>
              <code>{activeOption.toml}</code>
            </div>
          )}

          {activeOption.note && (
            <p style={{ 
              marginTop: '16px', 
              fontSize: '14px', 
              color: 'var(--cn-accent-text)',
            }}>
              {activeOption.note}
            </p>
          )}
        </div>

        <div className="card" style={{ marginTop: '24px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>CDN</h3>
          <p style={{ color: 'var(--cn-text-muted)', fontSize: '14px', marginBottom: '12px' }}>
            Quick prototype without npm:
          </p>
          <div style={{ 
            background: 'var(--cn-bg)', 
            borderRadius: 'var(--cn-radius)', 
            padding: '16px',
            fontFamily: 'var(--cn-font-mono)',
            fontSize: '13px',
            overflow: 'auto',
          }}>
{`<link rel="stylesheet" href="https://unpkg.com/cronixui@1.1.2/packages/web/dist/cronixui.css">
<script src="https://unpkg.com/cronixui@1.1.2/packages/web/dist/cronixui.js"></script>`}
          </div>
        </div>
      </div>
    </div>
  );
}