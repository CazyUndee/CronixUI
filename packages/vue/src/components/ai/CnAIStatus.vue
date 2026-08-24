<template>
  <div class="cn-ai-status" role="status" :aria-label="`AI status: ${statusConfig.label}`">
    <span class="cn-ai-status-icon" :style="{ color: statusConfig.color }">
      {{ statusConfig.icon }}
    </span>
    <span class="cn-ai-status-label">{{ statusConfig.label }}</span>

    <span v-if="latency !== undefined" class="cn-ai-status-latency">
      {{ latency }}ms
    </span>

    <span v-if="model" class="cn-ai-status-model">
      {{ model }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: { type: String, default: 'idle' },
  latency: Number,
  model: String
});

const statusConfig = computed(() => {
  switch (props.status) {
    case 'connected':
      return { label: 'Connected', color: 'var(--cn-success)', icon: '●' };
    case 'disconnected':
      return { label: 'Disconnected', color: 'var(--cn-error)', icon: '○' };
    case 'connecting':
      return { label: 'Connecting...', color: 'var(--cn-warning)', icon: '◐' };
    case 'error':
      return { label: 'Error', color: 'var(--cn-error)', icon: '✕' };
    case 'rate-limited':
      return { label: 'Rate limited', color: 'var(--cn-warning)', icon: '⏱' };
    case 'idle':
      return { label: 'Idle', color: 'var(--cn-text-tertiary)', icon: '◌' };
    default:
      return { label: 'Unknown', color: 'var(--cn-text-tertiary)', icon: '?' };
  }
});
</script>

<style scoped>
.cn-ai-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  border-radius: 8px;
  font-size: 13px;
}

.cn-ai-status-icon {
  font-size: 10px;
}

.cn-ai-status-label {
  color: var(--cn-text-primary);
  font-weight: 500;
}

.cn-ai-status-latency {
  color: var(--cn-text-tertiary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.cn-ai-status-model {
  color: var(--cn-text-secondary);
  font-size: 12px;
  padding-left: 8px;
  border-left: 1px solid var(--cn-border-default);
}
</style>
