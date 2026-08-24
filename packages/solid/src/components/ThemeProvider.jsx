import { createContext, useContext, createSignal, createEffect, type JSX } from 'solid-js';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  resolvedTheme: () => 'light' | 'dark';
  mode: () => ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

export interface ThemeProviderProps {
  children: JSX.Element;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

/**
 * ThemeProvider enables programmatic theme switching across CronixUI.
 * Sets `data-theme` attribute on `document.documentElement` and syncs
 * with CSS custom properties.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultMode="dark">
 *   <App />
 * </ThemeProvider>
 *
 * // In child component:
 * const theme = useTheme();
 * <button onClick={theme.toggle}>Toggle: {theme.resolvedTheme()}</button>
 * ```
 */
export function ThemeProvider(props: ThemeProviderProps) {
  const storageKey = () => props.storageKey ?? 'cronixui-theme';
  const defaultMode = () => props.defaultMode ?? 'dark';

  const [mode, setMode] = createSignal<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode();
    try {
      const stored = localStorage.getItem(storageKey());
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {}
    return defaultMode();
  });

  const resolvedTheme = () => resolveTheme(mode());

  const handleSetMode = (newMode: ThemeMode) => {
    setMode(() => newMode);
    try {
      localStorage.setItem(storageKey(), newMode);
    } catch {}
  };

  const toggle = () => {
    handleSetMode(resolvedTheme() === 'dark' ? 'light' : 'dark');
  };

  createEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme());
  });

  createEffect(() => {
    if (mode() !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setMode(() => 'system');
    mq.addEventListener('change', handler);
    // eslint-disable-next-line solid/reactivity
    return () => mq.removeEventListener('change', handler);
  });

  const value: ThemeContextValue = {
    resolvedTheme,
    mode,
    setMode: handleSetMode,
    toggle,
  };

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

/**
 * Access the current theme context. Must be used inside a ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return ctx;
}

export { ThemeContext };
