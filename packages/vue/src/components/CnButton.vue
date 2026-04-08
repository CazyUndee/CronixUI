<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'md' },
  icon: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(['click']);

const buttonClasses = computed(() => [
  'cn-btn',
  `cn-btn-${props.variant}`,
  props.size !== 'md' && `cn-btn-${props.size}`,
  props.icon && 'cn-btn-icon',
].filter(Boolean));
</script>

<style scoped>
.cn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.15s ease;
  background: #1a1a1a;
  color: #f0ede8;
}
.cn-btn:hover { border-color: rgba(255, 255, 255, 0.15); background: #222222; }
.cn-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cn-btn-primary { background: #6b2323; border-color: #6b2323; }
.cn-btn-primary:hover { background: #7d2a2a; border-color: #7d2a2a; }
.cn-btn-danger { background: #501414; border-color: #501414; }
.cn-btn-danger:hover { background: #6a1a1a; border-color: #6a1a1a; }
.cn-btn-success { background: #1e5028; border-color: #1e5028; }
.cn-btn-success:hover { background: #256b32; border-color: #256b32; }
.cn-btn-ghost { background: transparent; border-color: transparent; }
.cn-btn-ghost:hover { background: #1a1a1a; }
.cn-btn-outline { background: transparent; }
.cn-btn-outline:hover { background: #1a1a1a; }
.cn-btn-sm { padding: 4px 12px; font-size: 12px; }
.cn-btn-lg { padding: 12px 24px; font-size: 16px; }
.cn-btn-icon { padding: 8px; }
</style>
