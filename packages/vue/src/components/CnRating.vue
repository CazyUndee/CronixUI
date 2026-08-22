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
      :tabindex="star === modelValue || (modelValue === 0 && star === 1) ? 0 : -1"
      @click="$emit('update:modelValue', star)"
      @keydown="handleKeydown($event, star)"
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

const emit = defineEmits(['update:modelValue']);

function handleKeydown(event, star) {
  if (props.disabled) return;
  let nextStar = star;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault();
      nextStar = Math.min(star + 1, props.max);
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault();
      nextStar = Math.max(star - 1, 1);
      break;
    case 'Home':
      event.preventDefault();
      nextStar = 1;
      break;
    case 'End':
      event.preventDefault();
      nextStar = props.max;
      break;
    default:
      return;
  }
  emit('update:modelValue', nextStar);
}
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
  outline: none;
}
.cn-rating-star:focus-visible {
  box-shadow: 0 0 0 2px #6b2323;
  border-radius: 4px;
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
