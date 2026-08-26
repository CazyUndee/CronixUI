import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Card,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  Slider,
  FileInput,
  Badge,
  Tag,
  Chip,
  Alert,
  Spinner,
  Skeleton,
  Progress,
  Stat,
  Avatar,
  AvatarGroup,
  Tooltip,
  Modal,
  Dropdown,
  Tabs,
  Accordion,
  Pagination,
  Rating,
  Stepper,
  Timeline,
  Drawer,
  Popover,
  TreeView,
  ColorPicker,
  EmptyState,
  Notification,
  Divider,
  Stack,
  Footer,
  HStack,
  Container,
  Breadcrumb,
  Nav,
  Header,
  FormGroup,
  DatePicker,
  Table,
  List,
  ListItem,
  useToast,
  Toast,
} from '@cronixui/react';

// ----------------------------- helpers -----------------------------

const Section: React.FC<{ id: string; title: string; subtitle?: string; children: React.ReactNode }> = ({ id, title, subtitle, children }) => (
  <section id={id} className="demo-section">
    <div className="demo-section-head">
      <div className="demo-section-index" aria-hidden="true" />
      <h2 className="demo-section-title">{title}</h2>
      {subtitle && <p className="demo-section-sub">{subtitle}</p>}
    </div>
    <div className="demo-stage">{children}</div>
  </section>
);

const Row: React.FC<{ children: React.ReactNode; gap?: number; wrap?: boolean; style?: React.CSSProperties }> = ({ children, gap = 12, wrap = true, style }) => (
  <div style={{ display: 'flex', gap, flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center', ...style }}>
    {children}
  </div>
);

// ----------------------------- Button demo -----------------------------

function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const startLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <>
      <Row>
        <Button variant="primary">Primary</Button>
        <Button>Default</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </Row>
      <Row>
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
        <Button loading={loading} onClick={startLoad}>Click me</Button>
        <Button disabled>Disabled</Button>
      </Row>
    </>
  );
}

// ----------------------------- Input demo -----------------------------

function InputDemo() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <FormGroup label="Full name">
        <Input placeholder="Regular input" />
      </FormGroup>
      <FormGroup label="Email" error={error ? 'Please enter a valid email' : undefined}>
        <Input
          error={error}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(!e.target.value.includes('@') && e.target.value.length > 3);
          }}
          placeholder="Email (type invalid to see error)"
        />
      </FormGroup>
      <Input size="lg" placeholder="Large input" />
      <Input icon={<span>🔍</span>} placeholder="With icon" />
      <Input action={<Button size="sm">Go</Button>} placeholder="With action" />
      <Textarea placeholder="Textarea — multi-line input" rows={4} />
    </div>
  );
}

// ----------------------------- Select demo -----------------------------

function SelectDemo() {
  const [framework, setFramework] = useState('');
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'flutter', label: 'Flutter' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Select options={options} value={framework} onChange={setFramework} placeholder="Pick a framework" />
      <p style={{ color: 'var(--cn-text-muted)', fontSize: '14px' }}>
        Selected: <strong style={{ color: 'var(--cn-text)' }}>{framework || '—'}</strong>
      </p>
    </div>
  );
}

// ----------------------------- Choice demo -----------------------------

function ChoiceDemo() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('option-1');
  const [toggleOn, setToggleOn] = useState(false);
  const [sliderVal, setSliderVal] = useState(40);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Row>
        <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />
        <Checkbox label="Unchecked" />
        <Checkbox checked disabled label="Disabled checked" />
      </Row>
      <RadioGroup name="options" value={radio} onChange={setRadio}>
        <Radio value="option-1">Option 1</Radio>
        <Radio value="option-2">Option 2</Radio>
        <Radio value="option-3">Option 3</Radio>
      </RadioGroup>
      <Row>
        <Toggle on={toggleOn} onChange={setToggleOn} label="Toggle me" />
        <Toggle label="Disabled" disabled />
      </Row>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: 'var(--cn-text-muted)' }}>
          Slider value: <strong style={{ color: 'var(--cn-text)' }}>{sliderVal}</strong>
        </div>
        <Slider min={0} max={100} value={sliderVal} onChange={setSliderVal} />
      </div>
    </div>
  );
}

