# CronixUI

A multi-platform, multi-language UI toolkit with a dark theme, crimson accents, and Outfit typography.

> If you find this useful, consider starring this repo! ⭐

![npm version](https://img.shields.io/npm/v/cronixui?color=crimson&label=npm)
![npm downloads](https://img.shields.io/npm/dt/cronixui?color=crimson&label=downloads)
![PyPI version](https://img.shields.io/pypi/v/cronixui?color=crimson&label=pypi)
![crates.io version](https://img.shields.io/crates/v/cronixui?color=crimson&label=crates.io)
![License](https://img.shields.io/github/license/CazyUndee/CronixUI?color=crimson)
![Stars](https://img.shields.io/github/stars/CazyUndee/CronixUI?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/CazyUndee/CronixUI?color=crimson)

**12 languages · 52 components · 500+ native implementations.** Write UI once, ship it everywhere — React, Vue, Svelte, Solid, TypeScript, Python, Go, Rust, Flutter, WinUI, Java, and plain web.

Learn more [here](https://deepwiki.com/CazyUndee/CronixUI)

## Component Matrix

| Component | React | Svelte | Solid | Vue | Python | Rust | Flutter | Go | WinUI | Web |
|-----------|:-----:|:------:|:-----:|:---:|:------:|:----:|:-------:|:--:|:-----:|:--:|
| **Form** | | | | | | | | | | |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Textarea | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Radio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Slider | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toggle | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| FileInput | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Rating | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ColorPicker | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| DatePicker | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Display** | | | | | | | | | | |
| Badge | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tag | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chip | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Avatar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Alert | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Spinner | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Skeleton | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Progress | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Stat | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Typography | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Data** | | | | | | | | | | |
| Table | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| List | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tooltip | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TreeView | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Overlay** | | | | | | | | | | |
| Modal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dropdown | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tabs | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Accordion | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Drawer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Popover | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Notification | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Navigation** | | | | | | | | | | |
| Pagination | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CommandPalette | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Nav | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Breadcrumb | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Layout** | | | | | | | | | | |
| Container | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Stack/HStack | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Divider | ✅ | ✅ | ✅ | — | — | — | — | — | — | — |
| Header | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Sidebar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Footer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Advanced** | | | | | | | | | | |
| Stepper | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Timeline | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| EmptyState | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| FileUpload | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ButtonGroup | ✅ | ✅ | — | — | — | — | ✅ | — | — | ✅ |
| FormGroup | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | — | — | — |
| AvatarGroup | ✅ | — | — | — | — | — | — | — | — | ✅ |

**Total: 52 components × 11 languages = 500+ implementations**

### Accessibility Features (React)
- **Tabs**: Arrow key navigation, Home/End, `role=tablist`, `aria-controls`
- **Modal**: Focus trap, Escape key, `aria-modal`, restore focus on close
- **Drawer**: Focus trap, Escape key, `aria-modal`, `aria-label`
- **Popover**: Click-outside, Escape key, `aria-haspopup`, `aria-expanded`
- **Accordion**: `aria-expanded`, `aria-controls`, `aria-labelledby`
- **TreeView**: `role=tree`, `role=treeitem`, `aria-expanded`, `aria-selected`, keyboard nav
- **ColorPicker**: `role=radiogroup`, `role=radio`, `aria-checked`
- **Toggle**: `role=switch`, `aria-checked`, keyboard toggle
- **FileUpload**: `role=button`, keyboard support, `aria-hidden` file input

## Branch Strategy

- `main` is stable/production-ready.
- `develop` is the active development branch for day-to-day work (including agent-driven changes).
- Open pull requests from `develop` to `main`, then manually review and merge.

## Quick Install

### Option 1: Agentic Install
If you are lazy then paste the following into your agent (claude code, opencode, openclaw...):

```
Install CronixUI v1.1.5:  
1. Detect project type (package.json, pubspec.yaml, etc.)  
2. Ask user which platform:  
   - Web (JS/React/Vue/Svelte/Solid): npm install cronixui  
   - Python: pip install cronixui  
   - Go: go get github.com/CazyUndee/CronixUI/packages/go/cronixui  
   - Rust: cargo add cronixui  
   - Flutter: add git dependency to pubspec.yaml  
   - WinUI: dotnet add package CronixUI.WinUI  
   Double check before commiting to it here: https://deepwiki.com/CazyUndee/CronixUI/1.1-getting-started-and-installation.
3. Install and show import example  
4. Create test component to verify  
```

### Option 2: Manual Install

Web Platforms:
All web platforms share the same base install:
```
npm install cronixui
```

**Framework-specific imports:**
- HTML/TypeScript: Use base CSS/JS files
- React: import { Button } from 'cronixui/react'
- Vue: import { CnButton } from 'cronixui/vue'
- Svelte: import { Button } from 'cronixui/svelte'
- Solid: import { Button } from 'cronixui/solid'

**Native Platforms:**
   
Python:
```bash
pip install cronixui
```
Go: 
```bash
go get github.com/CazyUndee/CronixUI/packages/go/cronixui
```
Rust: 
```bash
cargo add cronixui
```
Flutter:   

Add git dependency to pubspec.yaml
```bash
dependencies:  
  cronixui:  
    git:  
      url: https://github.com/CazyUndee/CronixUI.git  
      path: packages/flutter
```
WinUI:   
```
dotnet add package CronixUI.WinUI
```

Ask Devin in the [deepwiki](https://deepwiki.com/CazyUndee/CronixUI/1.1-getting-started-and-installation) if you encounter issues.

## LLMs
If you are an LLM, read the FOR_AGENTS/AGENTS.md file to understand the codebase.

## License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

