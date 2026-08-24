<template>
  <div class="cn-prompt-input" role="form" aria-label="Message input">
    <div class="cn-prompt-input-wrapper">
      <div v-if="showAvatar" class="cn-prompt-avatar">
        {{ avatar || '👤' }}
      </div>

      <textarea
        ref="textareaRef"
        class="cn-prompt-textarea"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown="handleKeyDown"
        :placeholder="placeholder || 'Type a message...'"
        :disabled="disabled"
        :rows="rows || 1"
        :maxlength="maxLength"
        aria-label="Message input"
      />

      <div v-if="showActions !== false" class="cn-prompt-actions">
        <span v-if="maxLength" class="cn-prompt-char-count">
          {{ modelValue?.length || 0 }}/{{ maxLength }}
        </span>
        <button
          class="cn-prompt-send"
          @click="handleSubmit"
          :disabled="!modelValue?.trim() || disabled"
          aria-label="Send message"
        >
          {{ sendIcon || '↑' }}
        </button>
      </div>
    </div>

    <div v-if="helperText" class="cn-prompt-helper">
      {{ helperText }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Type a message...' },
  disabled: Boolean,
  rows: { type: Number, default: 1 },
  maxLength: Number,
  showAvatar: Boolean,
  avatar: String,
  showActions: { type: Boolean, default: true },
  sendIcon: { type: String, default: '↑' },
  helperText: String,
  autoFocus: Boolean,
  multiline: Boolean,
  maxHeight: { type: Number, default: 200 }
});

const emit = defineEmits(['update:modelValue', 'send', 'change']);

const textareaRef = ref(null);

const handleSubmit = () => {
  const trimmed = (props.modelValue || '').trim();
  if (!trimmed || props.disabled) return;
  emit('send', trimmed);
  if (!props.multiline) {
    emit('update:modelValue', '');
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !props.multiline) {
    e.preventDefault();
    handleSubmit();
  }
};

onMounted(() => {
  if (props.autoFocus) {
    textareaRef.value?.focus();
  }
});
</script>

<style scoped>
.cn-prompt-input {
  width: 100%;
}

.cn-prompt-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  background: var(--cn-bg-primary);
  border: 1px solid var(--cn-border-default);
  border-radius: 12px;
  transition: border-color 200ms ease;
}

.cn-prompt-input-wrapper:focus-within {
  border-color: var(--cn-primary);
  box-shadow: 0 0 0 3px var(--cn-primary-subtle);
}

.cn-prompt-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--cn-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cn-prompt-textarea {
  flex: 1;
  resize: none;
  border: none;
  background: transparent;
  font-size: 14px;
  line-height: 1.5;
  color: var(--cn-text-primary);
  outline: none;
  min-height: 24px;
  max-height: 200px;
  font-family: inherit;
}

.cn-prompt-textarea::placeholder {
  color: var(--cn-text-tertiary);
}

.cn-prompt-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cn-prompt-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.cn-prompt-char-count {
  font-size: 12px;
  color: var(--cn-text-tertiary);
}

.cn-prompt-send {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--cn-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 200ms ease, transform 100ms ease;
}

.cn-prompt-send:hover:not(:disabled) {
  background: var(--cn-primary-hover);
  transform: scale(1.05);
}

.cn-prompt-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cn-prompt-helper {
  margin-top: 4px;
  font-size: 12px;
  color: var(--cn-text-tertiary);
  padding: 0 12px;
}
</style>
