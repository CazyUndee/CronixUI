import { Link } from 'react-router-dom';

const languages = [
  { name: 'JavaScript', tag: 'js', code: `import { Button } from '@cronixui/web';` },
  { name: 'TypeScript', tag: 'ts', code: `import { Button } from '@cronixui/ts';` },
  { name: 'React', tag: 'jsx', code: `import { Button } from '@cronixui/react';` },
  { name: 'Vue', tag: 'vue', code: `import { CnButton } from '@cronixui/vue';` },
  { name: 'Svelte', tag: 'svelte', code: `import Button from '@cronixui/svelte/Button';` },
  { name: 'Solid', tag: 'jsx', code: `import { Button } from '@cronixui/solid';` },
  { name: 'Python', tag: 'py', code: `from cronixui import Button` },
  { name: 'Go', tag: 'go', code: `import "github.com/cronixui/cronixui"` },
  { name: 'Rust', tag: 'rs', code: `use cronixui::Button;` },
  { name: 'Flutter', tag: 'dart', code: `import 'package:cronixui/cronixui.dart';` },
  { name: 'WinUI', tag: 'cs', code: `using CronixUI.WinUI;` },
];

const marquee = [
  'Native, not HTML wrappers.',
  'One design language.',
  '11 frameworks.',
  'Dark first.',
  'Accessible out of the box.',
  'Real widget toolkits, no electron.',
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <span className="home-kicker">CronixUI · v1.1.5</span>
          <h1 className="home-title">
            One design system.
            <br />
            <span className="home-title-accent">Eleven native stacks.</span>
          </h1>
          <p className="home-lede">
            CronixUI ships the same component library as <em>real, native widgets</em> in React, Vue,
            Svelte, Solid, Flutter, Go, Rust, Python, WinUI — and plain JS/TS. Dark first, accessible,
            and consistent down to the last design token.
          </p>
          <div className="home-actions">
            <Link to="/demo" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
              See it live
            </Link>
            <Link to="/install" className="btn" style={{ padding: '14px 28px', fontSize: '16px' }}>
              Install a package
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee-track">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* Language code wall */}
      <section className="home-langs">
        <div className="container">
          <div className="home-section-head">
            <h2>Same component. Eleven imports.</h2>
            <p>
              Write it once in your framework of choice — every package exposes the identical
              component set, so switching stacks takes minutes, not weeks.
            </p>
          </div>
          <div className="home-code-grid">
            {languages.map((lang) => (
              <div key={lang.name} className="home-code-card">
                <div className="home-code-head">
                  <span className="home-code-name">{lang.name}</span>
                  <span className="home-code-tag">{lang.tag}</span>
                </div>
                <pre className="home-code-sample">
                  <code>{lang.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="home-manifesto">
        <div className="container" style={{ width: '100%' }}>
          <div className="composer">
            {['CARDS', 'TABS', 'MODAL', 'TOAST', 'TABLE', 'AVATAR', 'BADGE', 'ACCORDION', 'SLIDER'].map((w, i) => (
              <span key={w} style={{ fontStyle: i % 3 === 0 ? 'italic' : 'normal' }}>{w}</span>
            ))}
          </div>
          <p className="home-statement">
            No wrappers. No webviews. No "just emit HTML and call it native." <br />
            A real component library, {`hand-built`} for every toolkit that matters.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '34px', marginBottom: '14px' }}>Ready to get started?</h2>
          <p style={{ color: 'var(--cn-text-muted)', marginBottom: '30px' }}>
            Pick your stack and be rendering a real native button in under a minute.
          </p>
          <Link to="/demo" className="btn btn-primary" style={{ padding: '14px 30px', fontSize: '16px' }}>
            Open the live example
          </Link>
        </div>
      </section>
    </>
  );
}