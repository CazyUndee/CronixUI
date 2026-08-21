<template>
  <div :class="`cn-hstack cn-hstack-${spacing}`">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  spacing: { type: String, default: '4', validator: v => ['1','2','4','6'].includes(v) },
})
</script>

<style scoped>
.cn-hstack { display: flex; align-items: center; }
.cn-hstack-1 { gap: 4px; }
.cn-hstack-2 { gap: 8px; }
.cn-hstack-4 { gap: 16px; }
.cn-hstack-6 { gap: 24px; }
</style>
