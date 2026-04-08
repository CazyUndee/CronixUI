<template>
  <nav class="cn-breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <span v-if="i > 0" class="cn-breadcrumb-separator">{{ separator }}</span>
      <span v-if="i === items.length - 1" class="cn-breadcrumb-current">{{ item.label }}</span>
      <a v-else :href="item.href" class="cn-breadcrumb-item">{{ item.label }}</a>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  separator: { type: String, default: '/' },
});
</script>

<style scoped>
.cn-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.cn-breadcrumb-item {
  color: rgba(240, 237, 232, 0.5);
  text-decoration: none;
  transition: color 0.15s ease;
}
.cn-breadcrumb-item:hover {
  color: #f0ede8;
}
.cn-breadcrumb-separator {
  color: rgba(240, 237, 232, 0.25);
}
.cn-breadcrumb-current {
  color: #f0ede8;
}
</style>
