<template>
  <div v-if="references.length > 0" :class="['cn-rag-reference', className]">
    <button
      v-if="expandable"
      class="cn-rag-toggle"
      @click="isExpanded = !isExpanded"
      :aria-expanded="isExpanded"
    >
      📚 Sources ({{ references.length }})
      <span class="cn-rag-chevron">{{ isExpanded ? '▲' : '▼' }}</span>
    </button>

    <div v-if="isExpanded" class="cn-rag-list">
      <div v-for="ref in references" :key="ref.id" class="cn-rag-item">
        <div class="cn-rag-item-header">
          <span class="cn-rag-item-title">{{ ref.title }}</span>
          <span class="cn-rag-item-source">{{ ref.source }}</span>
          <span v-if="ref.score !== undefined" class="cn-rag-item-score">
            {{ Math.round(ref.score * 100) }}% match
          </span>
        </div>
        <div class="cn-rag-item-snippet">{{ ref.snippet }}</div>
        <a
          v-if="ref.url"
          class="cn-rag-item-link"
          :href="ref.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source →
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CnRAGReference',
  props: {
    references: {
      type: Array,
      default: () => []
    },
    expandable: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isExpanded: !this.expandable
    };
  }
};
</script>
