<template>
  <Transition name="cn-notification">
    <div v-if="modelValue" class="cn-notification" :class="`cn-notification-${variant}`" role="alert">
      <div class="cn-notification-content">
        <div v-if="title" class="cn-notification-title">{{ title }}</div>
        <div class="cn-notification-message">{{ message }}</div>
      </div>
      <button class="cn-notification-close" @click="$emit('update:modelValue', false)">×</button>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  variant: { type: String, default: 'info' },
  title: { type: String, default: '' },
  message: { type: String, required: true },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.cn-notification { position: fixed; top: 16px; right: 16px; z-index: 9999; display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); min-width: 300px; }
.cn-notification-info { border-left: 3px solid #23356b; }
.cn-notification-success { border-left: 3px solid #2a6b23; }
.cn-notification-warning { border-left: 3px solid #6b5a23; }
.cn-notification-error { border-left: 3px solid #6b2323; }
.cn-notification-title { font-size: 13px; font-weight: 600; color: #ccc; }
.cn-notification-message { font-size: 13px; color: #888; }
.cn-notification-close { background: transparent; border: none; color: #888; font-size: 18px; cursor: pointer; }
.cn-notification-close:hover { color: #ccc; }
</style>
