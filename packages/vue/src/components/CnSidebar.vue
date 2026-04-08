<template>
  <aside class="cn-sidebar">
    <div v-if="$slots.header" class="cn-sidebar-header">
      <slot name="header" />
    </div>
    <nav class="cn-sidebar-nav">
      <template v-for="(item, i) in items" :key="i">
        <a
          v-if="item.href"
          :href="item.href"
          class="cn-sidebar-item"
          :class="{ 'cn-sidebar-active': item.active }"
        >
          <span v-if="item.icon" class="cn-sidebar-icon">{{ item.icon }}</span>
          <span class="cn-sidebar-label">{{ item.label }}</span>
        </a>
        <button
          v-else
          class="cn-sidebar-item"
          :class="{ 'cn-sidebar-active': item.active }"
          @click="$emit('click', item)"
        >
          <span v-if="item.icon" class="cn-sidebar-icon">{{ item.icon }}</span>
          <span class="cn-sidebar-label">{{ item.label }}</span>
        </button>
      </template>
      <slot name="nav" />
    </nav>
    <div v-if="$slots.footer" class="cn-sidebar-footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
});

defineEmits(['click']);
</script>

<style scoped>
.cn-sidebar {
  width: 260px;
  height: 100vh;
  background: #111111;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
}
.cn-sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cn-sidebar-nav {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}
.cn-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  color: rgba(240, 237, 232, 0.5);
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  text-align: left;
}
.cn-sidebar-item:hover {
  background: #1a1a1a;
  color: #f0ede8;
}
.cn-sidebar-item.cn-sidebar-active {
  background: rgba(107, 35, 35, 0.3);
  color: #c97a7a;
}
.cn-sidebar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cn-sidebar-label {
  flex: 1;
}
.cn-sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
