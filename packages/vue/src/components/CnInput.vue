<template>
  <input
    type="text"
    :class="inputClasses"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  size: { type: String, default: 'md' },
  error: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const inputClasses = computed(() => [
  'cn-input',
  props.size !== 'md' && `cn-input-${props.size}`,
  props.error && 'cn-input-error',
].filter(Boolean));
</script>

<style scoped>
.cn-input {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 12px;
  color: #f0ede8;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
}
.cn-input:hover { border-color: rgba(255, 255, 255, 0.15); }
.cn-input:focus { border-color: #6b2323; box-shadow: 0 0 0 3px rgba(107, 35, 35, 0.3); }
.cn-input::placeholder { color: rgba(240, 237, 232, 0.25); }
.cn-input:disabled { opacity: 0.5; cursor: not-allowed; background: #1a1a1a; }
.cn-input-error { border-color: #501414; }
.cn-input-error:focus { box-shadow: 0 0 0 3px rgba(180, 60, 60, 0.2); }
.cn-input-sm { padding: 4px 8px; font-size: 12px; }
.cn-input-lg { padding: 12px 16px; font-size: 16px; }
</style>
