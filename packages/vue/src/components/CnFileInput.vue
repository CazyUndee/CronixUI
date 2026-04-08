<template>
  <div class="cn-file-input" :class="{ 'cn-file-input-disabled': disabled }">
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleChange"
    />
    <label class="cn-file-input-label">
      <svg class="cn-file-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <span class="cn-file-input-text">
        <span>Click to upload</span> or drag and drop
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['change']);

function handleChange(event) {
  const files = event.target.files;
  emit('change', {
    files: files,
    fileList: Array.from(files),
  });
}
</script>

<style scoped>
.cn-file-input {
  position: relative;
}
.cn-file-input input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.cn-file-input-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  background: #111111;
  border: 2px dashed rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: border-color 0.15s ease;
}
.cn-file-input:hover .cn-file-input-label {
  border-color: rgba(255, 255, 255, 0.15);
}
.cn-file-input-icon {
  width: 40px;
  height: 40px;
  color: rgba(240, 237, 232, 0.5);
}
.cn-file-input-text {
  font-size: 13px;
  color: rgba(240, 237, 232, 0.5);
}
.cn-file-input-text span {
  color: #c97a7a;
  text-decoration: underline;
}
.cn-file-input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cn-file-input-disabled input[type="file"] {
  cursor: not-allowed;
}
</style>
