<template>
  <div :class="`cn-stack cn-stack-${spacing}`">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  spacing: { type: String, default: '4', validator: v => ['1','2','4','6'].includes(v) },
})
</script>
