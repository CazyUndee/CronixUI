<template>
  <div v-if="isOpen" class="cn-drawer-overlay" @click="$emit('close')">
    <div class="cn-drawer" :class="[`cn-drawer-${side}`, `cn-drawer-${size}`]" @click.stop>
      <div v-if="title" class="cn-drawer-header">
        <h3 class="cn-drawer-title">{{ title }}</h3>
        <button class="cn-drawer-close" @click="$emit('close')">×</button>
      </div>
      <div class="cn-drawer-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: '' },
  side: { type: String, default: 'right' },
  size: { type: String, default: 'md' },
});
defineEmits(['close']);
</script>

<style scoped>
.cn-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; }
.cn-drawer { background: #1a1a1a; border: 1px solid #2a2a2a; height: 100%; display: flex; flex-direction: column; }
.cn-drawer-right { margin-left: auto; }
.cn-drawer-left { margin-right: auto; }
.cn-drawer-top { width: 100%; margin-bottom: auto; }
.cn-drawer-bottom { width: 100%; margin-top: auto; }
.cn-drawer-sm { width: 300px; }
.cn-drawer-md { width: 400px; }
.cn-drawer-lg { width: 600px; }
.cn-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #2a2a2a; }
.cn-drawer-title { margin: 0; font-size: 18px; color: #ccc; }
.cn-drawer-close { background: transparent; border: none; color: #888; font-size: 24px; cursor: pointer; }
.cn-drawer-body { flex: 1; padding: 16px; overflow-y: auto; }
</style>
