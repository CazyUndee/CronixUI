const componentCategories = [
  {
    title: 'Form Elements',
    components: [
      { name: 'Button', desc: 'Primary, secondary, ghost, outline variants' },
      { name: 'Input', desc: 'Text inputs with labels, errors, and validation' },
      { name: 'Select', desc: 'Dropdown selection with custom styling' },
      { name: 'Checkbox', desc: 'Custom checkbox with label support' },
      { name: 'Radio', desc: 'Radio button groups' },
      { name: 'Toggle', desc: 'Switch toggle for boolean states' },
      { name: 'Slider', desc: 'Range input with custom styling' },
      { name: 'Textarea', desc: 'Multi-line text input' },
      { name: 'File Input', desc: 'Drag and drop file upload' },
    ],
  },
  {
    title: 'Layout',
    components: [
      { name: 'Container', desc: 'Responsive container with max-width' },
      { name: 'Stack', desc: 'Vertical and horizontal stacking' },
      { name: 'Grid', desc: 'Flexible grid layout system' },
      { name: 'Divider', desc: 'Visual separator' },
    ],
  },
  {
    title: 'Data Display',
    components: [
      { name: 'Card', desc: 'Content container with header/footer' },
      { name: 'Table', desc: 'Sortable data tables' },
      { name: 'List', desc: 'List items with avatars and actions' },
      { name: 'Avatar', desc: 'User avatars with fallback initials' },
      { name: 'Badge', desc: 'Status and count badges' },
      { name: 'Tag', desc: 'Removable tags' },
      { name: 'Stat', desc: 'Statistical values with delta indicators' },
      { name: 'Progress', desc: 'Progress bars with percentage' },
      { name: 'Skeleton', desc: 'Loading placeholder states' },
    ],
  },
  {
    title: 'Navigation',
    components: [
      { name: 'Navigation', desc: 'Tab-style navigation' },
      { name: 'Tabs', desc: 'Tabbed content panels' },
      { name: 'Breadcrumb', desc: 'Hierarchical navigation trail' },
      { name: 'Pagination', desc: 'Page navigation controls' },
      { name: 'Sidebar', desc: 'Collapsible sidebar navigation' },
    ],
  },
  {
    title: 'Feedback',
    components: [
      { name: 'Alert', desc: 'Informational alerts with icons' },
      { name: 'Toast', desc: 'Notification toasts' },
      { name: 'Modal', desc: 'Dialog and confirmation modals' },
      { name: 'Tooltip', desc: 'Contextual tooltips' },
    ],
  },
  {
    title: 'Overlay',
    components: [
      { name: 'Dropdown', desc: 'Menu dropdowns' },
      { name: 'Command Palette', desc: 'Keyboard-driven command interface' },
      { name: 'Search', desc: 'Search input with results dropdown' },
    ],
  },
  {
    title: 'Utilities',
    components: [
      { name: 'Accordion', desc: 'Collapsible content sections' },
      { name: 'Spinner', desc: 'Loading spinners' },
      { name: 'Header', desc: 'Page header with actions' },
      { name: 'Footer', desc: 'Page footer' },
    ],
  },
];

export default function Components() {
  return (
    <div className="container" style={{ padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>Components</h1>
        <p style={{ color: 'var(--cn-text-muted)', fontSize: '18px' }}>
          40+ production-ready components built with the same design language
        </p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <input 
          type="text" 
          className="input" 
          placeholder="Search components..." 
          style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
        />
      </div>

      {componentCategories.map((category) => (
        <div key={category.title} style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '24px', 
            paddingBottom: '12px',
            borderBottom: '1px solid var(--cn-border)',
          }}>
            {category.title}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {category.components.map((comp) => (
              <div key={comp.name} className="card" style={{ cursor: 'pointer' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--cn-text)' }}>
                  {comp.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cn-text-muted)' }}>
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}