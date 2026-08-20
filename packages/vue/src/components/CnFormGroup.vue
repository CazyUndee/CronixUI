<template>
  <div class="cn-form-group">
    <label v-if="label" class="cn-form-label">
      {{ label }}<span v-if="required" class="cn-required">*</span>
    </label>
    <slot />
    <div v-if="error" class="cn-form-error">{{ error }}</div>
    <div v-else-if="help" class="cn-form-help">{{ help }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
  required: { type: Boolean, default: false },
})
</script>
