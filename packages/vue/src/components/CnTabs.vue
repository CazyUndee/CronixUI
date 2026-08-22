<template>
  <div class="cn-tabs">
    <div class="cn-tabs-list" role="tablist">
      <button
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        type="button"
        class="cn-tab"
        :class="{ 'cn-tab-active': index === activeIndex }"
        role="tab"
        :aria-selected="index === activeIndex"
        :aria-controls="`cn-tabpanel-${index}`"
        :id="`cn-tab-${index}`"
        :tabindex="index === activeIndex ? 0 : -1"
        @click="$emit('update:activeIndex', index); $emit('change', { activeIndex: index })"
        @keydown="handleKeydown($event, index)"
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
      role="tabpanel"
      :id="`cn-tabpanel-${index}`"
      :aria-labelledby="`cn-tab-${index}`"
      :hidden="index !== activeIndex"
      :tabindex="index === activeIndex ? 0 : -1"
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

const emit = defineEmits(['update:activeIndex', 'change']);

const normalizedTabs = computed(() =>
  props.tabs.map(tab => typeof tab === 'string' ? { label: tab, content: null } : tab)
);

function handleKeydown(event, index) {
  const len = normalizedTabs.value.length;
  let nextIndex = index;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      nextIndex = (index + 1) % len;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      nextIndex = (index - 1 + len) % len;
      break;
    case 'Home':
      event.preventDefault();
      nextIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      nextIndex = len - 1;
      break;
    default:
      return;
  }
  emit('update:activeIndex', nextIndex);
  emit('change', { activeIndex: nextIndex });
}
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
  outline: none;
}
.cn-tab:focus-visible {
  box-shadow: inset 0 0 0 2px #6b2323;
  border-radius: 4px 4px 0 0;
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
