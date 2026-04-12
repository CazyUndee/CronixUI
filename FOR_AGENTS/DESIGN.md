# DESIGN.md

All design tokens are defined in CSS custom properties (`packages/web/src/variables.css`) and mirrored in each language.

## Colors

### Background
| Token | Value | Description |
|---|---|---|
| `--cn-bg` | `#0a0a0a` | Primary background |
| `--cn-surface` | `#111111` | Surface level 1 |
| `--cn-surface-2` | `#1a1a1a` | Surface level 2 |
| `--cn-surface-3` | `#222222` | Surface level 3 |
| `--cn-surface-4` | `#2a2a2a` | Surface level 4 |

### Text
| Token | Value | Description |
|---|---|---|
| `--cn-text` | `#f0ede8` | Primary text |
| `--cn-text-muted` | `rgba(240,23,232,0.5)` | Muted text |
| `--cn-text-dim` | `rgba(240,23,232,0.25)` | Dim text |

### Accent (Crimson)
| Token | Value | Description |
|---|---|---|
| `--cn-accent` | `#6b2323` | Primary accent |
| `--cn-accent-hover` | `#7d2a2a` | Accent hover |
| `--cn-accent-light` | `#8a3535` | Accent light |
| `--cn-accent-glow` | `rgba(107,35,35,0.3)` | Accent glow |
| `--cn-accent-text` | `#c97a7a` | Accent text |

### Semantic
| Token | Value |
|---|---|
| `--cn-success` | `#1e5028` |
| `--cn-success-border` | `rgba(60,140,70,0.4)` |
| `--cn-success-text` | `#6bc47a` |
| `--cn-warning` | `#503c14` |
| `--cn-warning-border` | `rgba(150,110,30,0.4)` |
| `--cn-warning-text` | `#c4a43a` |
| `--cn-error` | `#501414` |
| `--cn-error-border` | `rgba(180,60,60,0.4)` |
| `--cn-error-text` | `#c46b6b` |
| `--cn-info` | `#143550` |
| `--cn-info-border` | `rgba(60,140,200,0.4)` |
| `--cn-info-text` | `#6ba8c4` |

## Typography

| Token | Value |
|---|---|
| `--cn-font` | `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--cn-font-mono` | `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` |
| `--cn-text-xs` | `11px` |
| `--cn-text-sm` | `12px` |
| `--cn-text-base` | `13px` |
| `--cn-text-md` | `14px` |
| `--cn-text-lg` | `16px` |
| `--cn-text-xl` | `20px` |
| `--cn-text-2xl` | `28px` |
| `--cn-text-3xl` | `36px` |

## Layout Tokens

| Token | Value |
|---|---|
| `--cn-space-1` | `4px` |
| `--cn-space-2` | `8px` |
| `--cn-space-3` | `12px` |
| `--cn-space-4` | `16px` |
| `--cn-space-5` | `20px` |
| `--cn-space-6` | `24px` |
| `--cn-space-8` | `32px` |
| `--cn-space-10` | `40px` |
| `--cn-space-12` | `48px` |
| `--cn-radius-sm` | `6px` |
| `--cn-radius` | `10px` |
| `--cn-radius-lg` | `14px` |
| `--cn-radius-xl` | `20px` |
| `--cn-radius-full` | `9999px` |
| `--cn-shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `--cn-shadow` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--cn-shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` |
| `--cn-shadow-glow` | `0 0 20px rgba(107,35,35,0.3)` |
| `--cn-transition-fast` | `0.1s ease` |
| `--cn-transition` | `0.15s ease` |
| `--cn-transition-slow` | `0.25s ease` |
| `--cn-z-dropdown` | `100` |
| `--cn-z-sticky` | `200` |
| `--cn-z-fixed` | `300` |
| `--cn-z-modal-backdrop` | `400` |
| `--cn-z-modal` | `500` |
| `--cn-z-popover` | `600` |
| `--cn-z-tooltip` | `700` |
| `--cn-z-toast` | `800` |
| `--cn-container-max` | `1200px` |
| `--cn-sidebar-width` | `260px` |
