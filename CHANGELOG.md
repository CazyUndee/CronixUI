# Changelog

All notable changes to CronixUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.5] - 2026-08-26

### Added
- Java (Swing): New CronixUI package with 12 native components (Button, TextField, Card, Badge, Toggle, Alert, Progress, Spinner, Tabs, Modal, Toast, theme system) — 50+ component slots
- React, Svelte, Solid, Vue, TypeScript, Rust, Python, Flutter: 7 new AI components (MarkdownRenderer, ConversationHistory, RAGReference, CopyButton, FeedbackButtons, StreamingText, AIStatus)
- WinUI: 8 new controls (AvatarGroup, ButtonGroup, Divider, HStack, FormGroup, MarkdownRenderer, ModelSelector, CopyButton)
- React: Interactive demo page showing all 50+ components with live examples
- React: TypeScript type tests for AI components
- Svelte: 7 missing AI components for parity with React/Solid/Vue
- Solid: 3 missing AI components (MarkdownRenderer, ConversationHistory, RAGReference)
- Vue: 3 missing AI components (MarkdownRenderer, ConversationHistory, RAGReference)
- Go: 25+ new components (Alert, Avatar, Badge, Breadcrumb, Chip, ColorPicker, DatePicker, Divider, Drawer, EmptyState, FileInput, FileUpload, FormGroup, HStack, Header, Footer, Navigation, Popover, Skeleton, Spinner, Stepper, Tag, Timeline, Tooltip, TreeView, Typography)
- Python: Exported 17 missing modules and 37 comprehensive tests
- React: Accessibility improvements (Tabs arrow keys, Modal focus trap, ARIA on TreeView, ColorPicker, Popover, Toggle, Slider)
- Website: Editorial homepage redesign with code wall showing all 11 languages
- Website: GitHub Pages deploy workflow

### Changed
- Version bumped to 1.1.5 across all packages
- Demo page renders all 9 sections on one scrollable page
- Replaced fixed-position sidebar in LayoutDemo with CSS-contained mock

### Fixed
- Sidebar component fixed-position overlay covering demo page content
- Go duplicate switch cases in theme Size method
- Rust Frame::new → Frame::default compatibility
- Python Stepper tests now work without display
- PyPI publish workflow now uses PYPI_API_TOKEN secret
- Website uses HashRouter for static hosting compatibility

## [Unreleased]

### Distribution & Marketing
- **npm**: `cronixui@1.1.5` published via OIDC Trusted Publisher (no token needed)
- **PyPI**: `cronixui@1.1.5` published (PYPI_API_TOKEN)
- **crates.io**: publish workflow added (`crates-publish.yml`); first publish blocked until the crates.io account email is verified
- **pub.dev**: publish workflow added (`pubdev-publish.yml`, needs PUB_CREDENTIALS)
- **NuGet**: WinUI csproj now has full packaging metadata; publish step in release workflow (needs NUGET_API_KEY)
- **Release orchestration**: new `release.yml` publishes to npm + PyPI + crates.io + pub.dev + NuGet on `v*` tags, with independent jobs so a missing secret never blocks the rest
- **Website**: full Open Graph + Twitter + SEO meta tags, `og:image` social preview (1200×630), `og.png` generator script
- **README**: shield badges (npm, PyPI, crates, license, stars, downloads, contributors); accurate 11-platform component matrix incl. Java
- **Repo**: GitHub topics added (ui-components, design-system, dark-mode, react, vue, svelte, solid, typescript, python, rust, go, flutter)

### Added
- **Go**: 25 new components (Alert, Avatar, Badge, Breadcrumb, Chip, ColorPicker, DatePicker, Divider, Drawer, EmptyState, FileInput, FileUpload, FormGroup, HStack, Header, Footer, Navigation, Popover, Skeleton, Spinner, Stepper, Tag, Timeline, Tooltip, TreeView, Typography H1-H6)
- **Python**: Exported 17 missing modules (Accordion, Alert, Avatar, Badge, Breadcrumb, CommandPalette, Dropdown, List, Spinner, Skeleton, Nav, Pagination, Progress, Search, Table, Tabs, Toast, Tooltip)
- **Python**: 46 comprehensive import and integration tests
- **React**: 27 new test files, 214 tests across 40 suites (was 13 suites)
- **React**: Accessibility improvements (Tabs arrow keys, Modal focus trap, Drawer focus trap, TreeView ARIA, ColorPicker ARIA, Popover click-outside, Toggle ARIA, Slider ARIA)
- **React**: Button loading state with aria-busy
- **Rust**: Expanded test suite from 3 to 16 tests
- **Svelte**: Fixed 5 missing exports (TreeView, ColorPicker, EmptyState, Notification, FileUpload)
- **Vue**: 4 new components (CnHStack, CnDivider, CnAvatarGroup, CnButtonGroup)
- **Solid**: 2 new components (AvatarGroup, ButtonGroup)
- **Flutter**: FormGroup widget for form field wrapping
- **WinUI**: 13 missing XAML styles (Avatar, Badge, CheckBox, ComboBox, Dropdown, Modal, Navigation, RadioButton, Rating, Spinner, Tabs, Textarea, Tooltip)
- **Web**: Missing CSS classes (Tooltip, Notification, EmptyState, TreeView, Dropdown, Popover, Toggle, FileInput states)
- **TypeScript**: Component prop type definitions for all components

### Fixed
- Go duplicate switch cases in theme Size method
- Go deprecated container.NewMax usage
- Rust Frame::new → Frame::default compatibility
- Rust colors::* constants vs methods mismatch
- WinUI namespace mismatches in XAML
- WinUI missing `using System;` in controls
- Flutter format strict mode compliance
- Flutter WidgetState/MaterialState compatibility
- Svelte missing component exports
- React TypeScript strict unused import errors

## [1.1.2] - 2026-04-09

### Fixed
- **BREAKING**: Removed all browser DOM API references (`classList`, `textContent`, `addEventListener`, etc.)
- Refactored all components to use pure Python HTML string generation
- Added proper dataclasses for component rendering (`ButtonElement`, `CardElement`, etc.)
- Added comprehensive type hints across all modules
- Added validation in component constructors with proper error messages

### Added
- Comprehensive test suite with pytest (50+ tests)
- Design tokens module with immutable dataclasses
- Example demo script (`examples/demo.py`)
- Python package README with usage examples
- Development dependencies in `pyproject.toml`
- MANIFEST.in for proper package distribution
- GitHub Actions CI/CD workflows
- Pytest, Black, Ruff, and MyPy configurations

### Changed
- Updated version from 1.0.6 to 1.1.2 to match other packages
- Components now use `render()` and `render_html()` methods
- Improved documentation with examples in all modules

## [1.0.6] - 2024-XX-XX

### Added
- Initial Python package implementation
- Core components (Button, Card, Toast, Badge, etc.)
- Design tokens
- Basic component structure

[1.1.2]: https://github.com/CazyUndee/CronixUI/compare/v1.0.6...v1.1.2
