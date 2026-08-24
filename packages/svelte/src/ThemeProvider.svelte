<script lang="ts">
  import { setContext, onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { writable, derived } from 'svelte/store';

  /** Initial theme mode: 'light', 'dark', or 'system' */
  export let defaultMode: 'light' | 'dark' | 'system' = 'dark';
  /** localStorage key for persistence */
  export let storageKey = 'cronixui-theme';

  function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolveTheme(mode: string): 'light' | 'dark' {
    if (mode === 'system') return getSystemTheme();
    return mode as 'light' | 'dark';
  }

  const mode = writable(defaultMode);

  onMount(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        mode.set(stored);
      }
    } catch {}

    // Sync data-theme attribute
    const unsub = mode.subscribe((m) => {
      const resolved = resolveTheme(m);
      document.documentElement.setAttribute('data-theme', resolved);
      try {
        localStorage.setItem(storageKey, m);
      } catch {}
    });

    // Listen for system preference changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const current = getModeSnapshot();
      if (current === 'system') {
        // Trigger re-evaluation by re-setting
        mode.set('system');
      }
    };
    mq.addEventListener('change', handler);

    onDestroy(() => {
      unsub();
      mq.removeEventListener('change', handler);
    });
  });

  function getModeSnapshot(): string {
    let val = defaultMode;
    const unsub = mode.subscribe((m) => (val = m));
    unsub();
    return val;
  }

  const resolvedTheme = derived(mode, ($mode) => resolveTheme($mode));

  function setMode(newMode: 'light' | 'dark' | 'system') {
    mode.set(newMode);
  }

  function toggle() {
    const current = resolveTheme(getModeSnapshot());
    setMode(current === 'dark' ? 'light' : 'dark');
  }

  // Provide context to children
  setContext('cronixui-theme', {
    mode,
    resolvedTheme,
    setMode,
    toggle,
  });
</script>

<slot />
