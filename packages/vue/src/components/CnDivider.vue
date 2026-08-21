<template>
  <hr :class="dividerClasses" :style="dividerStyle" role="separator" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  orientation: { type: String, default: 'horizontal', validator: v => ['horizontal', 'vertical'].includes(v) },
});

const dividerClasses = computed(() => ['cn-divider']);

const dividerStyle = computed(() =>
  props.orientation === 'vertical'
    ? { width: '1px', height: 'auto', minHeight: '100%', borderRight: 'none', borderBottom: '1px solid var(--cn-border)' }
    : { height: '1px', border: 'none', backgroundColor: 'var(--cn-border)' }
);
</script>

<style scoped>
.cn-divider { width: 100%; }
</style>
