<template>
  <div class="cn-tooltip">
    <slot />
    <div v-if="content" class="cn-tooltip-content" :style="positionStyle">
      {{ content }}
      <span class="cn-tooltip-arrow" :style="arrowStyle"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  content: { type: String, default: '' },
  position: { type: String, default: 'top' },
});

const positionStyles = {
  top: 'bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);',
  bottom: 'top: calc(100% + 8px); left: 50%; transform: translateX(-50%);',
  left: 'right: calc(100% + 8px); top: 50%; transform: translateY(-50%);',
  right: 'left: calc(100% + 8px); top: 50%; transform: translateY(-50%);',
};

const arrowStyles = {
  top: 'top: 100%; left: 50%; transform: translateX(-50%); border-top-color: #222222;',
  bottom: 'bottom: 100%; left: 50%; transform: translateX(-50%); border-bottom-color: #222222;',
  left: 'left: 100%; top: 50%; transform: translateY(-50%); border-left-color: #222222;',
  right: 'right: 100%; top: 50%; transform: translateY(-50%); border-right-color: #222222;',
};

const positionStyle = computed(() => positionStyles[props.position] || positionStyles.top);
const arrowStyle = computed(() => arrowStyles[props.position] || arrowStyles.top);
</script>

<style scoped>
.cn-tooltip {
  position: relative;
}
.cn-tooltip-content {
  position: absolute;
  padding: 8px 12px;
  background: #222222;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 11px;
  color: #f0ede8;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;
  z-index: 700;
}
.cn-tooltip:hover .cn-tooltip-content {
  opacity: 1;
  visibility: visible;
}
.cn-tooltip-arrow {
  content: '';
  position: absolute;
  border: 6px solid transparent;
}
</style>
