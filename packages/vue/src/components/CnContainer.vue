<template>
  <div class="cn-container" :class="sizeClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: { type: String, default: 'lg' },
});

const sizeClass = computed(() => props.size !== 'lg' ? `cn-container-${props.size}` : '');
</script>

<style scoped>
.cn-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.cn-container-sm {
  max-width: 640px;
}
.cn-container-md {
  max-width: 900px;
}
.cn-container-xl {
  max-width: 1400px;
}
.cn-container-fluid {
  max-width: 100%;
}
</style>
