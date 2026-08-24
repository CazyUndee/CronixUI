<template>
  <div 
    :class="['cn-message-bubble', role === 'user' ? 'cn-message-user' : 'cn-message-assistant']"
    role="article"
    :aria-label="`${role} message`"
  >
    <div v-if="avatar" class="cn-message-avatar">
      {{ avatar }}
    </div>

    <div class="cn-message-content">
      <div v-if="showHeader !== false" class="cn-message-header">
        <span class="cn-message-role">
          {{ role === 'user' ? 'You' : 'Assistant' }}
        </span>
        <span v-if="timestamp" class="cn-message-timestamp">
          {{ formatTimestamp(timestamp) }}
        </span>
      </div>

      <div class="cn-message-text">
        {{ content }}
      </div>

      <div v-if="status" class="cn-message-status">
        {{ statusIcon }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: String,
  avatar: String,
  status: String,
  showHeader: { type: Boolean, default: true }
});

const statusIcon = computed(() => {
  switch (props.status) {
    case 'sending': return '⏳';
    case 'sent': return '✓';
    case 'delivered': return '✓✓';
    case 'error': return '❌';
    default: return null;
  }
});

const formatTimestamp = (ts) => {
  if (!ts) return '';
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.cn-message-bubble {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  max-width: 80%;
}

.cn-message-user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.cn-message-assistant {
  margin-right: auto;
}

.cn-message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--cn-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}

.cn-message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cn-message-header {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--cn-text-secondary);
}

.cn-message-role {
  font-weight: 600;
  color: var(--cn-text-primary);
}

.cn-message-timestamp {
  color: var(--cn-text-tertiary);
}

.cn-message-text {
  padding: 12px 16px;
  border-radius: 16px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  line-height: 1.5;
  word-wrap: break-word;
}

.cn-message-user .cn-message-text {
  background: var(--cn-primary);
  color: white;
  border-color: var(--cn-primary);
}

.cn-message-status {
  font-size: 12px;
  color: var(--cn-text-tertiary);
  text-align: right;
}
</style>
