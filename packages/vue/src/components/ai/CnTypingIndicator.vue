<template>
  <div class="cn-typing-indicator" role="status" aria-label="Assistant is typing" aria-live="polite">
    <div v-if="avatar" class="cn-typing-avatar">
      {{ avatar }}
    </div>

    <div class="cn-typing-content">
      <span class="cn-typing-role">Assistant</span>
      <div class="cn-typing-dots">
        <span class="cn-typing-dot" style="animation-delay: 0ms" />
        <span class="cn-typing-dot" style="animation-delay: 150ms" />
        <span class="cn-typing-dot" style="animation-delay: 300ms" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  avatar: String
});
</script>

<style scoped>
.cn-typing-indicator {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  align-items: flex-start;
}

.cn-typing-avatar {
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

.cn-typing-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cn-typing-role {
  font-size: 12px;
  font-weight: 600;
  color: var(--cn-text-primary);
}

.cn-typing-dots {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  border-radius: 16px;
}

.cn-typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cn-text-secondary);
  animation: cn-typing-bounce 1.4s infinite ease-in-out both;
}

@keyframes cn-typing-bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
