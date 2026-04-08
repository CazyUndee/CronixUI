<template>
  <span :class="badgeClasses">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  variant: { type: String, default: 'default' },
  solid: { type: Boolean, default: false },
});

const badgeClasses = computed(() => [
  'cn-badge',
  `cn-badge-${props.variant}`,
  props.solid && 'cn-badge-solid',
].filter(Boolean));
</script>

<style scoped>
.cn-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 9999px;
  border: 1px solid;
}
.cn-badge-default { background: #1a1a1a; border-color: rgba(255, 255, 255, 0.08); color: rgba(240, 237, 232, 0.5); }
.cn-badge-accent { background: rgba(107, 35, 35, 0.3); border-color: #6b2323; color: #c97a7a; }
.cn-badge-success { background: rgba(30, 80, 40, 0.3); border-color: rgba(60, 140, 70, 0.4); color: #6bc47a; }
.cn-badge-warning { background: rgba(80, 60, 20, 0.3); border-color: rgba(150, 110, 30, 0.4); color: #c4a43a; }
.cn-badge-error { background: rgba(80, 20, 20, 0.3); border-color: rgba(180, 60, 60, 0.4); color: #c46b6b; }
.cn-badge-info { background: rgba(20, 60, 100, 0.3); border-color: rgba(60, 140, 200, 0.4); color: #6ba8c4; }
.cn-badge-solid { border-color: transparent; }
.cn-badge-solid.cn-badge-accent { background: #6b2323; color: #f0ede8; }
.cn-badge-solid.cn-badge-success { background: #1e5028; color: #f0ede8; }
.cn-badge-solid.cn-badge-warning { background: #503c14; color: #f0ede8; }
.cn-badge-solid.cn-badge-error { background: #501414; color: #f0ede8; }
</style>
