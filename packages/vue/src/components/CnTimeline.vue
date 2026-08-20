<template>
  <div class="cn-timeline">
    <div v-for="(item, index) in items" :key="index" class="cn-timeline-item" :class="item.variant || 'default'">
      <div class="cn-timeline-connector">
        <div class="cn-timeline-dot">
          <span v-if="item.icon" v-html="item.icon" />
          <span v-else class="cn-timeline-dot-inner" />
        </div>
        <div v-if="index < items.length - 1" class="cn-timeline-line" />
      </div>
      <div class="cn-timeline-content">
        <div class="cn-timeline-header">
          <span class="cn-timeline-title">{{ item.title }}</span>
          <span v-if="item.timestamp" class="cn-timeline-timestamp">{{ item.timestamp }}</span>
        </div>
        <div v-if="item.description" class="cn-timeline-description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
});
</script>

<style scoped>
.cn-timeline { display: flex; flex-direction: column; }
.cn-timeline-item { display: flex; gap: 12px; padding-bottom: 24px; }
.cn-timeline-connector { display: flex; flex-direction: column; align-items: center; width: 24px; flex-shrink: 0; }
.cn-timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #2a2a2a; border: 2px solid #6b2323; z-index: 1; display: flex; align-items: center; justify-content: center; }
.cn-timeline-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: #6b2323; }
.cn-timeline-line { width: 2px; flex: 1; background: #2a2a2a; margin-top: 4px; }
.cn-timeline-item.success .cn-timeline-dot { border-color: #2a6b23; }
.cn-timeline-item.success .cn-timeline-dot-inner { background: #2a6b23; }
.cn-timeline-item.warning .cn-timeline-dot { border-color: #6b5a23; }
.cn-timeline-item.warning .cn-timeline-dot-inner { background: #6b5a23; }
.cn-timeline-item.error .cn-timeline-dot { border-color: #6b2323; }
.cn-timeline-item.error .cn-timeline-dot-inner { background: #6b2323; }
.cn-timeline-item.info .cn-timeline-dot { border-color: #23356b; }
.cn-timeline-item.info .cn-timeline-dot-inner { background: #23356b; }
.cn-timeline-content { flex: 1; }
.cn-timeline-header { display: flex; align-items: baseline; gap: 8px; }
.cn-timeline-title { font-size: 14px; font-weight: 600; color: #ccc; }
.cn-timeline-timestamp { font-size: 12px; color: #666; }
.cn-timeline-description { font-size: 13px; color: #888; margin-top: 4px; }
</style>
