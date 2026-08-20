<template>
  <div class="cn-empty-state">
    <div v-if="icon" class="cn-empty-state-icon">{{ icon }}</div>
    <div class="cn-empty-state-title">{{ title }}</div>
    <div v-if="description" class="cn-empty-state-description">{{ description }}</div>
    <div class="cn-empty-state-action"><slot /></div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});
</script>

<style scoped>
.cn-empty-state { display: flex; flex-direction: column; align-items: center; padding: 48px 24px; text-align: center; }
.cn-empty-state-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
.cn-empty-state-title { font-size: 16px; font-weight: 600; color: #ccc; margin-bottom: 8px; }
.cn-empty-state-description { font-size: 13px; color: #888; max-width: 400px; margin-bottom: 16px; }
</style>
