<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  size: { type: String, default: 'md' },
  error: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 4 }
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur']);

const textareaClasses = computed(() => {
  const classes = ['cn-input', 'cn-textarea'];
  if (props.size === 'sm') classes.push('cn-input-sm');
  if (props.size === 'lg') classes.push('cn-input-lg');
  if (props.error) classes.push('cn-input-error');
  return classes;
});

function onInput(event) {
  emit('update:modelValue', event.target.value);
  emit('input', event);
}
</script>

<template>
  <textarea
    :class="textareaClasses"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    @input="onInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<style scoped>
.cn-textarea {
  min-height: 100px;
  resize: vertical;
}
</style>
