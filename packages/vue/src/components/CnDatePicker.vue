<template>
  <div class="cn-datepicker">
    <input
      type="date"
      class="cn-datepicker-input"
      :value="modelValue"
      :min="minDate"
      :max="maxDate"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  minDate: { type: String, default: '' },
  maxDate: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.cn-datepicker { display: inline-block; }
.cn-datepicker-input { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 8px 12px; color: #ccc; font-size: 14px; outline: none; }
.cn-datepicker-input:focus { border-color: #6b2323; }
</style>
