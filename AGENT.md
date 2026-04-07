# AGENT.md

## Overview

CronixUI is a multi-platform, multi-language UI toolkit with a dark theme, crimson accents, and Outfit typography. The project supports JavaScript/TypeScript, Python, Go, and Rust with shared design tokens and component APIs.

## Project Structure

```
FlintUI/
├── packages/
│   ├── web/                    # JavaScript/CSS core
│   │   ├── dist/               # Built files
│   │   │   ├── cronixui.js
│   │   │   ├── cronixui.css
│   │   │   ├── cronixui.min.js
│   │   │   └── cronixui.min.css
│   │   ├── src/
│   │   │   ├── cronixui.js     # Main JS
│   │   │   ├── cronixui.css    # Main CSS
│   │   │   ├── cronixui.d.ts   # TypeScript declarations
│   │   │   ├── tokens.ts       # Design tokens (TS)
│   │   │   ├── variables.css   # CSS custom properties
│   │   │   ├── index.js
│   │   │   └── index.mjs
│   │   ├── demo/
│   │   └── scripts/
│   │
│   ├── react/                  # React components
│   │   └── src/
│   │       ├── index.js
│   │       ├── index.d.ts
│   │       └── components/
│   │           ├── Accordion.jsx
│   │           ├── Alert.jsx
│   │           ├── Avatar.jsx
│   │           ├── Badge.jsx
│   │           ├── Breadcrumb.jsx
│   │           ├── Button.jsx
│   │           ├── Card.jsx
│   │           ├── Checkbox.jsx
│   │           ├── CommandPalette.jsx
│   │           ├── Dropdown.jsx
│   │           ├── FileInput.jsx
│   │           ├── Input.jsx
│   │           ├── List.jsx
│   │           ├── Modal.jsx
│   │           ├── Nav.jsx
│   │           ├── Pagination.jsx
│   │           ├── Progress.jsx
│   │           ├── Radio.jsx
│   │           ├── Search.jsx
│   │           ├── Select.jsx
│   │           ├── Skeleton.jsx
│   │           ├── Slider.jsx
│   │           ├── Spinner.jsx
│   │           ├── Stat.jsx
│   │           ├── Table.jsx
│   │           ├── Tabs.jsx
│   │           ├── Tag.jsx
│   │           ├── Textarea.jsx
│   │           ├── Toast.jsx
│   │           ├── Toggle.jsx
│   │           └── Tooltip.jsx
│   │
│   ├── python/                 # Python package
│   │   └── cronixui/
│   │       ├── __init__.py
│   │       ├── pyproject.toml
│   │       ├── tokens.py        # Design tokens
│   │       ├── toast.py
│   │       ├── toggle.py
│   │       ├── modal.py
│   │       ├── dropdown.py
│   │       ├── tabs.py
│   │       ├── accordion.py
│   │       ├── pagination.py
│   │       ├── command_palette.py
│   │       ├── search.py
│   │       ├── nav.py
│   │       └── core.py
│   │
│   ├── go/                     # Go package
│   │   └── cronixui/
│   │       ├── go.mod
│   │       ├── cronixui.go      # Main components
│   │       └── tokens.go        # Design tokens
│   │
│   ├── rust/                   # Rust crate
│   │   └── cronixui/
│   │       ├── Cargo.toml
│   │       └── src/
│   │           ├── lib.rs
│   │           ├── tokens.rs    # Design tokens
│   │           ├── toast.rs
│   │           ├── toggle.rs
│   │           ├── modal.rs
│   │           ├── dropdown.rs
│   │           ├── tabs.rs
│   │           ├── accordion.rs
│   │           ├── pagination.rs
│   │           ├── command_palette.rs
│   │           └── search.rs
│   │
│   └── win/                    # WinUI 3 (C#)
│       ├── CronixUI.WinUI/
│       │   ├── Controls/
│       │   ├── Themes/
│       │   ├── CronixUI.WinUI.csproj
│       │   └── CronixUI.WinUI.sln
│       └── CronixUI.Test/
│
├── package.json                # Root package (npm)
├── README.md
├── LICENSE
├── .gitignore
└── AGENT.md
```

## Design Tokens

All design tokens are defined in CSS custom properties (`packages/web/src/variables.css`) and mirrored in each language.

### Colors

#### Background
| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-bg` | `--cn-bg` | `#0a0a0a` | Primary background |
| `--cn-surface` | `--cn-surface` | `#111111` | Surface level 1 |
| `--cn-surface-2` | `--cn-surface-2` | `#1a1a1a` | Surface level 2 |
| `--cn-surface-3` | `--cn-surface-3` | `#222222` | Surface level 3 |
| `--cn-surface-4` | `--cn-surface-4` | `#2a2a2a` | Surface level 4 |

#### Text
| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-text` | `--cn-text` | `#f0ede8` | Primary text |
| `--cn-text-muted` | `--cn-text-muted` | `rgba(240,23,232,0.5)` | Muted text |
| `--cn-text-dim` | `--cn-text-dim` | `rgba(240,23,232,0.25)` | Dim text |

