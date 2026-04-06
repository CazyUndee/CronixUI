# FlintUI

A dark-mode UI toolkit with crimson accents and Outfit typography. Built for modern web applications.

## Installation

### NPM
```bash
npm install flintui
```

### CDN
```html
<link rel="stylesheet" href="https://unpkg.com/flintui/dist/flintui.css">
<script src="https://unpkg.com/flintui/dist/flintui.js"></script>
```

### Manual
Include the files directly:
```html
<link rel="stylesheet" href="path/to/flintui.css">
<script src="path/to/flintui.js"></script>
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="https://unpkg.com/flintui/dist/flintui.css">
</head>
<body>
  <div class="fl-container">
    <h1 class="fl-h1">Hello, FlintUI!</h1>
    <button class="fl-btn fl-btn-primary">Get Started</button>
  </div>
  <script src="https://unpkg.com/flintui/dist/flintui.js"></script>
</body>
</html>
```

## Design Tokens

FlintUI uses CSS custom properties for consistent theming:

| Token | Value | Description |
|-------|-------|-------------|
| `--fl-bg` | `#0a0a0a` | Background |
| `--fl-surface` | `#111111` | Surface |
| `--fl-accent` | `#6b2323` | Crimson accent |
| `--fl-text` | `#f0ede8` | Primary text |
| `--fl-border` | `rgba(255,255,255,0.08)` | Border color |

## Components

### Typography

```html
<h1 class="fl-h1">Heading 1</h1>
<h2 class="fl-h2">Heading 2</h2>
<h3 class="fl-h3">Heading 3</h3>
<p class="fl-text-muted">Muted text</p>
<p class="fl-text-dim">Dim text</p>
<code class="fl-text-mono">code</code>
```

### Buttons

```html
<button class="fl-btn fl-btn-primary">Primary</button>
<button class="fl-btn">Default</button>
<button class="fl-btn fl-btn-ghost">Ghost</button>
<button class="fl-btn fl-btn-outline">Outline</button>
<button class="fl-btn fl-btn-success">Success</button>
<button class="fl-btn fl-btn-danger">Danger</button>

<!-- Sizes -->
<button class="fl-btn fl-btn-sm">Small</button>
<button class="fl-btn fl-btn-lg">Large</button>

<!-- Button Group -->
<div class="fl-btn-group">
  <button class="fl-btn">Left</button>
  <button class="fl-btn">Center</button>
  <button class="fl-btn">Right</button>
</div>
```

### Inputs

```html
<!-- Basic input -->
<input class="fl-input" placeholder="Enter text...">

<!-- With label -->
<div class="fl-form-group">
  <label class="fl-form-label">Email</label>
  <input class="fl-input" type="email" placeholder="you@example.com">
</div>

<!-- With error -->
<div class="fl-form-group">
  <label class="fl-form-label">Password</label>
  <input class="fl-input fl-input-error" type="password">
  <span class="fl-form-error">Password is required</span>
</div>

<!-- Sizes -->
<input class="fl-input fl-input-sm" placeholder="Small">
<input class="fl-input fl-input-lg" placeholder="Large">

<!-- Select -->
<div class="fl-select-wrapper">
  <select class="fl-select">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<!-- Textarea -->
<textarea class="fl-input fl-textarea" placeholder="Long text..."></textarea>
```

### Checkbox & Radio

```html
<label class="fl-checkbox">
  <input type="checkbox" checked>
  <span class="fl-checkbox-box"></span>
  <span class="fl-checkbox-label">Checked</span>
</label>

<label class="fl-radio">
  <input type="radio" name="group" checked>
  <span class="fl-radio-box"></span>
  <span class="fl-radio-label">Option A</span>
</label>
```

### Toggle

```html
<div class="fl-toggle on"></div>
<span class="fl-toggle-label">Enabled</span>
```

```javascript
// Toggle state
document.querySelector('.fl-toggle').classList.toggle('on');
```

### Slider

```html
<input type="range" class="fl-slider" min="0" max="100" value="50">
```

### Badges

```html
<span class="fl-badge fl-badge-default">Default</span>
<span class="fl-badge fl-badge-accent">Accent</span>
<span class="fl-badge fl-badge-success">Success</span>
<span class="fl-badge fl-badge-warning">Warning</span>
<span class="fl-badge fl-badge-error">Error</span>
<span class="fl-badge fl-badge-info">Info</span>

<!-- Solid variants -->
<span class="fl-badge fl-badge-solid fl-badge-accent">Solid</span>
```

### Tags

```html
<span class="fl-tag">
  Tag Name
  <span class="fl-tag-remove">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </span>
</span>
```

### Stats

