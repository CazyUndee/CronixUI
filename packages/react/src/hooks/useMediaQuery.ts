import { useState, useEffect } from 'react';

/**
 * React hook that tracks a CSS media query.
 *
 * @param query - CSS media query string, e.g. `(min-width: 768px)`
 * @returns `true` when the query matches, `false` otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useMediaQuery('(max-width: 640px)');
 *   const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileNav /> : <DesktopNav />}
 *       <p>Screen is {isDesktop ? 'wide' : 'narrow'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Sync initial value in case it changed between render and effect
    setMatches(mq.matches);

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint queries matching CronixUI's responsive design tokens.
 *
 * @example
 * ```tsx
 * const isMobile = useBreakpoint('sm');  // max-width: 640px
 * const isTablet = useBreakpoint('md');  // max-width: 768px
 * ```
 */
export const breakpoints = {
  /** max-width: 640px */
  sm: '(max-width: 640px)',
  /** max-width: 768px */
  md: '(max-width: 768px)',
  /** max-width: 1024px */
  lg: '(max-width: 1024px)',
  /** min-width: 641px */
  smUp: '(min-width: 641px)',
  /** min-width: 769px */
  mdUp: '(min-width: 769px)',
  /** min-width: 1025px */
  lgUp: '(min-width: 1025px)',
  /** min-width: 1280px */
  xlUp: '(min-width: 1280px)',
  /** prefers-color-scheme: dark */
  dark: '(prefers-color-scheme: dark)',
  /** prefers-reduced-motion: reduce */
  reducedMotion: '(prefers-reduced-motion: reduce)',
  /** hover: hover (pointer device) */
  hover: '(hover: hover)',
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Simplified hook using predefined breakpoint tokens.
 *
 * @example
 * ```tsx
 * const isMobile = useBreakpoint('sm');
 * const prefersDark = useBreakpoint('dark');
 * ```
 */
export function useBreakpoint(bp: Breakpoint): boolean {
  return useMediaQuery(breakpoints[bp]);
}
