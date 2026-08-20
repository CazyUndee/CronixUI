<template>
  <div class="cn-popover-wrapper" :class="`cn-popover-${placement}`">
    <div class="cn-popover-trigger" @click="toggle">
      <slot name="trigger" />
    </div>
    <div v-if="isOpen" class="cn-popover-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  placement: { type: String, default: 'bottom' },
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const internalOpen = ref(false);
const isOpen = computed(() => props.modelValue !== undefined ? props.modelValue : internalOpen.value);

function toggle() {
  const newVal = !isOpen.value;
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newVal);
  } else {
    internalOpen.value = newVal;
  }
}
</script>

<style scoped>
.cn-popover-wrapper { position: relative; display: inline-block; }
.cn-popover-content { position: absolute; z-index: 1000; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); min-width: 200px; }
.cn-popover-bottom { top: 100%; left: 0; margin-top: 4px; }
.cn-popover-top { bottom: 100%; left: 0; margin-bottom: 4px; }
.cn-popover-left { right: 100%; top: 0; margin-right: 4px; }
.cn-popover-right { left: 100%; top: 0; margin-left: 4px; }
</style>