// ----------------------------- Data display -----------------------------

const tableData = [
  { id: 1, name: 'CronixUI', status: 'Active', users: 1200 },
  { id: 2, name: 'React', status: 'Active', users: 980 },
  { id: 3, name: 'Flutter', status: 'Beta', users: 450 },
  { id: 4, name: 'Rust', status: 'Alpha', users: 210 },
];

function DataDisplayDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row gap={16}>
        <Card style={{ minWidth: 220 }}>
          <Card.Header>Project Card</Card.Header>
          <Card.Body>
            CronixUI is a cross-framework component library with a dark theme and crimson accents.
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="primary">Learn more</Button>
          </Card.Footer>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, flex: 1 }}>
          <Stat value="2,847" label="Total users" delta="12%" deltaType="up" />
          <Stat value="99.9%" label="Uptime" delta="0.1%" deltaType="down" />
        </div>
      </Row>

      <Row gap={8}>
        <Badge>Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="accent" solid>Solid</Badge>
      </Row>

      <Row gap={8}>
        <Tag>Tag one</Tag>
        <Tag onRemove={() => {}}>Removable tag</Tag>
        <Chip variant="accent">Chip</Chip>
        <Chip variant="success" selected>Selected chip</Chip>
        <Chip onRemove={() => {}}>Removable chip</Chip>
      </Row>

      <Table
        sortable
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'status', header: 'Status' },
          { key: 'users', header: 'Users', sortable: true },
        ]}
        data={tableData}
      />

      <div style={{ maxWidth: 360 }}>
        <List>
          <ListItem title="First item" subtitle="Description of the first item" />
          <ListItem title="Second item" subtitle="Description of the second item" />
          <ListItem title="Third item" subtitle="Description of the third item" />
        </List>
      </div>

      <Timeline
        items={[
          { title: 'Project created', description: 'Repository initialized', timestamp: '09:00', variant: 'success' },
          { title: 'Components built', description: '52 components across 11 frameworks', timestamp: '11:30', variant: 'info' },
          { title: 'CI passing', description: 'All 11 workflows green', timestamp: '14:15', variant: 'success' },
        ]}
      />

      <Row>
        <Avatar initials="CN" />
        <Avatar initials="JS" size="lg" />
        <Avatar initials="TS" size="sm" />
        <AvatarGroup max={3}>
          <Avatar initials="AB" />
          <Avatar initials="CD" />
          <Avatar initials="EF" />
          <Avatar initials="GH" />
        </AvatarGroup>
      </Row>

      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Progress value={45} showLabel />
        <Progress value={80} variant="success" showLabel label="Storage used" />
        <Progress value={65} variant="warning" size="sm" />
        <Progress value={30} variant="error" size="lg" />
      </div>
    </div>
  );
}

// ----------------------------- Feedback -----------------------------

