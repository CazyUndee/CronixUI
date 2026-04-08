<template>
  <Teleport to="body">
    <div
      class="cn-command-palette"
      :class="{ 'cn-command-palette-open': open }"
      @click="handleBackdropClick"
      @keydown="handleKeydown"
    >
      <div class="cn-command-palette-inner">
        <input
          ref="inputEl"
          v-model="searchTerm"
          type="text"
          class="cn-command-palette-input"
          placeholder="Search commands..."
        />
        <div class="cn-command-palette-results">
          <div
            v-for="(item, index) in filteredItems"
            :key="index"
            class="cn-command-item"
            :class="{ 'cn-command-item-selected': index === selectedIndex }"
            @click="handleItemClick(item, index)"
            @mouseenter="selectedIndex = index"
          >
            <div>
              <div class="cn-command-item-title">{{ item.title }}</div>
              <div v-if="item.subtitle" class="cn-command-item-subtitle">{{ item.subtitle }}</div>
            </div>
            <div v-if="item.kbd" class="cn-command-item-kbd">{{ item.kbd }}</div>
          </div>
          <div v-if="filteredItems.length === 0" class="cn-command-empty">
            No results found
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
});

const emit = defineEmits(['close', 'select', 'update:open']);

const inputEl = ref(null);
const selectedIndex = ref(0);
const searchTerm = ref('');

const filteredItems = computed(() =>
  props.items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

watch(filteredItems, () => {
  selectedIndex.value = 0;
});

watch(() => props.open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputEl.value?.focus();
    });
  } else {
    searchTerm.value = '';
  }
});

function handleKeydown(event) {
  if (!props.open) return;
  if (event.key === 'Escape') {
    emit('close');
    emit('update:open', false);
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (event.key === 'Enter' && filteredItems.value[selectedIndex.value]) {
    emit('select', { item: filteredItems.value[selectedIndex.value], index: selectedIndex.value });
  }
}

function handleItemClick(item, index) {
  emit('select', { item, index });
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    emit('close');
    emit('update:open', false);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.cn-command-palette {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;
}
.cn-command-palette-open {
  opacity: 1;
  visibility: visible;
}
.cn-command-palette-inner {
  width: 100%;
  max-width: 560px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transform: scale(0.95);
  transition: transform 0.15s ease;
}
.cn-command-palette-open .cn-command-palette-inner {
  transform: scale(1);
}
.cn-command-palette-input {
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 16px;
  color: #f0ede8;
  outline: none;
  font-family: 'Outfit', sans-serif;
}
.cn-command-palette-input::placeholder {
  color: rgba(240, 237, 232, 0.4);
}
.cn-command-palette-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}
.cn-command-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.cn-command-item:hover,
.cn-command-item-selected {
  background: #1a1a1a;
}
.cn-command-item-title {
  font-size: 13px;
  color: #f0ede8;
  font-family: 'Outfit', sans-serif;
}
.cn-command-item-subtitle {
  font-size: 12px;
  color: rgba(240, 237, 232, 0.5);
  font-family: 'Outfit', sans-serif;
  margin-top: 2px;
}
.cn-command-item-kbd {
  margin-left: auto;
  font-size: 11px;
  padding: 4px 8px;
  background: #222222;
  border-radius: 6px;
  color: rgba(240, 237, 232, 0.5);
  font-family: 'Outfit', sans-serif;
}
.cn-command-empty {
  padding: 24px;
  text-align: center;
  color: rgba(240, 237, 232, 0.4);
  font-size: 13px;
  font-family: 'Outfit', sans-serif;
}
</style>
