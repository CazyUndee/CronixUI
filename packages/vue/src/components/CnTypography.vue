<template>
  <div class="cn-typography">
    <h1 v-if="level === 1" :class="textClass"><slot>{{ text }}</slot></h1>
    <h2 v-else-if="level === 2" :class="textClass"><slot>{{ text }}</slot></h2>
    <h3 v-else-if="level === 3" :class="textClass"><slot>{{ text }}</slot></h3>
    <h4 v-else-if="level === 4" :class="textClass"><slot>{{ text }}</slot></h4>
    <h5 v-else-if="level === 5" :class="textClass"><slot>{{ text }}</slot></h5>
    <h6 v-else-if="level === 6" :class="textClass"><slot>{{ text }}</slot></h6>
    <p v-else-if="variant === 'text'" :class="textClass"><slot>{{ text }}</slot></p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: { type: Number, default: 0, validator: v => [0,1,2,3,4,5,6].includes(v) },
  text: { type: String, default: '' },
  variant: { type: String, default: 'default' },
})

const textClass = computed(() => {
  const classes = []
  if (props.level) classes.push(`cn-h${props.level}`)
  if (props.variant === 'muted') classes.push('cn-text-muted')
  if (props.variant === 'dim') classes.push('cn-text-dim')
  if (props.variant === 'accent') classes.push('cn-text-accent')
  if (props.variant === 'mono') classes.push('cn-text-mono')
  return classes.join(' ')
})
</script>
