<template>
  <div class="cn-rating" :class="[`cn-rating-${size}`, { disabled }]" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in max"
      :key="star"
      type="button"
      role="radio"
      :aria-checked="star <= modelValue"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      class="cn-rating-star"
      :class="{ 'cn-rating-star-active': star <= modelValue }"
      :disabled="disabled"
      @click="$emit('update:modelValue', star)"
    >★</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.cn-rating {
  display: inline-flex;
  gap: 4px;
}
.cn-rating-star {
  background: transparent;
  border: none;
  padding: 0;
  font-size: 24px;
  line-height: 1;
  color: #2a2a2a;
  cursor: pointer;
  transition: color 0.15s ease, transform 0.15s ease;
}
.cn-rating-star:hover {
  transform: scale(1.15);
}
.cn-rating-star-active {
  color: #6b2323;
}
.cn-rating-sm .cn-rating-star { font-size: 16px; }
.cn-rating-lg .cn-rating-star { font-size: 32px; }
.cn-rating.disabled .cn-rating-star {
  cursor: not-allowed;
  opacity: 0.5;
}
.cn-rating.disabled .cn-rating-star:hover {
  transform: none;
}
</style>
