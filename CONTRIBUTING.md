# Contributing to CronixUI

Thanks for contributing! CronixUI is a cross-platform UI toolkit that ships the **same component set across 12 languages**. Every component should behave identically everywhere, which means most serious contributions touch more than one package.

## Ground rules

- **One design system.** Components must match the shared design tokens (dark theme, crimson accents, Outfit typography) defined in `DESIGN_SYSTEM.md` and `packages/web/src/variables.css`.
- **Same API everywhere.** When you add a component to one framework, port it to the others (or at least document the gap). Parity is the product.
- **Native, not HTML wrappers.** Desktop/mobile packages (Flutter, WinUI, Java, Go, Rust, Python) must use real native widgets — no webviews, no "emit HTML and call it native."
- **Accessibility first.** Add ARIA roles/labels, keyboard navigation, and focus management for web frameworks.

## How to add a component

1. Add the component to the web package (CSS + JS) — it's the reference implementation and the shared tokens source.
2. Implement it in each framework package under `packages/`:
   - `react/`, `svelte/`, `solid/`, `vue/` — component + export from the package `index`.
   - `python/`, `go/`, `rust/`, `flutter/`, `win/`, `java/` — native widget equivalents.
3. Add or update the component matrix in `README.md`.
4. Add tests in each package that has a test harness.
5. Export it from the package entry point.

## Running checks

```bash
# Web / JS frameworks
cd website && npm ci && npm run build          # build the marketing site
cd packages/react && npm test                   # React unit tests

# Python
cd packages/python && python -m pytest

# Rust
cd packages/rust/cronixui && cargo test

# Java
mvn -f packages/java/pom.xml test

# Verify every package builds
pnpm -r build
```

## CI

Every platform has its own workflow under `.github/workflows/` (`*-ci.yml`). A component added to `packages/<x>/**` automatically runs that platform's CI on your PR. Keep all of them green.

## Commit & branch strategy

- `main` is stable and production-ready.
- `develop` is the active development branch for day-to-day and agent-driven changes.
- Open a PR from `develop` (or a feature branch) into `main`, then review and merge.

## Releasing

Releases are tag-driven. Pushing a `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which publishes to npm, PyPI, crates.io, pub.dev, and NuGet automatically (a job that lacks its secret fails on its own without blocking others).

## License

By contributing you agree that your contributions are licensed under the [GPL-3.0](LICENSE) license.