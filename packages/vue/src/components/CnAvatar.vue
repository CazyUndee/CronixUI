<template>
  <div :class="avatarClasses">
    <img v-if="src" :src="src" :alt="initials" />
    <template v-else>{{ initials }}</template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  initials: { type: String, default: '' },
  src: { type: String, default: '' },
  size: { type: String, default: 'md' },
});

const avatarClasses = computed(() => [
  'cn-avatar',
  props.size !== 'md' && `cn-avatar-${props.size}`,
].filter(Boolean));
</script>

<style scoped>
.cn-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6b2323;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #f0ede8;
  overflow: hidden;
}
.cn-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cn-avatar-sm {
  width: 32px;
  height: 32px;
  font-size: 11px;
}
.cn-avatar-lg {
  width: 48px;
  height: 48px;
  font-size: 13px;
}
.cn-avatar-xl {
  width: 64px;
  height: 64px;
  font-size: 16px;
}
</style>
