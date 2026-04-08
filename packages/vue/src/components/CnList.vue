<template>
  <div class="cn-list">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="cn-list-item"
      :class="{ 'cn-list-item-clickable': clickable }"
      @click="clickable && $emit('click', item)"
    >
      <div v-if="item.icon" class="cn-list-item-icon">
        <component :is="item.icon" />
      </div>
      <div class="cn-list-item-content">
        <div class="cn-list-item-title">{{ item.title }}</div>
        <div v-if="item.subtitle" class="cn-list-item-subtitle">{{ item.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  clickable: { type: Boolean, default: false },
});

defineEmits(['click']);
</script>

<style scoped>
.cn-list {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
}
.cn-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.15s ease;
}
.cn-list-item:last-child {
  border-bottom: none;
}
.cn-list-item:hover {
  background: #111111;
}
.cn-list-item-clickable {
  cursor: pointer;
}
.cn-list-item-icon {
  flex-shrink: 0;
}
.cn-list-item-content {
  flex: 1;
}
.cn-list-item-title {
  font-size: 13px;
  color: #f0ede8;
}
.cn-list-item-subtitle {
  font-size: 12px;
  color: rgba(240, 237, 232, 0.5);
}
</style>
