# CronixUI Python Package

A dark-themed UI toolkit with crimson accents and Outfit typography, implemented in pure Python.

## Installation

```bash
pip install cronixui
```

For development:

```bash
pip install cronixui[dev]
```

## Quick Start

```python
from cronixui import Button, Card, Toast, Badge
from cronixui.tokens import BG, ACCENT, TEXT

# Create a button
btn = Button("Click me", variant="primary")
print(btn.render_html())
# <button class="cn-btn cn-btn-primary">Click me</button>

# Create a card
card = Card(title="My Card", body="Card content")
print(card.render_html())
# <div class="cn-card">...</div>

# Show a toast
toast = Toast.success("Operation completed!")
print(toast.message)  # Operation completed!

# Use a badge
badge = Badge("New", variant="success")
print(badge.render_html())
# <span class="cn-badge cn-badge-success">New</span>
```

## Components

All components generate HTML strings and don't require a browser to run:

- **Button** - Buttons with variants (primary, ghost, outline, danger, success)
- **ButtonGroup** - Group multiple buttons together
- **Card** - Card containers with header, body, footer
- **Badge** - Status badges with semantic colors
- **Tag** - Removable tags with close buttons
- **Avatar** - User avatars with initials
- **AvatarGroup** - Grouped avatar display
- **Toast** - Toast notification data
- **Alert** - Alert messages with variants
- **Progress** - Progress bars
- **Stat** - Statistics display
- **Table** - Data tables
- **List** - Lists with icons and actions
- **Form** - Form inputs (Input, Textarea, Select, Checkbox, Radio, etc.)
- **Layout** - Layout components (Header, Sidebar, Footer, Container)
- **Tooltip** - Tooltip wrappers
- **Loading** - Spinners and skeletons
- **Tabs** - Tab navigation
- **Accordion** - Collapsible sections
- **Modal** - Modal dialogs
- **Dropdown** - Dropdown menus
- **Nav** - Navigation bars
- **Pagination** - Pagination controls
- **CommandPalette** - Command palette data
- **Search** - Search component data

## Design Tokens

Access design tokens for consistent theming:

```python
from cronixui.tokens import (
    Color, BG, SURFACE, ACCENT, TEXT,
    typography, spacing, radius, shadow
)

# Colors
print(BG.hex)  # #0a0a0a
print(ACCENT.rgb)  # (107, 35, 35)

# Typography
print(typography.font_family)  # 'Outfit', ...
print(typography.lg)  # 16

# Spacing
print(spacing.space_4)  # 16

# Border radius
print(radius.default)  # 10

# Shadows
print(shadow.lg)  # 0 8px 24px rgba(0, 0, 0, 0.5)
```

## Development

### Running tests

```bash
pytest
```

With coverage:

```bash
pytest --cov=cronixui --cov-report=html
```

### Code formatting

```bash
black .
ruff check .
```

### Type checking

```bash
mypy cronixui
```

### Building the package

```bash
python -m build
```

### Publishing to PyPI

```bash
python -m twine upload dist/*
```

## License

GPL 3.0, see LICENSE for details.
