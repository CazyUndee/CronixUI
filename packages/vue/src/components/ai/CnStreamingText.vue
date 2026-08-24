<template>
  <div class="cn-streaming-text" role="status" aria-live="polite" :aria-label="streaming ? 'Text is streaming' : 'Text display'">
    <div class="cn-streaming-content">
      <span class="cn-streaming-text">{{ displayText }}</span>
      <span v-if="streaming" class="cn-streaming-cursor" aria-hidden="true">|</span>
    </div>

    <div v-if="!streaming && displayText" class="cn-streaming-actions">
      <CnCopyButton :text="displayText" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import CnCopyButton from './CnCopyButton.vue';

const props = defineProps({
  text: { type: String, default: '' },
  stream: Boolean,
  speed: { type: Number, default: 20 }
});

const emit = defineEmits(['stream-end']);

const displayText = ref('');
const streaming = ref(false);
let interval = null;

const startStreaming = (fullText) => {
  streaming.value = true;
  displayText.value = '';
  
  let index = 0;
  
  interval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value = fullText.slice(0, index + 1);
      index++;
    } else {
      clearInterval(interval);
      streaming.value = false;
      emit('stream-end');
    }
  }, props.speed);
};

watch(() => props.text, (newText) => {
  if (props.stream && newText) {
    if (interval) clearInterval(interval);
    startStreaming(newText);
  } else {
    displayText.value = newText;
  }
});

onMounted(() => {
  if (props.stream && props.text) {
    startStreaming(props.text);
  } else {
    displayText.value = props.text;
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.cn-streaming-text {
  position: relative;
}

.cn-streaming-content {
  display: inline;
}

.cn-streaming-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--cn-text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.cn-streaming-cursor {
  display: inline-block;
  font-weight: 300;
  animation: cn-blink 1s step-end infinite;
  margin-left: 1px;
}

@keyframes cn-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cn-streaming-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 200ms ease;
}

.cn-streaming-text:hover .cn-streaming-actions {
  opacity: 1;
}
</style>