function FeedbackDemo() {
  const { toasts, toast, removeToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Row>
        <Alert variant="info" title="Information">This is an info alert with a title.</Alert>
      </Row>
      <Row>
        <Alert variant="success" title="Success">Your changes were saved successfully.</Alert>
      </Row>
      <Row>
        <Alert variant="warning" title="Warning" dismissible>Please review your settings.</Alert>
      </Row>
      <Row>
        <Alert variant="error" title="Error" dismissible>Something went wrong. Try again.</Alert>
      </Row>

      <Row>
        <Button variant="primary" onClick={() => toast.success('Saved successfully!', 'Great job')}>Success toast</Button>
        <Button variant="danger" onClick={() => toast.error('Failed to save', 'Error')}>Error toast</Button>
        <Button onClick={() => toast.warning('Disk space running low', 'Warning')}>Warning toast</Button>
        <Button variant="ghost" onClick={() => toast.info('New version available', 'Info')}>Info toast</Button>
        <Button variant="outline" onClick={() => setNotifOpen(true)}>Notification</Button>
      </Row>

      <Row>
        <Spinner />
        <Spinner size="sm" />
        <Spinner size="lg" />
        <div style={{ width: 200 }}>
          <Skeleton />
          <Skeleton variant="title" style={{ marginTop: 8 }} />
          <Skeleton variant="avatar" style={{ marginTop: 8 }} />
        </div>
      </Row>

      <Row>
        <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Tooltip content="This is a helpful tooltip" position="top">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
        <Popover trigger={<Button variant="outline">Open Popover</Button>}>
          <div style={{ padding: 16 }}>
            <strong>Popover content</strong>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--cn-text-muted)' }}>Any content can go here.</p>
            <Button size="sm" variant="primary" style={{ marginTop: 8 }}>Action</Button>
          </div>
        </Popover>
        <Dropdown
          trigger={<Button variant="outline">Dropdown menu</Button>}
        >
          <Dropdown.Item onClick={() => toast.info('Profile selected')}>👤 Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => toast.info('Settings selected')}>⚙️ Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => toast.error('Signed out (demo)')}>🚪 Sign out</Dropdown.Item>
        </Dropdown>
      </Row>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <Modal.Header onClose={() => setModalOpen(false)}>Example Modal</Modal.Header>
        <Modal.Body>
          <p style={{ color: 'var(--cn-text-muted)' }}>
            This modal is fully accessible — it traps focus, closes on Escape, and restores focus on close.
          </p>
          <div style={{ marginTop: 16 }}>
            <Input placeholder="Type something..." />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      <Notification
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        title="New message"
        message="You have a new notification from the system."
        variant="info"
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ----------------------------- Navigation -----------------------------

function NavigationDemo() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
        <Breadcrumb.Item active>Navigation</Breadcrumb.Item>
      </Breadcrumb>

      <Row gap={24} wrap={false} style={{ alignItems: 'flex-start' }}>
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: 'var(--cn-surface-2)', borderRadius: 10, padding: 4 }}>
            <Nav active={activeNav} onChange={setActiveNav}>
              <Nav.Item id="dashboard">📊 Dashboard</Nav.Item>
              <Nav.Item id="analytics">📈 Analytics</Nav.Item>
              <Nav.Item id="settings">⚙️ Settings</Nav.Item>
            </Nav>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--cn-text-muted)' }}>
            Active: <strong style={{ color: 'var(--cn-text)' }}>{activeNav}</strong>
          </p>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <Tabs defaultIndex={tab} index={tab} onChange={setTab}>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>Activity</Tabs.Tab>
            <Tabs.Tab>Settings</Tabs.Tab>
            <Tabs.Panel>
              <p style={{ color: 'var(--cn-text-muted)', padding: 16 }}>Overview content here.</p>
            </Tabs.Panel>
            <Tabs.Panel>
              <p style={{ color: 'var(--cn-text-muted)', padding: 16 }}>Recent activity will show here.</p>
            </Tabs.Panel>
            <Tabs.Panel>
              <p style={{ color: 'var(--cn-text-muted)', padding: 16 }}>Configuration options live here.</p>
            </Tabs.Panel>
          </Tabs>
        </div>
      </Row>

      <Row>
        <Pagination total={10} current={page} onChange={setPage} />
        <span style={{ fontSize: 13, color: 'var(--cn-text-muted)' }}>Page {page} of 10</span>
      </Row>

      <Row>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      </Row>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
        <div style={{ padding: 24, width: 320 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Drawer Content</h3>
          <p style={{ color: 'var(--cn-text-muted)', fontSize: 14, marginBottom: 24 }}>
            Drawers slide in from the side and are perfect for filters, details, or quick actions.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input placeholder="Filter by name" />
            <Button variant="primary" onClick={() => setDrawerOpen(false)}>Apply</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

// ----------------------------- Interactive -----------------------------

function InteractiveDemo() {
  const [rating, setRating] = useState(4);
  const [step, setStep] = useState(1);
  const [color, setColor] = useState('#6b2323');
  const [selectedNode, setSelectedNode] = useState<string | undefined>('1');

  const treeNodes = [
    { id: '1', label: 'Project', children: [
      { id: '1-1', label: 'src', children: [
        { id: '1-1-1', label: 'components' },
        { id: '1-1-2', label: 'pages' },
      ]},
      { id: '1-2', label: 'public' },
      { id: '1-3', label: 'package.json' },
    ]},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        <div>
          <p style={{ fontSize: 14, color: 'var(--cn-text-muted)', marginBottom: 12 }}>Rating: {rating}/5</p>
          <Rating value={rating} onChange={setRating} />
        </div>

        <div>
          <Stepper
            steps={[
              { label: 'Details', description: 'Basic info' },
              { label: 'Payment', description: 'Billing' },
              { label: 'Done', description: 'Complete' },
            ]}
            currentStep={step}
            onStepClick={setStep}
          />
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button size="sm" variant="ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>Back</Button>
            <Button size="sm" variant="primary" disabled={step === 2} onClick={() => setStep(s => Math.min(2, s + 1))}>Next</Button>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 14, color: 'var(--cn-text-muted)', marginBottom: 12 }}>
            Color: <strong style={{ color: 'var(--cn-text)' }}>{color}</strong>
          </p>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div>
          <Accordion allowMultiple defaultOpen={[0]}>
            <Accordion.Item title="What is CronixUI?">
              A cross-framework component library with native implementations in 11+ languages.
            </Accordion.Item>
            <Accordion.Item title="Which frameworks are supported?">
              React, Vue, Svelte, Solid, Flutter, Go, Rust, Python, WinUI, JavaScript and TypeScript.
            </Accordion.Item>
            <Accordion.Item title="Is it accessible?">
              Yes — components include ARIA roles, keyboard navigation, and focus management.
            </Accordion.Item>
          </Accordion>
        </div>

        <div>
          <TreeView nodes={treeNodes} selectedId={selectedNode} onSelect={setSelectedNode} />
        </div>
      </div>

      <div style={{ maxWidth: 420 }}>
        <EmptyState
          icon={<span style={{ fontSize: 40 }}>🗂️</span>}
          title="No items yet"
          description="Get started by creating your first item — it will appear here."
          action={<Button size="sm" variant="primary">Create item</Button>}
        />
      </div>

      <Divider />

      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DatePicker placeholder="Pick a date" onChange={(d) => console.log('date:', d)} />
        <FileInput
          accept="image/*"
          label="Upload an image"
          onFileSelect={(file) => console.log('file:', file)}
        />
      </div>
    </div>
  );
}

