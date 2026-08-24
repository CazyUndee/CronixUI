<template>
  <div class="cn-model-selector" @keydown.escape="isOpen = false">
    <button
      class="cn-model-selector-trigger"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      aria-label="Select model"
    >
      <span class="cn-model-name">{{ selected.name }}</span>
      <span class="cn-model-provider">{{ selected.provider }}</span>
      <span class="cn-model-arrow">▾</span>
    </button>

    <div v-if="isOpen" class="cn-model-dropdown" role="listbox">
      <div class="cn-model-search">
        <input
          v-model="search"
          type="text"
          placeholder="Search models..."
          aria-label="Search models"
        />
      </div>

      <div class="cn-model-list">
        <button
          v-for="model in filteredModels"
          :key="model.id"
          :class="['cn-model-option', { 'cn-model-selected': selected.id === model.id }]"
          role="option"
          :aria-selected="selected.id === model.id"
          @click="handleSelect(model)"
        >
          <div class="cn-model-option-name">{{ model.name }}</div>
          <div class="cn-model-option-details">
            <span class="cn-model-option-provider">{{ model.provider }}</span>
            <span class="cn-model-option-tokens">{{ model.maxTokens?.toLocaleString() }} tokens</span>
          </div>
        </button>

        <div v-if="filteredModels.length === 0" class="cn-model-empty">
          No models found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const DEFAULT_MODELS = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', maxTokens: 8192 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokens: 4096 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', maxTokens: 100000 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', maxTokens: 100000 },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', maxTokens: 8192 },
];

const props = defineProps({
  models: { type: Array, default: () => DEFAULT_MODELS },
  value: Object
});

const emit = defineEmits(['change']);

const isOpen = ref(false);
const search = ref('');

const selected = computed(() => props.value || props.models[0]);

const filteredModels = computed(() => {
  const q = search.value.toLowerCase();
  return props.models.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.provider.toLowerCase().includes(q)
  );
});

const handleSelect = (model) => {
  emit('change', model);
  isOpen.value = false;
  search.value = '';
};
</script>

<style scoped>
.cn-model-selector {
  position: relative;
}

.cn-model-selector-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  border-radius: 8px;
  cursor: pointer;
  min-width: 180px;
  text-align: left;
}

.cn-model-selector-trigger:hover {
  border-color: var(--cn-primary);
}

.cn-model-name {
  font-weight: 500;
  color: var(--cn-text-primary);
}

.cn-model-provider {
  font-size: 12px;
  color: var(--cn-text-tertiary);
}

.cn-model-arrow {
  margin-left: auto;
  color: var(--cn-text-secondary);
}

.cn-model-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--cn-bg-primary);
  border: 1px solid var(--cn-border-default);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.cn-model-search {
  padding: 8px;
  border-bottom: 1px solid var(--cn-border-default);
}

.cn-model-search input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--cn-border-default);
  border-radius: 4px;
  background: var(--cn-bg-secondary);
  color: var(--cn-text-primary);
}

.cn-model-list {
  max-height: 250px;
  overflow-y: auto;
}

.cn-model-option {
  width: 100%;
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid var(--cn-border-subtle);
  cursor: pointer;
}

.cn-model-option:hover {
  background: var(--cn-bg-hover);
}

.cn-model-option:last-child {
  border-bottom: none;
}

.cn-model-selected {
  background: var(--cn-primary-subtle);
}

.cn-model-option-name {
  font-weight: 500;
  color: var(--cn-text-primary);
}

.cn-model-option-details {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--cn-text-tertiary);
  margin-top: 4px;
}

.cn-model-empty {
  padding: 16px;
  text-align: center;
  color: var(--cn-text-tertiary);
}
</style>
