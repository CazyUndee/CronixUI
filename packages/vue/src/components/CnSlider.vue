<template>
  <input
    type="range"
    class="cn-slider"
    :class="{ disabled }"
    :min="min"
    :max="max"
    :step="step"
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', Number($event.target.value))"
  />
</template>

<script setup>
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  modelValue: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.cn-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: #222222;
  outline: none;
  cursor: pointer;
}
.cn-slider.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.cn-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6b2323;
  border: 2px solid #f0ede8;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.cn-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}
.cn-slider.disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}
.cn-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6b2323;
  border: 2px solid #f0ede8;
  cursor: pointer;
}
.cn-slider.disabled::-moz-range-thumb {
  cursor: not-allowed;
}
</style>