#### Accent (Crimson)
| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-accent` | `--cn-accent` | `#6b2323` | Primary accent |
| `--cn-accent-hover` | `--cn-accent-hover` | `#7d2a2a` | Accent hover |
| `--cn-accent-light` | `--cn-accent-light` | `#8a3535` | Accent light |
| `--cn-accent-glow` | `--cn-accent-glow` | `rgba(107,35,35,0.3)` | Accent glow |
| `--cn-accent-text` | `--cn-accent-text` | `#c97a7a` | Accent text |

#### Semantic Colors
| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-success` | `--cn-success` | `#1e5028` | Success background |
| `--cn-success-border` | `--cn-success-border` | `rgba(60,140,70,0.4)` | Success border |
| `--cn-success-text` | `--cn-success-text` | `#6bc47a` | Success text |
| `--cn-warning` | `--cn-warning` | `#503c14` | Warning background |
| `--cn-warning-border` | `--cn-warning-border` | `rgba(150,110,30,0.4)` | Warning border |
| `--cn-warning-text` | `--cn-warning-text` | `#c4a43a` | Warning text |
| `--cn-error` | `--cn-error` | `#501414` | Error background |
| `--cn-error-border` | `--cn-error-border` | `rgba(180,60,60,0.4)` | Error border |
| `--cn-error-text` | `--cn-error-text` | `#c46b6b` | Error text |
| `--cn-info` | `--cn-info` | `#143550` | Info background |
| `--cn-info-border` | `--cn-info-border` | `rgba(60,140,200,0.4)` | Info border |
| `--cn-info-text` | `--cn-info-text` | `#6ba8c4` | Info text |

#### Borders
| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-border` | `--cn-border` | `rgba(255,255,255,0.08)` | Default border |
| `--cn-border-hover` | `--cn-border-hover` | `rgba(255,255,255,0.15)` | Hover border |
| `--cn-border-focus` | `--cn-border-focus` | `rgba(255,255,255,0.25)` | Focus border |

### Typography

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-font` | `--cn-font` | `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Primary font |
| `--cn-font-mono` | `--cn-font-mono` | `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` | Monospace font |
| `--cn-text-xs` | `--cn-text-xs` | `11px` | Extra small text |
| `--cn-text-sm` | `--cn-text-sm` | `12px` | Small text |
| `--cn-text-base` | `--cn-text-base` | `13px` | Base text size |
| `--cn-text-md` | `--cn-text-md` | `14px` | Medium text |
| `--cn-text-lg` | `--cn-text-lg` | `16px` | Large text |
| `--cn-text-xl` | `--cn-text-xl` | `20px` | Extra large text |
| `--cn-text-2xl` | `--cn-text-2xl` | `28px` | 2X large text |
| `--cn-text-3xl` | `--cn-text-3xl` | `36px` | 3X large text |

### Spacing

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-space-1` | `--cn-space-1` | `4px` | Spacing unit 1 |
| `--cn-space-2` | `--cn-space-2` | `8px` | Spacing unit 2 |
| `--cn-space-3` | `--cn-space-3` | `12px` | Spacing unit 3 |
| `--cn-space-4` | `--cn-space-4` | `16px` | Spacing unit 4 |
| `--cn-space-5` | `--cn-space-5` | `20px` | Spacing unit 5 |
| `--cn-space-6` | `--cn-space-6` | `24px` | Spacing unit 6 |
| `--cn-space-8` | `--cn-space-8` | `32px` | Spacing unit 8 |
| `--cn-space-10` | `--cn-space-10` | `40px` | Spacing unit 10 |
| `--cn-space-12` | `--cn-space-12` | `48px` | Spacing unit 12 |

### Border Radius

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-radius-sm` | `--cn-radius-sm` | `6px` | Small radius |
| `--cn-radius` | `--cn-radius` | `10px` | Default radius |
| `--cn-radius-lg` | `--cn-radius-lg` | `14px` | Large radius |
| `--cn-radius-xl` | `--cn-radius-xl` | `20px` | Extra large radius |
| `--cn-radius-full` | `--cn-radius-full` | `9999px` | Full/pill radius |

### Shadows

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-shadow-sm` | `--cn-shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Small shadow |
| `--cn-shadow` | `--cn-shadow` | `0 4px 12px rgba(0,0,0,0.4)` | Default shadow |
| `--cn-shadow-lg` | `--cn-shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Large shadow |
| `--cn-shadow-glow` | `--cn-shadow-glow` | `0 0 20px rgba(107,35,35,0.3)` | Accent glow |

### Transitions

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-transition-fast` | `--cn-transition-fast` | `0.1s ease` | Fast transition |
| `--cn-transition` | `--cn-transition` | `0.15s ease` | Default transition |
| `--cn-transition-slow` | `--cn-transition-slow` | `0.25s ease` | Slow transition |

### Z-Index

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-z-dropdown` | `--cn-z-dropdown` | `100` | Dropdown layer |
| `--cn-z-sticky` | `--cn-z-sticky` | `200` | Sticky elements |
| `--cn-z-fixed` | `--cn-z-fixed` | `300` | Fixed elements |
| `--cn-z-modal-backdrop` | `--cn-z-modal-backdrop` | `400` | Modal backdrop |
| `--cn-z-modal` | `--cn-z-modal` | `500` | Modal layer |
| `--cn-z-popover` | `--cn-z-popover` | `600` | Popover layer |
| `--cn-z-tooltip` | `--cn-z-tooltip` | `700` | Tooltip layer |
| `--cn-z-toast` | `--cn-z-toast` | `800` | Toast layer |

