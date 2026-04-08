<template>
  <label
    v-for="(opt, i) in normalizedOptions"
    :key="i"
    class="cn-radio"
    :class="{ disabled }"
  >
    <input
      type="radio"
      :name="name"
      :disabled="disabled"
      :checked="modelValue === normalizeOption(opt).value"
      @change="$emit('update:modelValue', normalizeOption(opt).value)"
    />
    <span class="cn-radio-box"></span>
    <span class="cn-radio-label">{{ normalizeOption(opt).label }}</span>
  </label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue', 'change']);

const normalizedOptions = computed(() => props.options);

function normalizeOption(opt) {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt;
}
</script>

<style scoped>
.cn-radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.cn-radio input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.cn-radio-box {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #111111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}
.cn-radio:hover .cn-radio-box {
  border-color: rgba(255, 255, 255, 0.15);
}
.cn-radio input:checked + .cn-radio-box {
  background: #6b2323;
  border-color: #6b2323;
}
.cn-radio-box::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6b2323;
  transform: scale(0);
  transition: transform 0.1s ease;
}
.cn-radio input:checked + .cn-radio-box::after {
  transform: scale(1);
}
.cn-radio-label {
  font-size: 13px;
  color: #f0ede8;
}
.cn-radio.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
