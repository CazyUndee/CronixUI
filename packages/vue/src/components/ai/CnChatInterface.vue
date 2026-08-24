<template>
  <div class="cn-chat-interface" role="log" aria-label="Chat conversation" aria-live="polite">
    <div class="cn-chat-messages" ref="messagesContainer" role="list">
      <div v-for="message in messages" :key="message.id" role="listitem">
        <CnMessageBubble
          :role="message.role"
          :content="message.content"
          :timestamp="message.timestamp"
          :avatar="message.avatar"
          :status="message.status"
        />
      </div>
      <CnTypingIndicator v-if="isTyping" :avatar="assistantAvatar" />
      <div ref="messagesEnd" />
    </div>

    <div class="cn-chat-footer">
      <CnPromptInput
        @send="handleSend"
        :disabled="isTyping"
        :placeholder="placeholder || 'Type a message...'"
        :maxLength="maxInputLength"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import CnMessageBubble from './CnMessageBubble.vue';
import CnTypingIndicator from './CnTypingIndicator.vue';
import CnPromptInput from './CnPromptInput.vue';

const props = defineProps({
  messages: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Type a message...' },
  maxInputLength: Number,
  assistantAvatar: String
});

const emit = defineEmits(['send', 'error']);

const messagesContainer = ref(null);
const messagesEnd = ref(null);
const isTyping = ref(false);

const scrollToBottom = async () => {
  await nextTick();
  messagesEnd.value?.scrollIntoView({ behavior: 'smooth' });
};

const handleSend = (content) => {
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content,
    timestamp: new Date().toISOString()
  };
  isTyping.value = true;
  emit('send', userMessage);
  scrollToBottom();
};

const addAssistantMessage = (content) => {
  isTyping.value = false;
  scrollToBottom();
};

watch(() => props.messages, scrollToBottom, { deep: true });

onMounted(scrollToBottom);
</script>

<style scoped>
.cn-chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  background: var(--cn-bg-primary);
  border: 1px solid var(--cn-border-default);
  border-radius: 12px;
  overflow: hidden;
}

.cn-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cn-chat-footer {
  padding: 16px;
  border-top: 1px solid var(--cn-border-default);
  background: var(--cn-bg-secondary);
}
</style>
