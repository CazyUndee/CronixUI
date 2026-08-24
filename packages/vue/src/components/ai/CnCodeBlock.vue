<template>
  <div class="cn-code-block" role="region" :aria-label="`Code block: ${language || 'code'}`">
    <div class="cn-code-header">
      <div class="cn-code-header-left">
        <span v-if="language" class="cn-code-language">{{ language }}</span>
        <span v-if="filename" class="cn-code-filename">{{ filename }}</span>
      </div>

      <div class="cn-code-header-right">
        <button
          v-if="lineCount > 10"
          class="cn-code-toggle"
          @click="isExpanded = !isExpanded"
          :aria-expanded="isExpanded"
        >
          {{ isExpanded ? 'Collapse' : 'Expand' }}
        </button>
        <CnCopyButton :text="code" />
      </div>
    </div>

    <div :class="['cn-code-content', { 'cn-code-collapsed': !isExpanded }]">
      <div v-if="lineNumbers" class="cn-code-with-lines">
        <div class="cn-code-line-numbers" aria-hidden="true">
          <span v-for="(_, i) in lines" :key="i">{{ i + 1 }}</span>
        </div>
        <pre class="cn-code-pre"><code v-html="highlightedCode" /></pre>
      </div>
      <pre v-else class="cn-code-pre"><code v-html="highlightedCode" /></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CnCopyButton from './CnCopyButton.vue';

const props = defineProps({
  code: { type: String, required: true },
  language: String,
  filename: String,
  lineNumbers: { type: Boolean, default: true },
  defaultExpanded: { type: Boolean, default: true }
});

const isExpanded = ref(props.defaultExpanded);

const lines = computed(() => (props.code || '').split('\n'));
const lineCount = computed(() => lines.value.length);

const highlightedCode = computed(() => {
  if (!props.language) return escapeHtml(props.code);
  return highlightSyntax(props.code, props.language);
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightSyntax(code, language) {
  const keywords = {
    javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'],
    typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'interface', 'type'],
    python: ['def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'import', 'from', 'async', 'await', 'with', 'as'],
    rust: ['fn', 'let', 'mut', 'pub', 'struct', 'enum', 'impl', 'trait', 'use', 'return', 'if', 'else', 'match', 'for', 'while', 'loop', 'async', 'await'],
    go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'package', 'import'],
  };

  const lang = language?.toLowerCase() || '';
  const keywordsList = keywords[lang] || keywords.javascript;

  let highlighted = escapeHtml(code);

  highlighted = highlighted.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm,
    '<span style="color: #6a9955">$1</span>'
  );

  highlighted = highlighted.replace(
    /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
    '<span style="color: #ce9178">$1</span>'
  );

  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span style="color: #b5cea8">$1</span>'
  );

  keywordsList.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span style="color: #569cd6">$1</span>');
  });

  return highlighted;
}
</script>

<style scoped>
.cn-code-block {
  border: 1px solid var(--cn-border-default);
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

.cn-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #2d2d2d;
  border-bottom: 1px solid #404040;
}

.cn-code-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cn-code-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cn-code-language {
  font-size: 12px;
  font-weight: 600;
  color: #909090;
  text-transform: uppercase;
}

.cn-code-filename {
  font-size: 12px;
  color: #b0b0b0;
}

.cn-code-toggle {
  padding: 4px 8px;
  font-size: 12px;
  background: #3d3d3d;
  border: 1px solid #505050;
  border-radius: 4px;
  color: #d0d0d0;
  cursor: pointer;
}

.cn-code-toggle:hover {
  background: #4d4d4d;
}

.cn-code-content {
  overflow-x: auto;
}

.cn-code-collapsed {
  max-height: 300px;
  overflow: hidden;
}

.cn-code-with-lines {
  display: flex;
}

.cn-code-line-numbers {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  min-width: 40px;
  background: #252526;
  border-right: 1px solid #404040;
  text-align: right;
  user-select: none;
}

.cn-code-line-numbers span {
  padding: 0 8px;
  font-size: 12px;
  line-height: 1.5;
  color: #858585;
}

.cn-code-pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.cn-code-pre code {
  font-size: 13px;
  line-height: 1.5;
  color: #d4d4d4;
}
</style>
