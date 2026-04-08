<template>
  <div class="cn-dropdown" :class="{ 'cn-dropdown-open': isOpen }" ref="dropdownEl">
    <slot :isOpen="isOpen" :open="open" :close="close" :toggle="toggle">
      <button type="button" class="cn-dropdown-trigger" @click="toggle">
        {{ modelValue || 'Select...' }}
      </button>
    </slot>
    <div class="cn-dropdown-menu">
      <template v-for="(item, i) in items" :key="i">
        <div v-if="item && item.divider" class="cn-dropdown-divider"></div>
        <div
          v-else
          class="cn-dropdown-item"
          :class="{ 'cn-dropdown-item-active': getLabel(item) === modelValue }"
          @click="handleSelect(item)"
        >
          <span v-if="getItem(item).icon" class="cn-dropdown-item-icon">{{ getItem(item).icon }}</span>
          <span class="cn-dropdown-item-label">{{ getLabel(item) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'select']);

const isOpen = ref(false);
const dropdownEl = ref(null);

function toggle() {
  isOpen.value = !isOpen.value;
}

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function getItem(item) {
  return typeof item === 'object' ? item : { value: item, label: item };
}

function getLabel(item) {
  return typeof item === 'object' ? item.label : item;
}

function handleSelect(item) {
  const value = getLabel(item);
  emit('update:modelValue', value);
  emit('select', { value, label: value, item: getItem(item) });
  close();
}

function handleClickOutside(event) {
  if (dropdownEl.value && !dropdownEl.value.contains(event.target)) {
    close();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.cn-dropdown {
  position: relative;
  display: inline-block;
}
.cn-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.15s ease;
}
.cn-dropdown.cn-dropdown-open .cn-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(4px);
}
.cn-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  font-size: 13px;
  color: #f0ede8;
  cursor: pointer;
  transition: background 0.15s ease;
}
.cn-dropdown-item:hover {
  background: #1a1a1a;
}
.cn-dropdown-item:first-child {
  border-radius: 10px 10px 0 0;
}
.cn-dropdown-item:last-child {
  border-radius: 0 0 10px 10px;
}
.cn-dropdown-item-active {
  background: rgba(255, 255, 255, 0.05);
}
.cn-dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 8px 0;
}
.cn-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 13px;
  color: #f0ede8;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.cn-dropdown-trigger:hover {
  background: #1a1a1a;
  border-color: rgba(255, 255, 255, 0.12);
}
</style>
