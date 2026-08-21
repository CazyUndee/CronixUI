# Changelog

All notable changes to CronixUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
