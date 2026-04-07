export interface ColorToken {
  hex: string;
  r: number;
  g: number;
  b: number;
}

// Background colors
export const BG: ColorToken = { hex: '#0a0a0a', r: 10, g: 10, b: 10 };
export const SURFACE: ColorToken = { hex: '#111111', r: 17, g: 17, b: 17 };
export const SURFACE_2: ColorToken = { hex: '#1a1a1a', r: 26, g: 26, b: 26 };
export const SURFACE_3: ColorToken = { hex: '#222222', r: 34, g: 34, b: 34 };
export const SURFACE_4: ColorToken = { hex: '#2a2a2a', r: 42, g: 42, b: 42 };

// Text colors
export const TEXT: ColorToken = { hex: '#f0ede8', r: 240, g: 237, b: 232 };
export const TEXT_MUTED = 'rgba(240, 237, 232, 0.5)' as const;
export const TEXT_DIM = 'rgba(240, 237, 232, 0.25)' as const;

// Accent colors (Crimson)
export const ACCENT: ColorToken = { hex: '#6b2323', r: 107, g: 35, b: 35 };
export const ACCENT_HOVER: ColorToken = { hex: '#7d2a2a', r: 125, g: 42, b: 42 };
export const ACCENT_LIGHT: ColorToken = { hex: '#8a3535', r: 138, g: 53, b: 53 };
export const ACCENT_GLOW = 'rgba(107, 35, 35, 0.3)' as const;
export const ACCENT_TEXT: ColorToken = { hex: '#c97a7a', r: 201, g: 122, b: 122 };

// Semantic colors - Success
export const SUCCESS: ColorToken = { hex: '#1e5028', r: 30, g: 80, b: 40 };
export const SUCCESS_BORDER = 'rgba(60, 140, 70, 0.4)' as const;
export const SUCCESS_TEXT: ColorToken = { hex: '#6bc47a', r: 107, g: 196, b: 122 };

// Semantic colors - Warning
export const WARNING: ColorToken = { hex: '#503c14', r: 80, g: 60, b: 20 };
export const WARNING_BORDER = 'rgba(150, 110, 30, 0.4)' as const;
export const WARNING_TEXT: ColorToken = { hex: '#c4a43a', r: 196, g: 164, b: 58 };

// Semantic colors - Error
export const ERROR: ColorToken = { hex: '#501414', r: 80, g: 20, b: 20 };
export const ERROR_BORDER = 'rgba(180, 60, 60, 0.4)' as const;
export const ERROR_TEXT: ColorToken = { hex: '#c46b6b', r: 196, g: 107, b: 107 };

// Semantic colors - Info
export const INFO: ColorToken = { hex: '#143550', r: 20, g: 53, b: 80 };
export const INFO_BORDER = 'rgba(60, 140, 200, 0.4)' as const;
export const INFO_TEXT: ColorToken = { hex: '#6ba8c4', r: 107, g: 168, b: 196 };

// Border colors
export const BORDER = 'rgba(255, 255, 255, 0.08)' as const;
export const BORDER_HOVER = 'rgba(255, 255, 255, 0.15)' as const;
export const BORDER_FOCUS = 'rgba(255, 255, 255, 0.25)' as const;

// Typography
export const FONT_FAMILY = "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" as const;
export const FONT_MONO = "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 12,
  base: 13,
  md: 14,
  lg: 16,
  xl: 20,
  '2xl': 28,
  '3xl': 36,
} as const;

// Spacing
export const SPACE = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

// Border radius
export const RADIUS = {
  sm: 6,
  default: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

// Shadows
export const SHADOW = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  default: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px rgba(107, 35, 35, 0.3)',
} as const;

// Transitions
export const TRANSITION = {
  fast: '0.1s ease',
  default: '0.15s ease',
  slow: '0.25s ease',
} as const;

// Z-index
export const Z_INDEX = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;

// Layout
export const LAYOUT = {
  containerMax: 1200,
  sidebarWidth: 260,
} as const;
