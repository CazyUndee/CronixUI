import { ref, onMounted, onUnmounted, watch, readonly } from 'vue';

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
 * Vue composable that tracks a CSS media query.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMediaQuery } from '@cronixui/vue';
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * </script>
 *
 * <div v-if="isMobile">Mobile</div>
 * <div v-else>Desktop</div>
 * ```
 */
export function useMediaQuery(query) {
  const matches = ref(false);
  let mql = null;
  let handler = null;

  onMounted(() => {
    mql = window.matchMedia(query);
    matches.value = mql.matches;

    handler = (e) => { matches.value = e.matches; };
    mql.addEventListener('change', handler);
  });

  onUnmounted(() => {
    if (mql && handler) {
      mql.removeEventListener('change', handler);
    }
  });

  return readonly(matches);
}

/**
 * Simplified composable using predefined breakpoint tokens.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useBreakpoint } from '@cronixui/vue';
 * const isMobile = useBreakpoint('sm');
 * </script>
 * ```
 */
export function useBreakpoint(bp) {
  return useMediaQuery(breakpoints[bp]);
}

/**
 * Fire a callback when Escape is pressed.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue';
 * import { useEscapeKey } from '@cronixui/vue';
 * const open = ref(false);
 * useEscapeKey(() => { open.value = false; });
 * </script>
 * ```
 */
export function useEscapeKey(handler, enabled = true) {
  const listener = (event) => {
    if (!enabled) return;
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      handler();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', listener);
  });
}

/**
 * Detect clicks outside a template ref element.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue';
 * import { useClickOutside } from '@cronixui/vue';
 * const el = ref(null);
 * useClickOutside(el, () => { /* close dropdown *\/ });
 * </script>
 * <div ref="el">...</div>
 * ```
 */
export function useClickOutside(targetRef, handler) {
  const listener = (event) => {
    const el = targetRef.value;
    if (!el || el.contains(event.target)) return;
    handler(event);
  };

  onMounted(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  });
}
