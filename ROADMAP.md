# CronixUI Roadmap

## Phase 1: Unify Design System ✅
- [x] Single tokens source (colors, typography, spacing)
- [x] Consistent `cn-` prefix across all platforms
- [x] 35 components defined in spec

## Phase 2: Component Compiler (Next)

### Architecture
```
packages/
  spec/                    # Single source of truth
    tokens.json           # Design tokens
    components.json       # Component definitions
    generate.ts           # Code generator
    
  templates/              # Platform templates
    react.hbs
    vue.hbs
    svelte.hbs
    solid.hbs
    flutter.hbs
    python.hbs
    go.hbs
    rust.hbs
```

### Generator Flow
```
tokens.json + components.json
         ↓
    generate.ts
         ↓
    ┌────┴────┐
    ↓         ↓
  React    Flutter
  Vue      Python
  Svelte   Go
  Solid    Rust
```

### Implementation Steps
1. Extract tokens to `spec/tokens.json`
2. Define component schemas in `spec/components.json`
3. Create Handlebars templates per platform
4. Build generator CLI: `pnpm gen:all`
5. Wire into CI for validation

## Phase 3: Documentation Site

### Stack
- Framework: Astro (islands architecture)
- Styling: CronixUI itself (dogfood)
- Deploy: Vercel

### Pages
```
/                    # Landing
/getting-started     # Installation per platform
/components          # All 35 components
  /button           # Button docs
  /button/react     # React variant
  /button/vue       # Vue variant
/tokens              # Design tokens
/examples            # Example apps
```

### Live Playgrounds
- React: Sandpack
- Vue: Vue SFC Playground
- Svelte: Svelte REPL
- Solid: Solid Playground

## Phase 4: Package Publishing

### NPM (React, Vue, Svelte, Solid)
```bash
pnpm publish --filter "./packages/*"
```

### PyPI (Python)
```bash
cd packages/python && poetry publish
```

### Pub.dev (Flutter)
```bash
cd packages/flutter && flutter pub publish
```

### Crates.io (Rust)
```bash
cd packages/rust && cargo publish
```

### Go pkg.go.dev (Go)
```bash
git tag v1.0.0 && git push --tags
```

## Phase 5: Advanced Features

### CLI/TUI Port
- Go: Bubble Tea + Lipgloss
- Rust: Ratatui
- Python: Rich + Textual

### Component Testing
- Visual regression: Playwright
- Unit: Vitest (web), pytest (python)
- E2E: Cypress

### Theming System
```json
{
  "themes": ["dark", "light", "crimson", "midnight"],
  "custom": "user-defined tokens"
}
```

### Accessibility Audit
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support

## Priority Order

1. **Compiler** - Removes drift between platforms
2. **Docs** - Increases adoption
3. **Publish** - Makes it usable
4. **TUI** - Unique differentiator
5. **Testing** - Quality assurance
6. **Theming** - Flexibility
7. **A11y** - Compliance

## Quick Wins (Do Now)

```bash
# 1. Create spec schema
mkdir -p packages/spec
echo '{}' > packages/spec/tokens.json

# 2. Setup docs skeleton
mkdir -p docs
cp packages/web/src/cronixui.css docs/

# 3. Add publish scripts
echo '{"scripts":{"publish:all":"pnpm -r publish"}}' >> package.json
```
