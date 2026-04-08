<template>
  <div v-if="visible" :class="alertClasses">
    <div class="cn-alert-icon" :style="{ color: iconColors[variant] }" v-html="icons[variant]"></div>
    <div class="cn-alert-content">
      <div v-if="title" class="cn-alert-title">{{ title }}</div>
      <div v-if="message" class="cn-alert-message">{{ message }}</div>
      <slot />
    </div>
    <button v-if="dismissible" class="cn-alert-dismiss" @click="dismiss" aria-label="Dismiss">
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  variant: { type: String, default: 'info' },
  dismissible: { type: Boolean, default: false },
});

const emit = defineEmits(['dismiss']);

const visible = ref(true);

const icons = {
  info: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 14V9M10 6.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 10.5L9 13L13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 18H18L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14V11M10 8.5V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  error: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

const iconColors = {
  info: '#6ba8c4',
  success: '#6bc47a',
  warning: '#c4a43a',
  error: '#c46b6b',
};

const alertClasses = computed(() => ['cn-alert', `cn-alert-${props.variant}`]);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>

<style scoped>
.cn-alert {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.cn-alert-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.cn-alert-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
.cn-alert-content {
  flex: 1;
}
.cn-alert-title {
  font-weight: 500;
  color: #f0ede8;
  margin-bottom: 4px;
}
.cn-alert-message {
  font-size: 12px;
  color: rgba(240, 237, 232, 0.5);
}
.cn-alert-dismiss {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(240, 237, 232, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.cn-alert-dismiss:hover {
  color: #f0ede8;
}
.cn-alert-dismiss svg {
  width: 100%;
  height: 100%;
}
.cn-alert-info {
  background: rgba(20, 53, 80, 0.15);
  border-color: rgba(60, 140, 200, 0.4);
}
.cn-alert-success {
  background: rgba(30, 80, 40, 0.15);
  border-color: rgba(60, 140, 70, 0.4);
}
.cn-alert-warning {
  background: rgba(80, 60, 20, 0.15);
  border-color: rgba(150, 110, 30, 0.4);
}
.cn-alert-error {
  background: rgba(80, 20, 20, 0.15);
  border-color: rgba(180, 60, 60, 0.4);
}
</style>
