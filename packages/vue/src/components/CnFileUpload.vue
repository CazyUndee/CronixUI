<template>
  <div class="cn-fileupload" :class="{ 'cn-fileupload-dragging': isDragging }"
    @dragover.prevent="isDragging = true" @dragleave="isDragging = false"
    @drop.prevent="handleDrop" @click="$refs.input.click()">
    <div class="cn-fileupload-content">
      <div class="cn-fileupload-icon">📁</div>
      <div class="cn-fileupload-text">Drag & drop files here or click to browse</div>
    </div>
    <input ref="input" type="file" :accept="accept" :multiple="multiple" class="cn-fileupload-input" @change="handleChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
});
const emit = defineEmits(['files']);
const isDragging = ref(false);

function handleDrop(e) {
  isDragging.value = false;
  emit('files', Array.from(e.dataTransfer.files));
}
function handleChange(e) {
  emit('files', Array.from(e.target.files));
}
</script>

<style scoped>
.cn-fileupload { border: 2px dashed #2a2a2a; border-radius: 8px; padding: 32px; text-align: center; cursor: pointer; transition: border-color 0.15s; }
.cn-fileupload:hover, .cn-fileupload-dragging { border-color: #6b2323; background: #2a1a1a; }
.cn-fileupload-content { pointer-events: none; }
.cn-fileupload-icon { font-size: 32px; margin-bottom: 8px; }
.cn-fileupload-text { font-size: 13px; color: #888; }
.cn-fileupload-input { display: none; }
</style>
