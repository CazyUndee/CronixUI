<template>
  <div class="cn-btn-group">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.cn-btn-group { display: inline-flex; gap: 0; }
.cn-btn-group :deep(.cn-btn) { border-radius: 0; }
.cn-btn-group :deep(.cn-btn:first-child) { border-radius: var(--cn-radius-sm, 6px) 0 0 var(--cn-radius-sm, 6px); }
.cn-btn-group :deep(.cn-btn:last-child) { border-radius: 0 var(--cn-radius-sm, 6px) var(--cn-radius-sm, 6px) 0; }
</style>
