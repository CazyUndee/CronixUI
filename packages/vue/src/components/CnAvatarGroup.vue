<template>
  <div class="cn-avatar-group">
    <div
      v-for="(child, i) in children"
      :key="i"
      class="cn-avatar-group-item"
    >
      <slot :name="`avatar-${i}`" />
    </div>
    <div v-if="remaining > 0" class="cn-avatar-group-overflow">
      +{{ remaining }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  max: { type: Number, default: 3 },
  count: { type: Number, default: 0 },
});

const children = computed(() => {
  return props.count > 0 ? Math.min(props.count, props.max) : props.max;
});

const remaining = computed(() => {
  return props.count > props.max ? props.count - props.max : 0;
});
</script>

<style scoped>
.cn-avatar-group { display: flex; align-items: center; }
.cn-avatar-group-item { margin-left: -8px; }
.cn-avatar-group-item:first-child { margin-left: 0; }
.cn-avatar-group-overflow {
  margin-left: -8px; width: 40px; height: 40px; border-radius: 50%;
  background: var(--cn-surface-3, #222); display: flex; align-items: center;
  justify-content: center; font-size: 12px; color: var(--cn-text-muted, #f0ede880);
  border: 2px solid var(--cn-bg, #0a0a0a);
}
</style>