// ----------------------------- Layout demo -----------------------------

function LayoutDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Header
        brand={<strong>CronixUI</strong>}
        nav={
          <Row gap={4}>
            <Button variant="ghost" size="sm">Docs</Button>
            <Button variant="ghost" size="sm">Components</Button>
            <Button variant="ghost" size="sm">Install</Button>
          </Row>
        }
        actions={<Button size="sm" variant="primary">Sign up</Button>}
      />

      <div style={{ display: 'flex', gap: 16, minHeight: 200 }}>
        {/* Simple card-based sidebar mock instead of fixed Sidebar component */}
        <div style={{ width: 200, flexShrink: 0, background: 'var(--cn-surface)', borderRadius: 10, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <strong style={{ fontSize: 14, padding: '4px 8px', borderBottom: '1px solid var(--cn-border)', paddingBottom: 8, marginBottom: 4 }}>Menu</strong>
          {['Overview', 'Reports', 'Billing'].map((label, i) => (
            <div
              key={label}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14,
                color: i === 0 ? 'var(--cn-text)' : 'var(--cn-text-muted)',
                background: i === 0 ? 'var(--cn-surface-2)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {label}
            </div>
          ))}
          <span style={{ marginTop: 'auto', paddingTop: 12, fontSize: 12, color: 'var(--cn-text-dim)' }}>v1.2</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HStack spacing="4">
            <Badge variant="accent">HStack</Badge>
            <span style={{ fontSize: 13, color: 'var(--cn-text-muted)' }}>lays children out horizontally</span>
          </HStack>
          <Stack spacing="2">
            <span style={{ fontSize: 13, color: 'var(--cn-text-muted)' }}>Stack lays children out vertically</span>
            <div style={{ background: 'var(--cn-surface-2)', padding: 12, borderRadius: 8 }}>
              <Container size="sm" style={{ fontSize: 13, color: 'var(--cn-text-muted)' }}>
                Containers constrain width — this one is <code>sm</code>.
              </Container>
            </div>
          </Stack>
        </div>
      </div>

      <Divider />

      <Footer
        copyright={`© ${new Date().getFullYear()} CronixUI`}
        links={[
          { label: 'GitHub', href: 'https://github.com/CazyUndee/CronixUI' },
          { label: 'License', href: '#' },
          { label: 'Docs', href: '/docs' },
        ]}
      />
    </div>
  );
}

