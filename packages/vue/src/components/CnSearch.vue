<template>
  <div class="cn-search" :class="{ 'cn-search-open': open }">
    <svg class="cn-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
    <input
      type="text"
      class="cn-search-input"
      :placeholder="placeholder"
      v-model="query"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <div v-if="open && filteredItems.length > 0" class="cn-search-results">
      <div
        v-for="(item, i) in filteredItems"
        :key="i"
        class="cn-search-result"
        :class="{ 'cn-search-result-selected': i === selectedIndex }"
        @click="selectItem(item)"
      >
        <div class="cn-search-result-title">{{ item.title }}</div>
        <div v-if="item.subtitle" class="cn-search-result-subtitle">{{ item.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  placeholder: { type: String, default: 'Search...' },
  items: { type: Array, default: () => [] },
});

const emit = defineEmits(['select']);

const query = ref('');
const open = ref(false);
const selectedIndex = ref(-1);

const filteredItems = computed(() =>
  props.items.filter(item =>
    item.title.toLowerCase().includes(query.value.toLowerCase()) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(query.value.toLowerCase()))
  )
);

function handleInput() {
  open.value = filteredItems.value.length > 0 && query.value.length > 0;
  selectedIndex.value = -1;
}

function handleFocus() {
  if (filteredItems.value.length > 0 && query.value.length > 0) {
    open.value = true;
  }
}

function handleBlur() {
  setTimeout(() => {
    open.value = false;
    selectedIndex.value = -1;
  }, 150);
}

function handleKeydown(event) {
  if (!open.value) return;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (event.key === 'Enter' && selectedIndex.value >= 0) {
    event.preventDefault();
    selectItem(filteredItems.value[selectedIndex.value]);
  } else if (event.key === 'Escape') {
    open.value = false;
    selectedIndex.value = -1;
  }
}

function selectItem(item) {
  emit('select', item);
  query.value = '';
  open.value = false;
  selectedIndex.value = -1;
}
</script>

<style scoped>
.cn-search {
  position: relative;
}
.cn-search-input {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 12px;
  padding-left: 40px;
  padding-right: 40px;
  color: #f0ede8;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
}
.cn-search-input:hover {
  border-color: rgba(255, 255, 255, 0.15);
}
.cn-search-input:focus {
  border-color: #6b2323;
  box-shadow: 0 0 0 3px rgba(107, 35, 35, 0.3);
}
.cn-search-input::placeholder {
  color: rgba(240, 237, 232, 0.25);
}
.cn-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(240, 237, 232, 0.5);
  pointer-events: none;
}
.cn-search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
}
.cn-search-result {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.cn-search-result:hover,
.cn-search-result-selected {
  background: #1a1a1a;
}
.cn-search-result-title {
  font-size: 13px;
  color: #f0ede8;
}
.cn-search-result-subtitle {
  font-size: 12px;
  color: rgba(240, 237, 232, 0.5);
  margin-top: 2px;
}
</style>
