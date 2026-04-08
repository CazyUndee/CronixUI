<template>
  <div :class="skeletonClasses"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1em' },
  radius: { type: String, default: '4px' },
  variant: { type: String, default: 'text' },
});

const skeletonClasses = computed(() => [
  'cn-skeleton',
  `cn-skeleton-${props.variant}`,
]);
</script>

<style scoped>
.cn-skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: cn-skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: v-bind(radius);
  width: v-bind(width);
  height: v-bind(height);
}
.cn-skeleton-text {
  height: 1em;
  border-radius: 4px;
}
.cn-skeleton-circle {
  border-radius: 50%;
}
.cn-skeleton-rect {
  border-radius: 10px;
}
@keyframes cn-skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
