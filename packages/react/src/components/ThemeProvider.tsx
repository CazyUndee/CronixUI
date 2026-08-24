import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** Current resolved theme ('light' or 'dark') */
  resolvedTheme: 'light' | 'dark';
  /** Current mode setting ('light', 'dark', or 'system') */
  mode: ThemeMode;
  /** Set the theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme mode. Defaults to 'dark' */
  defaultMode?: ThemeMode;
  /** localStorage key for persistence */
  storageKey?: string;
  /** Whether to respect prefers-color-scheme when mode is 'system'. Defaults to true */
  respectSystemPreference?: boolean;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

/**
 * ThemeProvider enables programmatic theme switching across CronixUI.
 *
 * Sets `data-theme` attribute on `document.documentElement` and syncs
 * with CSS custom properties defined in variables.css.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, useTheme } from '@cronixui/react';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultMode="dark">
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function ThemeToggle() {
 *   const { mode, setMode, toggle, resolvedTheme } = useTheme();
 *   return <button onClick={toggle}>Current: {resolvedTheme}</button>;
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultMode = 'dark',
  storageKey = 'cronixui-theme',
  respectSystemPreference = true,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // localStorage may be unavailable
    }
    return defaultMode;
  });

  const resolvedTheme = useMemo(() => resolveTheme(mode), [mode]);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      try {
        localStorage.setItem(storageKey, newMode);
      } catch {
        // localStorage may be unavailable
      }
    },
    [storageKey]
  );

  const toggle = useCallback(() => {
    setMode(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setMode]);

  // Sync data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system preference changes when mode is 'system'
  useEffect(() => {
    if (!respectSystemPreference || mode !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // Force re-resolve by re-setting mode (triggers useMemo)
      setModeState('system');
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, respectSystemPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ resolvedTheme, mode, setMode, toggle }),
    [resolvedTheme, mode, setMode, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access the current theme context. Must be used inside a ThemeProvider.
 * @throws Error if used outside a ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return ctx;
}

export { ThemeContext };
