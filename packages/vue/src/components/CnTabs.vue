<template>
  <div class="cn-tabs">
    <div class="cn-tabs-list">
      <button
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        type="button"
        class="cn-tab"
        :class="{ 'cn-tab-active': index === activeIndex }"
        @click="$emit('update:activeIndex', index); $emit('change', { activeIndex: index })"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
  <div class="cn-tab-content">
    <div
      v-for="(tab, index) in normalizedTabs"
      :key="index"
      class="cn-tab-panel"
      :class="{ 'cn-tab-panel-active': index === activeIndex }"
    >
      <slot v-if="!tab.content" />
      <template v-else>{{ tab.content }}</template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: 0 },
});

defineEmits(['update:activeIndex', 'change']);

const normalizedTabs = computed(() =>
  props.tabs.map(tab => typeof tab === 'string' ? { label: tab, content: null } : tab)
);
</script>

<style scoped>
.cn-tabs {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cn-tabs-list {
  display: flex;
  gap: 4px;
}
.cn-tab {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 12px 16px;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  background: transparent;
  color: rgba(240, 237, 232, 0.5);
  transition: all 0.15s ease;
  margin-bottom: -1px;
}
.cn-tab:hover {
  color: #f0ede8;
}
.cn-tab-active {
  color: #c97a7a;
  border-bottom-color: #6b2323;
}
.cn-tab-content {
  padding: 16px 0;
}
.cn-tab-panel {
  display: none;
}
.cn-tab-panel-active {
  display: block;
}
</style>
