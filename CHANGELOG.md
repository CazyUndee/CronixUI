# Changelog

All notable changes to the CronixUI Python package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
