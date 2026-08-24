import { readable, derived } from 'svelte/store';

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
};

/**
 * Svelte readable store that tracks a CSS media query.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useMediaQuery } from '@cronixui/svelte';
 *   const isMobile = useMediaQuery('(max-width: 640px)');
 * </script>
 *
 * {#if $isMobile}
 *   <MobileNav />
 * {:else}
 *   <DesktopNav />
 * {/if}
 * ```
 */
export function useMediaQuery(query) {
  return readable(false, (set) => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia(query);
    set(mq.matches);

    const handler = (e) => set(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });
}

/**
 * Simplified store using predefined breakpoint tokens.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useBreakpoint } from '@cronixui/svelte';
 *   const isMobile = useBreakpoint('sm');
 * </script>
 * ```
 */
export function useBreakpoint(bp) {
  return useMediaQuery(breakpoints[bp]);
}

/**
 * Create a store that fires a callback when Escape is pressed.
 * Returns a readable boolean that is true while Escape is being handled.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useEscapeKey } from '@cronixui/svelte';
 *   let open = false;
 *   useEscapeKey(() => { open = false; });
 * </script>
 * ```
 */
export function useEscapeKey(handler, enabled = true) {
  if (typeof window === 'undefined') return;

  const listener = (event) => {
    if (!enabled) return;
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      handler();
    }
  };

  document.addEventListener('keydown', listener);
  return {
    destroy() {
      document.removeEventListener('keydown', listener);
    },
  };
}