### Layout

| Token | CSS Variable | Value | Description |
|-------|--------------|-------|-------------|
| `--cn-container-max` | `--cn-container-max` | `1200px` | Max container width |
| `--cn-sidebar-width` | `--cn-sidebar-width` | `260px` | Sidebar width |

## Components

### Web/React Components

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible content sections |
| `Alert` | Alert/notification messages |
| `Avatar` | User avatar with initials or image |
| `Badge` | Status badges and labels |
| `Breadcrumb` | Navigation breadcrumb trail |
| `Button` | Primary interactive element |
| `Card` | Content container with header/body |
| `Checkbox` | Checkbox input |
| `CommandPalette` | Keyboard-driven command interface |
| `Dropdown` | Dropdown menu |
| `FileInput` | File upload with drag-and-drop |
| `Input` | Text input field |
| `List` | Vertical list with items |
| `Modal` | Modal dialog |
| `Nav` | Navigation component |
| `Pagination` | Page navigation |
| `Progress` | Progress bar |
| `Radio` | Radio button input |
| `Search` | Search with autocomplete |
| `Select` | Select dropdown |
| `Skeleton` | Loading placeholder |
| `Slider` | Range slider input |
| `Spinner` | Loading spinner |
| `Stat` | Statistical display |
| `Table` | Data table |
| `Tabs` | Tabbed interface |
| `Tag` | Removable tag/chip |
| `Textarea` | Multi-line text input |
| `Toast` | Toast notifications |
| `Toggle` | Toggle switch |
| `Tooltip` | Hover tooltip |

### Component APIs

Each language implements the same component interfaces:

#### Toast
```
show(options) / success(message) / error(message) / warning(message) / info(message)
```

#### Toggle
```
toggle() / isOn() / setOn(value)
```

#### Modal
```
open() / close() / isOpen()
```

#### Dropdown
```
open() / close() / toggle() / isOpen()
```

#### Tabs
```
setActive(index) / activeIndex()
```

#### Accordion
```
toggle(index) / open(index) / close(index) / openAll(total) / closeAll() / isOpen(index)
```

#### Pagination
```
goTo(page) / next() / prev() / current() / total()
```

#### CommandPalette
```
open() / close() / toggle() / setItems(items) / execute(index)
```

#### Search
```
setItems(items) / filter(query) / select(index)
```

## Versioning

This project follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes to API
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

### Version History
- `1.0.6` - Added design tokens to all languages
- `1.0.5` - Full Python, Go, Rust support with all components
- `1.0.4` - Added subpath exports (`cronixui/react`)
- `1.0.3` - Multi-language support added
- `1.0.2` - Updated CDN paths
- `1.0.1` - Unified package structure
- `1.0.0` - Initial release

## Publishing Protocol

### Before Publishing

**ALWAYS** verify the following before publishing to any registry:

1. **Version Check**: Ensure version is bumped appropriately
2. **Build Verification**: Run build scripts and verify output
3. **Tests**: Run any available tests
4. **Documentation**: Update README.md and AGENT.md if needed
5. **User Confirmation**: **ASK USER BEFORE PUBLISHING**

### Publishing Commands

```bash
# npm (JavaScript/TypeScript)
npm publish --access public

# PyPI (Python) - when ready
pip install build
python -m build
twine upload dist/*

# crates.io (Rust) - when ready
cargo publish

# Go proxy - automatic on git push
git tag v1.0.X
git push --tags
```

### Pre-publish Checklist

- [ ] Version bumped in all package files
- [ ] All tokens are consistent across languages
- [ ] All components are implemented in all languages
- [ ] Documentation is updated
- [ ] User has confirmed readiness to publish

## NPM Authentication

The npm token should be stored securely. To configure:

```bash
npm config set //registry.npmjs.org/:_authToken <TOKEN>
```

**Never commit the token to the repository.**

## Git Commit Guidelines

### Before Committing

1. **Review Changes**: Ensure all changes are intentional
2. **Update Documentation**: Update AGENT.md if structure/tokens changed
3. **Test Locally**: Verify the package works locally
4. **Ask User**: **ALWAYS ASK USER BEFORE COMMITTING**

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(tokens): add design tokens to all languages`
- `fix(react): correct Toggle component state handling`
- `docs(agent): update component documentation`

## Important Rules

1. **ASK BEFORE COMMITTING** - Never commit to GitHub without user approval
2. **ASK BEFORE PUBLISHING** - Never publish to npm/PyPI/crates.io without user approval
3. **Keep tokens synchronized** - All languages must have identical token values
4. **Update AGENT.md** - When adding new tokens or components, update this file
5. **Semantic versioning** - Follow semver for all version bumps
