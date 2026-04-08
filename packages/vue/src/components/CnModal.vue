<template>
  <Teleport to="body">
    <div v-if="open" class="cn-modal-backdrop cn-modal-open" @click="handleBackdropClick">
      <div class="cn-modal" :style="{ maxWidth: sizeMap[size] || sizeMap.md }" role="dialog" aria-modal="true">
        <div v-if="title" class="cn-modal-header">
          <h2 class="cn-modal-title">{{ title }}</h2>
          <button class="cn-modal-close" @click="$emit('close')" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="cn-modal-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="cn-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md' },
});

const emit = defineEmits(['close']);

const sizeMap = {
  sm: '400px',
  md: '500px',
  lg: '700px',
  xl: '900px',
};

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    emit('close');
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && props.open) {
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.cn-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;
}
.cn-modal-backdrop.cn-modal-open {
  opacity: 1;
  visibility: visible;
}
.cn-modal {
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  width: 100%;
  max-height: calc(100vh - 48px);
  overflow: auto;
  transform: scale(0.95);
  transition: transform 0.15s ease;
  color: #f0ede8;
}
.cn-modal-backdrop.cn-modal-open .cn-modal {
  transform: scale(1);
}
.cn-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cn-modal-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.cn-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  color: rgba(240, 237, 232, 0.5);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease;
}
.cn-modal-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f0ede8;
}
.cn-modal-body {
  padding: 20px;
}
.cn-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
