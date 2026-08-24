<template>
  <div :class="['cn-token-counter', `cn-token-${status}`]" role="status" :aria-label="`${formattedCount} tokens used`">
    <div class="cn-token-info">
      <span class="cn-token-label">Tokens</span>
      <span class="cn-token-count">{{ formattedCount }}</span>
      <span v-if="maxTokens" class="cn-token-max">/ {{ formatCount(maxTokens) }}</span>
    </div>

    <div v-if="maxTokens" class="cn-token-bar">
      <div class="cn-token-bar-fill" :style="{ width: `${percentage}%` }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  count: { type: Number, required: true },
  maxTokens: Number
});

const percentage = computed(() => {
  if (!props.maxTokens) return 0;
  return Math.min(100, (props.count / props.maxTokens) * 100);
});

const status = computed(() => {
  const pct = percentage.value;
  if (pct >= 90) return 'danger';
  if (pct >= 70) return 'warning';
  return 'normal';
});

const formatCount = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const formattedCount = computed(() => formatCount(props.count));
</script>

<style scoped>
.cn-token-counter {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
}

.cn-token-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.cn-token-label {
  color: var(--cn-text-secondary);
  font-weight: 500;
}

.cn-token-count {
  color: var(--cn-text-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.cn-token-max {
  color: var(--cn-text-tertiary);
  font-size: 12px;
}

.cn-token-bar {
  height: 4px;
  background: var(--cn-bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.cn-token-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 200ms ease;
}

.cn-token-normal .cn-token-bar-fill {
  background: var(--cn-primary);
}

.cn-token-warning .cn-token-bar-fill {
  background: var(--cn-warning);
}

.cn-token-warning .cn-token-count {
  color: var(--cn-warning);
}

.cn-token-danger .cn-token-bar-fill {
  background: var(--cn-error);
}

.cn-token-danger .cn-token-count {
  color: var(--cn-error);
}
</style>