```html
<div class="fl-stat">
  <div class="fl-stat-value">2,847</div>
  <div class="fl-stat-label">Total runs</div>
  <div class="fl-stat-delta fl-stat-delta-up">+12%</div>
</div>
```

### Progress

```html
<div class="fl-progress-label"><span>Loading</span><span>68%</span></div>
<div class="fl-progress">
  <div class="fl-progress-bar" style="width: 68%;"></div>
</div>

<!-- Variants -->
<div class="fl-progress fl-progress-success">...</div>
<div class="fl-progress fl-progress-warning">...</div>
<div class="fl-progress fl-progress-error">...</div>
<div class="fl-progress fl-progress-lg">...</div>
```

### Cards

```html
<div class="fl-card">
  <h3 class="fl-card-title">Card Title</h3>
  <p class="fl-card-body">Card content.</p>
</div>

<!-- Clickable -->
<div class="fl-card fl-card-clickable">...</div>

<!-- With header/footer -->
<div class="fl-card">
  <div class="fl-card-header">
    <span class="fl-card-title">Title</span>
    <button class="fl-btn fl-btn-sm">Action</button>
  </div>
  <p class="fl-card-body">Content</p>
  <div class="fl-card-footer">Footer</div>
</div>
```

### Navigation

```html
<div class="fl-nav">
  <button class="fl-nav-item fl-nav-active">Home</button>
  <button class="fl-nav-item">Projects</button>
  <button class="fl-nav-item">Settings</button>
</div>
```

```javascript
FlintUI.Nav.init();
```

### Tabs

```html
<div class="fl-tabs">
  <div class="fl-tabs-list">
    <button class="fl-tab fl-tab-active">Tab 1</button>
    <button class="fl-tab">Tab 2</button>
    <button class="fl-tab">Tab 3</button>
  </div>
</div>
<div class="fl-tab-content">
  <div class="fl-tab-panel fl-tab-panel-active">Content 1</div>
  <div class="fl-tab-panel">Content 2</div>
  <div class="fl-tab-panel">Content 3</div>
</div>
```

### Breadcrumb

```html
<div class="fl-breadcrumb">
  <a href="#" class="fl-breadcrumb-item">Home</a>
  <span class="fl-breadcrumb-separator">/</span>
  <a href="#" class="fl-breadcrumb-item">Projects</a>
  <span class="fl-breadcrumb-separator">/</span>
  <span class="fl-breadcrumb-current">Current</span>
</div>
```

### Alerts

```html
<div class="fl-alert fl-alert-info">
  <div class="fl-alert-icon">...</div>
  <div class="fl-alert-content">
    <div class="fl-alert-title">Title</div>
    <div class="fl-alert-message">Message</div>
  </div>
  <button class="fl-alert-close">×</button>
</div>
```

Variants: `fl-alert-info`, `fl-alert-success`, `fl-alert-warning`, `fl-alert-error`

### Toast

```javascript
// Show toast
FlintUI.Toast.success('Operation completed!');
FlintUI.Toast.error('Something went wrong');
FlintUI.Toast.warning('Please review');
FlintUI.Toast.info('New updates');

// With title
FlintUI.Toast.show({
  title: 'Success',
  message: 'Your changes have been saved.',
  type: 'success',
  duration: 5000
});
```

### Modal

```html
<div class="fl-modal-backdrop" id="myModal">
  <div class="fl-modal">
    <div class="fl-modal-header">
      <h3 class="fl-modal-title">Modal Title</h3>
      <button class="fl-modal-close">×</button>
    </div>
    <div class="fl-modal-body">Content</div>
    <div class="fl-modal-footer">
      <button class="fl-btn fl-btn-ghost">Cancel</button>
      <button class="fl-btn fl-btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

```javascript
const modal = document.getElementById('myModal');
modal._flModal.open();
modal._flModal.close();
```

### Dropdown

```html
<div class="fl-dropdown">
  <button class="fl-btn fl-dropdown-trigger">
    Menu <svg>...</svg>
  </button>
  <div class="fl-dropdown-menu">
    <div class="fl-dropdown-item">Profile</div>
    <div class="fl-dropdown-item">Settings</div>
    <div class="fl-dropdown-divider"></div>
    <div class="fl-dropdown-item">Logout</div>
  </div>
</div>
```

### Tooltip

```html
<div class="fl-tooltip">
  <button class="fl-btn">Hover me</button>
  <div class="fl-tooltip-content">Tooltip text</div>
</div>
```

### Table

```html
<div class="fl-table-wrapper fl-table-sortable">
  <table class="fl-table">
    <thead>
      <tr>
        <th data-sort="name">Name</th>
        <th data-sort="value">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Item 1</td>
        <td>100</td>
      </tr>
    </tbody>
  </table>
