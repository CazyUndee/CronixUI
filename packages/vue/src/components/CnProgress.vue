<template>
  <div :class="progressClasses">
    <div v-if="showLabel" class="cn-progress-label">
      <span>{{ value }}</span>
      <span>{{ max }}</span>
    </div>
    <div class="cn-progress-track">
      <div class="cn-progress-bar" :style="{ width: `${percentage}%` }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'md' },
  showLabel: { type: Boolean, default: false },
});

const percentage = computed(() =>
  Math.min(100, Math.max(0, (props.value / props.max) * 100))
);

const progressClasses = computed(() => [
  'cn-progress',
  `cn-progress-${props.size}`,
  props.variant !== 'default' && `cn-progress-${props.variant}`,
].filter(Boolean));
</script>

<style scoped>
.cn-progress {
  width: 100%;
}
.cn-progress-track {
  height: 4px;
  background: #222222;
  border-radius: 9999px;
  overflow: hidden;
}
.cn-progress-bar {
  height: 100%;
  background: #6b2323;
  border-radius: 9999px;
  transition: width 0.25s ease;
}
.cn-progress-success .cn-progress-bar {
  background: #6bc47a;
}
.cn-progress-warning .cn-progress-bar {
  background: #c4a43a;
}
.cn-progress-error .cn-progress-bar {
  background: #c46b6b;
}
.cn-progress-lg .cn-progress-track {
  height: 8px;
}
.cn-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(240, 237, 232, 0.5);
  margin-bottom: 4px;
}
</style>
