import { createSignal, createEffect, onCleanup } from 'solid-js';

export type Breakpoint = keyof typeof breakpoints;

export const breakpoints = {
  sm: '(max-width: 640px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  smUp: '(min-width: 641px)',
  mdUp: '(min-width: 769px)',
  lgUp: '(min-width: 1025px)',
  xlUp: '(min-width: 1280px)',
  dark: '(prefers-color-scheme: dark)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  hover: '(hover: hover)',
} as const;

/**
 * Track a CSS media query reactively using Solid signals.
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * <div class:hidden={isMobile()}>Desktop only</div>
 * ```
 */
export function useMediaQuery(query: string): () => boolean {
  const [matches, setMatches] = createSignal(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  createEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(() => mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(() => e.matches);
    mq.addEventListener('change', handler);
    onCleanup(() => mq.removeEventListener('change', handler));
  });

  return matches;
}

/**
 * Simplified hook using predefined breakpoint tokens.
 *
 * @example
 * ```tsx
 * const isMobile = useBreakpoint('sm');
 * ```
 */
export function useBreakpoint(bp: Breakpoint): () => boolean {
  return useMediaQuery(breakpoints[bp]);
}

/**
 * Fire a callback when Escape is pressed.
 *
 * @example
 * ```tsx
 * useEscapeKey(() => setOpen(false));
 * ```
 */
export function useEscapeKey(handler: () => void, enabled = true): void {
  createEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        handler();
      }
    };

    document.addEventListener('keydown', listener);
    onCleanup(() => document.removeEventListener('keydown', listener));
  });
}
