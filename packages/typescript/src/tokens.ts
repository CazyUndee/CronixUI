export interface ColorToken {
  hex: string;
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface RgbaToken {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const COLORS = {
  bg: { hex: '#0a0a0a', r: 10, g: 10, b: 10 } as ColorToken,
  surface: { hex: '#111111', r: 17, g: 17, b: 17 } as ColorToken,
  surface2: { hex: '#1a1a1a', r: 26, g: 26, b: 26 } as ColorToken,
  surface3: { hex: '#222222', r: 34, g: 34, b: 34 } as ColorToken,
  surface4: { hex: '#2a2a2a', r: 42, g: 42, b: 42 } as ColorToken,
  text: { hex: '#f0ede8', r: 240, g: 237, b: 232 } as ColorToken,
  textMuted: { r: 240, g: 237, b: 232, a: 0.5 } as RgbaToken,
  textDim: { r: 240, g: 237, b: 232, a: 0.25 } as RgbaToken,
  accent: { hex: '#6b2323', r: 107, g: 35, b: 35 } as ColorToken,
  accentHover: { hex: '#7d2a2a', r: 125, g: 42, b: 42 } as ColorToken,
  accentLight: { hex: '#8a3535', r: 138, g: 53, b: 53 } as ColorToken,
  accentGlow: { r: 107, g: 35, b: 35, a: 0.3 } as RgbaToken,
  accentText: { hex: '#c97a7a', r: 201, g: 122, b: 122 } as ColorToken,
  success: { hex: '#1e5028', r: 30, g: 80, b: 40 } as ColorToken,
  successBorder: { r: 60, g: 140, b: 70, a: 0.4 } as RgbaToken,
  successText: { hex: '#6bc47a', r: 107, g: 196, b: 122 } as ColorToken,
  warning: { hex: '#503c14', r: 80, g: 60, b: 20 } as ColorToken,
  warningBorder: { r: 150, g: 110, b: 30, a: 0.4 } as RgbaToken,
  warningText: { hex: '#c4a43a', r: 196, g: 164, b: 58 } as ColorToken,
  error: { hex: '#501414', r: 80, g: 20, b: 20 } as ColorToken,
  errorBorder: { r: 180, g: 60, b: 60, a: 0.4 } as RgbaToken,
  errorText: { hex: '#c46b6b', r: 196, g: 107, b: 107 } as ColorToken,
  info: { hex: '#143550', r: 20, g: 53, b: 80 } as ColorToken,
  infoBorder: { r: 60, g: 140, b: 200, a: 0.4 } as RgbaToken,
  infoText: { hex: '#6ba8c4', r: 107, g: 168, b: 196 } as ColorToken,
  border: { r: 255, g: 255, b: 255, a: 0.08 } as RgbaToken,
  borderHover: { r: 255, g: 255, b: 255, a: 0.15 } as RgbaToken,
  borderFocus: { r: 255, g: 255, b: 255, a: 0.25 } as RgbaToken,
} as const;

export const TYPOGRAPHY = {
  fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  fontSize: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 16,
    xl: 20,
    '2xl': 28,
    '3xl': 36,
  },
} as const;

export const SPACING = {
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

export const RADIUS = {
  sm: 6,
  default: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  default: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px rgba(107, 35, 35, 0.3)',
} as const;

export const TRANSITIONS = {
  fast: '0.1s ease',
  default: '0.15s ease',
  slow: '0.25s ease',
} as const;

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

export const LAYOUT = {
  containerMax: 1200,
  sidebarWidth: 260,
  headerHeight: 56,
} as const;

export const VERSION = '1.0.6';
