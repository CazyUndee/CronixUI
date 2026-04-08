<template>
  <label class="cn-checkbox" :class="{ 'cn-checkbox-disabled': disabled, 'cn-checkbox-checked': modelValue }">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="cn-checkbox-indicator">
      <svg v-if="modelValue" class="cn-checkbox-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <svg v-else-if="indeterminate" class="cn-checkbox-check" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path d="M5 12h14" />
      </svg>
    </span>
    <span v-if="label" class="cn-checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.cn-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  color: #f0ede8;
}
.cn-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.cn-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #1a1a1a;
  transition: all 0.15s ease;
}
.cn-checkbox:hover .cn-checkbox-indicator {
  border-color: rgba(255, 255, 255, 0.4);
}
.cn-checkbox-checked .cn-checkbox-indicator {
  background: #6b2323;
  border-color: #6b2323;
}
.cn-checkbox-check {
  width: 14px;
  height: 14px;
  color: #f0ede8;
}
.cn-checkbox input:focus-visible + .cn-checkbox-indicator {
  outline: 2px solid #6b2323;
  outline-offset: 2px;
}
.cn-checkbox-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cn-checkbox-label {
  color: #f0ede8;
}
</style>