</div>
```

### List

```html
<div class="fl-list">
  <div class="fl-list-item fl-list-item-clickable">
    <div class="fl-list-item-content">
      <div class="fl-list-item-title">Title</div>
      <div class="fl-list-item-subtitle">Subtitle</div>
    </div>
  </div>
</div>
```

### Accordion

```html
<div class="fl-accordion">
  <div class="fl-accordion-item fl-accordion-open">
    <div class="fl-accordion-header">
      <span class="fl-accordion-title">Section 1</span>
      <svg class="fl-accordion-icon">...</svg>
    </div>
    <div class="fl-accordion-content">Content</div>
  </div>
</div>
```

### Avatar

```html
<div class="fl-avatar">JD</div>
<div class="fl-avatar fl-avatar-sm">AB</div>
<div class="fl-avatar fl-avatar-lg">XY</div>
<div class="fl-avatar fl-avatar-xl">ZZ</div>

<!-- Group -->
<div class="fl-avatar-group">
  <div class="fl-avatar">A</div>
  <div class="fl-avatar">B</div>
  <div class="fl-avatar">+5</div>
</div>
```

### Pagination

```html
<div class="fl-pagination" id="pagination"></div>
```

```javascript
new FlintUI.Pagination(document.getElementById('pagination'), {
  total: 10,
  current: 1,
  onChange: (page) => console.log('Page:', page)
});
```

### File Input

```html
<div class="fl-file-input">
  <input type="file">
  <div class="fl-file-input-label">
    <svg class="fl-file-input-icon">...</svg>
    <div class="fl-file-input-text">
      <span>Click to upload</span> or drag and drop
    </div>
  </div>
</div>
```

### Search

```html
<div class="fl-search">
  <svg class="fl-search-icon">...</svg>
  <input class="fl-input fl-search-input" placeholder="Search...">
  <div class="fl-search-results"></div>
</div>
```

```javascript
const search = document.querySelector('.fl-search');
search._flSearch.setItems([
  { title: 'Result 1', subtitle: 'Description', action: () => {} },
  { title: 'Result 2', action: () => {} }
]);
```

### Command Palette

```html
<div class="fl-command-palette" id="cmd">
  <div class="fl-command-palette-inner">
    <input class="fl-command-palette-input" placeholder="Type a command...">
    <div class="fl-command-palette-results"></div>
  </div>
</div>
```

```javascript
const cmd = document.getElementById('cmd');
new FlintUI.CommandPalette(cmd);
cmd._flCommandPalette.setItems([
  { title: 'New File', kbd: 'Ctrl+N', action: () => {} },
  { title: 'Save', kbd: 'Ctrl+S', action: () => {} }
]);

// Open
cmd._flCommandPalette.open();
```

### Loading States

```html
<!-- Spinner -->
<div class="fl-spinner"></div>
<div class="fl-spinner fl-spinner-sm"></div>
<div class="fl-spinner fl-spinner-lg"></div>

<!-- Skeleton -->
<div class="fl-skeleton fl-skeleton-title"></div>
<div class="fl-skeleton fl-skeleton-text"></div>
<div class="fl-skeleton fl-skeleton-avatar"></div>
```

### Layout

```html
<!-- Container -->
<div class="fl-container">...</div>
<div class="fl-container-sm">...</div>
<div class="fl-container-lg">...</div>

<!-- Flex -->
<div class="fl-flex fl-items-center fl-gap-4">...</div>

<!-- Grid -->
<div class="fl-grid fl-grid-3">...</div>

<!-- Stack -->
<div class="fl-stack">...</div>
<div class="fl-hstack">...</div>

<!-- Sections -->
<div class="fl-section">...</div>
<div class="fl-divider"></div>
```

## JavaScript API

### Global Object

```javascript
// Initialize all components
FlintUI.init();

// Utilities
FlintUI.$(selector);
FlintUI.$$(selector);
FlintUI.createEl(tag, className, attrs);
```

### Classes

| Class | Methods |
|-------|---------|
| `FlintUI.Toggle` | `toggle()`, `isOn()`, `setOn(bool)` |
| `FlintUI.Modal` | `open()`, `close()` |
| `FlintUI.Dropdown` | `open()`, `close()`, `toggle()` |
| `FlintUI.Toast` | `show(opts)`, `success()`, `error()`, `warning()`, `info()` |
| `FlintUI.Tabs` | `setActive(index)` |
| `FlintUI.Accordion` | `toggle(item)`, `openAll()`, `closeAll()` |
| `FlintUI.Pagination` | `goTo(page)`, `render()` |
| `FlintUI.CommandPalette` | `open()`, `close()`, `setItems([])` |
| `FlintUI.Search` | `setItems([])`, `filter()`, `open()`, `close()` |

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

GPL 3.0, see LICENSE for details.