// ----------------------------- Page -----------------------------

const sections = [
  { id: 'buttons', label: 'Buttons', index: '01', render: () => <ButtonDemo />, sub: 'Six variants, three sizes, loading and disabled states.' },
  { id: 'inputs', label: 'Inputs', index: '02', render: () => <InputDemo />, sub: 'Labels, validation, icons, actions and textareas.' },
  { id: 'selects', label: 'Selects', index: '03', render: () => <SelectDemo />, sub: 'Controlled, accessible single-select.' },
  { id: 'choices', label: 'Choices', index: '04', render: () => <ChoiceDemo />, sub: 'Checkbox, radio, toggle and slider.' },
  { id: 'data', label: 'Data Display', index: '05', render: () => <DataDisplayDemo />, sub: 'Cards, tables, badges, lists, timelines, avatars and progress.' },
  { id: 'feedback', label: 'Feedback', index: '06', render: () => <FeedbackDemo />, sub: 'Alerts, toasts, modal, popover, dropdown, spinner and skeleton.' },
  { id: 'nav', label: 'Navigation', index: '07', render: () => <NavigationDemo />, sub: 'Tabs, nav, breadcrumb, pagination and drawer.' },
  { id: 'interactive', label: 'Interactive', index: '08', render: () => <InteractiveDemo />, sub: 'Rating, stepper, color picker, accordion, tree and date picker.' },
  { id: 'layout', label: 'Layout', index: '09', render: () => <LayoutDemo />, sub: 'Header, footer, stacks and container.' },
];

export default function Demo() {
  const [active, setActive] = useState('buttons');
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    setActive(id);
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const onScroll = () => {
      let current = sections[0].id;
      for (const s of sections) {
        const el = refs.current[s.id];
        if (el && el.getBoundingClientRect().top < 180) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="demo-page">
      {/* Hero */}
      <header className="demo-hero">
        <p className="demo-eyebrow">cronixui-react — live playground</p>
        <h1 className="demo-title">
          Every component,<br />hands&nbsp;on.
        </h1>
        <p className="demo-lede">
          Scroll the full catalogue. Each card renders the actual <code>@cronixui/react</code>
          component against the official design tokens — not a mockup. Everything below is clickable.
        </p>
        <div className="demo-cta">
          <Button variant="primary" size="lg" onClick={() => scrollTo('buttons')}>Start at buttons</Button>
          <Button size="lg" onClick={() => scrollTo('interactive')}>Jump to interactive</Button>
        </div>
        <div className="demo-meta">
          <span>9 sections</span><span aria-hidden="true">·</span><span>50+ components</span><span aria-hidden="true">·</span><span>all real</span>
        </div>
      </header>

      {/* Sticky section nav */}
      <nav className="demo-nav" aria-label="Component sections">
        {sections.map(s => (
          <button
            key={s.id}
            className={`demo-nav-link${active === s.id ? ' is-active' : ''}`}
            onClick={() => scrollTo(s.id)}
          >
            <span className="demo-nav-index">{s.index}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* All sections on one page */}
      <main className="demo-main">
        {sections.map(s => (
          <div key={s.id} ref={(el) => { refs.current[s.id] = el; }}>
            <Section id={s.id} title={s.label} subtitle={s.sub}>
              {s.render()}
            </Section>
          </div>
        ))}
      </main>
    </div>
  );
}