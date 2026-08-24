<script setup lang="ts">
import { ref, computed, provide, onMounted, watch, type InjectionKey, type Ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContext {
  resolvedTheme: Ref<'light' | 'dark'>;
  mode: Ref<ThemeMode>;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const THEME_KEY: InjectionKey<ThemeContext> = Symbol('cronixui-theme');

const props = withDefaults(
  defineProps<{
    defaultMode?: ThemeMode;
    storageKey?: string;
  }>(),
  {
    defaultMode: 'dark',
    storageKey: 'cronixui-theme',
  }
);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

const mode = ref<ThemeMode>(props.defaultMode);
const resolvedTheme = computed(() => resolveTheme(mode.value));

function setMode(newMode: ThemeMode) {
  mode.value = newMode;
  try {
    localStorage.setItem(props.storageKey, newMode);
  } catch {}
}

function toggle() {
  setMode(resolvedTheme.value === 'dark' ? 'light' : 'dark');
}

onMounted(() => {
  // Restore persisted theme
  try {
    const stored = localStorage.getItem(props.storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      mode.value = stored;
    }
  } catch {}

  // Sync data-theme attribute
  watch(
    resolvedTheme,
    (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    },
    { immediate: true }
  );

  // Listen for system preference changes
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode.value === 'system') {
        // Trigger reactivity by re-setting
        mode.value = 'system';
      }
    };
    mq.addEventListener('change', handler);
  }
});

provide(THEME_KEY, { resolvedTheme, mode, setMode, toggle });
</script>

<template>
  <slot />
</template>
