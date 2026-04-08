<template>
  <div :class="spinnerClasses"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: { type: String, default: 'md' },
});

const spinnerClasses = computed(() => [
  'cn-spinner',
  props.size !== 'md' && `cn-spinner-${props.size}`,
].filter(Boolean));
</script>

<style scoped>
.cn-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #222222;
  border-top-color: #6b2323;
  border-radius: 50%;
  animation: cn-spin 0.8s linear infinite;
}
.cn-spinner-sm {
  width: 16px;
  height: 16px;
}
.cn-spinner-lg {
  width: 40px;
  height: 40px;
}
@keyframes cn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
