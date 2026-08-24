<template>
  <button
    :class="['cn-copy-button', { 'cn-copy-success': copied, 'cn-copy-error': error }]"
    @click="handleCopy"
    :disabled="disabled || !text"
    :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
    :title="copied ? 'Copied!' : 'Copy'"
  >
    <span v-if="copied" class="cn-copy-icon">✓</span>
    <span v-else-if="error" class="cn-copy-icon">✕</span>
    <span v-else class="cn-copy-icon">⎘</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  text: String,
  disabled: Boolean
});

const emit = defineEmits(['copy', 'error']);

const copied = ref(false);
const error = ref(false);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.text || '');
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
    emit('copy');
  } catch (err) {
    error.value = true;
    setTimeout(() => { error.value = false; }, 2000);
    emit('error', err);
  }
};
</script>

<style scoped>
.cn-copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--cn-text-secondary);
  cursor: pointer;
  transition: all 150ms ease;
}

.cn-copy-button:hover:not(:disabled) {
  background: var(--cn-bg-hover);
  border-color: var(--cn-border-default);
}

.cn-copy-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cn-copy-icon {
  font-size: 14px;
}

.cn-copy-success {
  color: var(--cn-success);
}

.cn-copy-error {
  color: var(--cn-error);
}
</style>
