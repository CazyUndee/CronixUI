import { useState } from 'react';

const ALL_PLATFORMS = ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'];

type Platform = typeof ALL_PLATFORMS[number];

interface Component {
  name: string;
  desc: string;
  platforms: Platform[];
}

const componentCategories: { title: string; components: Component[] }[] = [
  {
    title: 'Form Elements',
    components: [
      { name: 'Button', desc: 'Primary, secondary, ghost, and outline variants with loading states', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Input', desc: 'Text inputs with labels, errors, focus rings, and validation', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Textarea', desc: 'Multi-line text input with custom styling', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Checkbox', desc: 'Custom checkbox with label support and keyboard access', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Radio', desc: 'Radio button groups with custom indicator', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Select', desc: 'Dropdown selection with custom chevron and focus state', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Slider', desc: 'Range input with custom thumb styling', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Toggle', desc: 'Accessible switch (role=switch) for boolean states', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'FileInput', desc: 'Styled file picker with keyboard support', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Rating', desc: 'Star rating picker with hover and keyboard input', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'ColorPicker', desc: 'Color swatch picker with radiogroup semantics', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'DatePicker', desc: 'Date selection with calendar grid', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'FormGroup', desc: 'Label + field + help/error wrapper for consistent forms', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python'] },
    ],
  },
  {
    title: 'Display',
    components: [
      { name: 'Badge', desc: 'Status and count badges in six accent colors', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Tag', desc: 'Removable tags with dismiss actions', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Chip', desc: 'Compact selectable chip labels', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Card', desc: 'Content container with header, body, footer, hover states', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Avatar', desc: 'User avatars with fallback initials', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Alert', desc: 'Informational alerts across success/warning/error/info', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Spinner', desc: 'Animated loading indicators', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Skeleton', desc: 'Loading placeholder shimmer blocks', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Progress', desc: 'Determinate and indeterminate progress bars', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Stat', desc: 'Statistical values with delta indicators', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Typography', desc: 'Heading scale, muted/dim text, and mono utilities', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
    ],
  },
  {
    title: 'Data',
    components: [
      { name: 'Table', desc: 'Sortable data tables with ARIA sort indicators', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'List', desc: 'List items with avatars and actions', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Tooltip', desc: 'Contextual tooltips with positioning', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'TreeView', desc: 'Accessible tree with keyboard navigation', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
    ],
  },
  {
    title: 'Overlay',
    components: [
      { name: 'Modal', desc: 'Focus-trapped dialog with backdrop and ESC to close', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Dropdown', desc: 'Menu dropdowns anchored to a trigger', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Tabs', desc: 'Tabbed panels with arrow-key and role=tablist support', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Accordion', desc: 'Collapsible sections (aria-expanded)', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Toast', desc: 'Auto-dismissing notifications', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web', 'Java'] },
      { name: 'Drawer', desc: 'Slide-in panel with focus trap and ESC to close', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Popover', desc: 'Click-outside and ESC-dismissible context menu', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Notification', desc: 'System-style notification banners', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
    ],
  },
  {
    title: 'Navigation',
    components: [
      { name: 'Pagination', desc: 'Page navigation controls with ranges', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Search', desc: 'Search input with results dropdown', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'CommandPalette', desc: 'Keyboard-driven command palette', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Nav', desc: 'Tab-style navigation bar', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Breadcrumb', desc: 'Hierarchical navigation trail', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
    ],
  },
  {
    title: 'Layout',
    components: [
      { name: 'Container', desc: 'Responsive centered container', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Stack/HStack', desc: 'Vertical and horizontal stacking with spacing', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Divider', desc: 'Visual separator', platforms: ['React', 'Svelte', 'Solid', 'Vue'] },
      { name: 'Header', desc: 'Page header with title and actions', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI'] },
      { name: 'Sidebar', desc: 'Responsive sidebar navigation', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI'] },
      { name: 'Footer', desc: 'Page footer layout', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI'] },
    ],
  },
  {
    title: 'Advanced',
    components: [
      { name: 'Stepper', desc: 'Multi-step wizard with progress', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'Timeline', desc: 'Vertical timeline of events', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'EmptyState', desc: 'Empty and error state placeholders', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'FileUpload', desc: 'Drag-and-drop file upload zone', platforms: ['React', 'Svelte', 'Solid', 'Vue', 'Python', 'Rust', 'Flutter', 'Go', 'WinUI', 'Web'] },
      { name: 'ButtonGroup', desc: 'Segmented button groups', platforms: ['React', 'Svelte', 'Flutter', 'Web'] },
      { name: 'AvatarGroup', desc: 'Overlapping stacked avatars', platforms: ['React', 'Web'] },
    ],
  },
];

const ALL_COMPS = componentCategories.flatMap(c => c.components);
export { ALL_PLATFORMS, ALL_COMPS };

export default function Components() {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = componentCategories
    .map(cat => ({ ...cat, components: cat.components.filter(c => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.platforms.some(p => p.toLowerCase().includes(q))
      );
    })}))
    .filter(cat => cat.components.length > 0);

  const totalShown = filtered.reduce((n, c) => n + c.components.length, 0);

  return (
    <div className="container" style={{ padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>Components</h1>
        <p style={{ color: 'var(--cn-text-muted)', fontSize: '18px' }}>
          53 production-ready components, shipped natively across{' '}
          {ALL_PLATFORMS.length} platforms — same API everywhere.
        </p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <input
          type="search"
          className="input"
          placeholder="Search components or platforms..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ maxWidth: '480px', margin: '0 auto', display: 'block', padding: '12px 16px' }}
          aria-label="Search components"
        />
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--cn-text-muted)', padding: '48px 0' }}>
          No components match “{query}”. Try a component name or platform.
        </p>
      )}

      {filtered.map((category) => (
        <div key={category.title} style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '22px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--cn-border)',
          }}>
            {category.title}
            <span style={{ color: 'var(--cn-text-dim)', fontSize: '14px', marginLeft: '10px' }}>
              {category.components.length}
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
          }}>
            {category.components.map((comp) => (
              <div key={comp.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--cn-text)' }}>
                  {comp.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cn-text-muted)', flex: 1 }}>
                  {comp.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ALL_PLATFORMS.map(p => {
                    const has = comp.platforms.includes(p as Platform);
                    return (
                      <span
                        key={p}
                        title={has ? `${p}: available` : `${p}: coming soon`}
                        style={{
                          fontSize: '11px',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          border: `1px solid ${has ? 'var(--cn-accent)' : 'var(--cn-border)'}`,
                          color: has ? 'var(--cn-accent-text)' : 'var(--cn-text-dim)',
                          background: has ? 'var(--cn-accent-glow)' : 'transparent',
                          opacity: has ? 1 : 0.5,
                        }}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p style={{ textAlign: 'center', color: 'var(--cn-text-dim)', marginTop: '16px' }}>
        Showing {totalShown} of {ALL_COMPS.length} components
      </p>
    </div>
  );
}