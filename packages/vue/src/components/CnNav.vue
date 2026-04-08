<template>
  <nav class="cn-nav">
    <template v-for="(item, index) in items" :key="index">
      <a
        v-if="getHref(item)"
        :href="getHref(item)"
        class="cn-nav-item"
        :class="{ 'cn-nav-active': index === activeIndex }"
        @click="$emit('change', { index, item })"
      >
        {{ getLabel(item) }}
      </a>
      <button
        v-else
        class="cn-nav-item"
        :class="{ 'cn-nav-active': index === activeIndex }"
        @click="$emit('change', { index, item }); $emit('update:activeIndex', index)"
      >
        {{ getLabel(item) }}
      </button>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: 0 },
});

defineEmits(['change', 'update:activeIndex']);

function getLabel(item) {
  return typeof item === 'string' ? item : item.label;
}

function getHref(item) {
  return typeof item === 'string' ? null : item.href;
}
</script>

<style scoped>
.cn-nav {
  display: flex;
  gap: 4px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
}
.cn-nav-item {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: rgba(240, 237, 232, 0.5);
  transition: all 0.15s ease;
  text-decoration: none;
  display: inline-block;
}
.cn-nav-item:hover:not(.cn-nav-active) {
  color: #f0ede8;
}
.cn-nav-active {
  background: #222222;
  color: #f0ede8;
}
</style>
