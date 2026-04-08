# CronixUI Design System Specification

## Overview
CronixUI is a multi-language, multi-platform UI toolkit with 35 components across 10 platforms.

## Design Tokens

### Colors
```
Background:     #0a0a0a (primary) / #111111 (surface) / #1a1a1a (surface-2) / #222222 (surface-3)
Text:           #f0ede8 (primary) / #a0a0a0 (muted) / #666666 (dim)
Accent:         #6b2323 (crimson) / #8b3333 (hover) / rgba(107, 35, 35, 0.15) (glow)
Success:        #1e5028 / #2a6b32 (hover)
Warning:        #805014 / #b87820 (hover)  
Error:          #801414 / #b82020 (hover)
Info:           #143c64 / #2050b8 (hover)
```

### Typography
```
Font:           Outfit (300, 400, 500, 600, 700)
Font Mono:      JetBrains Mono (400, 500)
Sizes:          xs(0.75rem), sm(0.875rem), base(1rem), md(1.125rem), lg(1.25rem), xl(1.5rem), 2xl(2rem), 3xl(2.5rem)
```

### Spacing
```
Scale:          1(0.25rem), 2(0.5rem), 3(0.75rem), 4(1rem), 5(1.25rem), 6(1.5rem), 8(2rem), 10(2.5rem), 12(3rem)
Radius:         sm(4px), md(6px), lg(8px), full(9999px)
```

### Shadows
```
Shadow:         0 2px 8px rgba(0,0,0,0.3)
Shadow LG:      0 8px 24px rgba(0,0,0,0.4)
```

## Components (35)

### Form Components
| Component | Props | Variants |
|-----------|-------|----------|
| Button | variant, size, disabled, icon | primary, ghost, outline, danger, success |
| Input | value, placeholder, size, error, disabled | sm, md, lg |
| Textarea | value, placeholder, rows, error | - |
| Checkbox | checked, disabled, label | - |
| Radio | name, options, selected, disabled | - |
| Select | options, value, placeholder, disabled | - |
| Slider | min, max, value, step, disabled | - |
| Toggle | on, disabled, label | - |
| FileInput | accept, multiple, disabled | - |
| Tag | label, onRemove | - |

### Display Components
| Component | Props | Variants |
|-----------|-------|----------|
| Badge | variant, solid | default, accent, success, warning, error, info |
| Card | clickable | header, body, footer |
| Avatar | src, initials, size | sm, md, lg, xl |
| Alert | type, title, message, dismissible | info, success, warning, error |
| Spinner | size | sm, md, lg |
| Skeleton | variant | text, title, avatar, rectangular |
| Progress | value, max, variant, size | default, success, warning, error |
| Stat | value, label, delta | - |

### Data Components
| Component | Props | Variants |
|-----------|-------|----------|
| Table | columns, data, sortable | - |
| List | items, clickable | icon, title, subtitle, actions |
| Tooltip | content, position | top, bottom, left, right |

### Overlay Components
| Component | Props | Variants |
|-----------|-------|----------|
| Modal | open, size, onClose | sm, md, lg, xl, full |
| Dropdown | items, open | icon, divider |
| Tabs | tabs, activeIndex | - |
| Accordion | items, allowMultiple | - |
| Toast | type, message, duration | info, success, warning, error |

### Navigation Components
| Component | Props | Variants |
|-----------|-------|----------|
| Pagination | total, current, onChange | - |
| Search | value, results, placeholder | - |
| CommandPalette | commands, open, shortcut | - |
| Nav | items, active | - |
| Breadcrumb | items | - |

### Layout Components
| Component | Props | Variants |
|-----------|-------|----------|
| Container | size | sm, md, lg, xl, fluid |
| Header | brand, nav, actions | - |
| Sidebar | items, active | - |
| Footer | links, copyright | - |

## CSS Class Reference

All components use `cn-` prefix:
```css
.cn-btn, .cn-btn-primary, .cn-btn-ghost, .cn-btn-sm, .cn-btn-lg
.cn-card, .cn-card-header, .cn-card-body, .cn-card-footer
.cn-input, .cn-input-sm, .cn-input-lg, .cn-input-error
.cn-badge, .cn-badge-accent, .cn-badge-success
/* ... etc */
```

## Platform Mapping

| Platform | Package | Import |
|----------|---------|--------|
| React | `cronixui/react` | `import { Button } from 'cronixui/react'` |
| Vue | `cronixui/vue` | `import { CnButton } from 'cronixui/vue'` |
| Svelte | `cronixui/svelte` | `import { Button } from 'cronixui/svelte'` |
| Solid | `cronixui/solid` | `import { Button } from 'cronixui/solid'` |
| Flutter | `cronixui` | `import 'package:cronixui/cronixui.dart';` |
| Python | `cronixui` | `from cronixui import Button` |
| Go | `cronixui` | `import "github.com/cronixui/go"` |
| Rust | `cronixui` | `use cronixui::*;` |
