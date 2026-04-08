<template>
  <div class="cn-card" :class="{ 'cn-card-clickable': clickable }">
    <div v-if="title || subtitle" class="cn-card-header">
      <h3 v-if="title" class="cn-card-title">{{ title }}</h3>
      <p v-if="subtitle" class="cn-card-subtitle">{{ subtitle }}</p>
    </div>
    <div class="cn-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="cn-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  clickable: { type: Boolean, default: false },
});
</script>

<style scoped>
.cn-card {
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px;
  transition: border-color 0.15s ease;
}
.cn-card:hover { border-color: rgba(255, 255, 255, 0.15); }
.cn-card-clickable { cursor: pointer; }
.cn-card-clickable:hover { background: #1a1a1a; }
.cn-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.cn-card-title { font-size: 14px; font-weight: 500; color: #f0ede8; }
.cn-card-subtitle { font-size: 12px; color: rgba(240, 237, 232, 0.5); margin-top: 4px; }
.cn-card-body { color: rgba(240, 237, 232, 0.5); }
.cn-card-footer { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
</style>
