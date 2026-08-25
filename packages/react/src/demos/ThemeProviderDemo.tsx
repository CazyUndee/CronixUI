import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '../components/ThemeProvider';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Toggle } from '../components/Toggle';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Alert } from '../components/Alert';
import { Tabs } from '../components/Tabs';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { Select } from '../components/Select';

/**
 * Inner component that uses the useTheme hook
 * Must be rendered inside ThemeProvider
 */
const ThemeControls: React.FC = () => {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: 'var(--cn-bg-primary)', color: 'var(--cn-text-primary)' }}>
      {/* Theme Switcher Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '16px', background: 'var(--cn-bg-secondary)', borderRadius: '12px', border: '1px solid var(--cn-border)' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>ThemeProvider Demo</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--cn-text-muted)', fontSize: '14px' }}>
            Current: {resolvedTheme} mode | Setting: {mode}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button onClick={() => setMode('light')} variant={mode === 'light' ? 'primary' : 'outline'}>
            ☀️ Light
          </Button>
          <Button onClick={() => setMode('dark')} variant={mode === 'dark' ? 'primary' : 'outline'}>
            🌙 Dark
          </Button>
          <Button onClick={() => setMode('system')} variant={mode === 'system' ? 'primary' : 'outline'}>
            💻 System
          </Button>
          <div style={{ width: '1px', height: '32px', background: 'var(--cn-border)' }} />
          <Button onClick={toggle} variant="ghost">
            🔄 Toggle
          </Button>
        </div>
      </div>

      {/* Component Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Buttons */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Buttons</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="default">Default</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div style={{ marginTop: '12px' }}>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        {/* Inputs */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Inputs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input placeholder="Text input" />
            <Input placeholder="With value" defaultValue="Hello world" />
            <Input placeholder="Disabled" disabled />
            <Select
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
              ]}
              placeholder="Select option"
            />
          </div>
        </Card>

        {/* Toggles */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Toggles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Toggle label="Toggle ON" on={true} />
            <Toggle label="Toggle OFF" on={false} />
            <Toggle label="Disabled" disabled />
          </div>
        </Card>

        {/* Badges & Avatars */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Badges & Avatars</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Avatar initials="JD" size="sm" />
            <Avatar initials="JS" size="md" />
            <Avatar initials="BW" size="lg" />
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Alert variant="info">This is an info alert</Alert>
            <Alert variant="success">This is a success alert</Alert>
            <Alert variant="warning">This is a warning alert</Alert>
            <Alert variant="error">This is an error alert</Alert>
          </div>
        </Card>

        {/* Tooltips */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Tooltips</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Tooltip content="Top tooltip" position="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button>Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button>Right</Button>
            </Tooltip>
          </div>
        </Card>

        {/* Tabs */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Tabs</h3>
          <Tabs>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>Settings</Tabs.Tab>
            <Tabs.Tab>Analytics</Tabs.Tab>
          </Tabs>
        </Card>

        {/* Modal */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Modal</h3>
          <Button onClick={() => setShowModal(true)}>Open Modal</Button>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Theme Preview">
            <p>This modal respects the current theme ({resolvedTheme}).</p>
            <p>All components inside will automatically adapt to the active theme.</p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </Modal>
        </Card>
      </div>

      {/* CSS Variables Debug */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Theme Variables</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontFamily: 'monospace', fontSize: '12px' }}>
          <div style={{ padding: '8px', background: 'var(--cn-bg-primary)', border: '1px solid var(--cn-border)', borderRadius: '4px' }}>
            <div style={{ color: 'var(--cn-text-muted)' }}>Background</div>
            <div style={{ color: 'var(--cn-text-primary)' }}>var(--cn-bg-primary)</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--cn-bg-secondary)', border: '1px solid var(--cn-border)', borderRadius: '4px' }}>
            <div style={{ color: 'var(--cn-text-muted)' }}>Secondary</div>
            <div style={{ color: 'var(--cn-text-primary)' }}>var(--cn-bg-secondary)</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--cn-bg-tertiary)', border: '1px solid var(--cn-border)', borderRadius: '4px' }}>
            <div style={{ color: 'var(--cn-text-muted)' }}>Tertiary</div>
            <div style={{ color: 'var(--cn-text-primary)' }}>var(--cn-bg-tertiary)</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--cn-accent)', borderRadius: '4px' }}>
            <div style={{ color: 'var(--cn-text-muted)' }}>Accent</div>
            <div style={{ color: 'var(--cn-text-primary)' }}>var(--cn-accent)</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * ThemeProvider Demo
 *
 * Demonstrates live theme switching across all CronixUI components.
 * Switch between Light, Dark, and System modes to see all components
 * adapt in real-time using CSS custom properties.
 */
export const ThemeProviderDemo: React.FC = () => {
  return (
    <ThemeProvider defaultMode="dark">
      <ThemeControls />
    </ThemeProvider>
  );
};

export default ThemeProviderDemo;
