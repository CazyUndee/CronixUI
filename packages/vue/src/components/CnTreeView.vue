<template>
  <div class="cn-treeview" role="tree">
    <div v-for="node in nodes" :key="node.id" class="cn-tree-node">
      <div
        class="cn-tree-node-content"
        :class="{ 'cn-tree-node-selected': node.id === selectedId }"
        @click="$emit('select', node.id)"
      >
        <span v-if="node.children?.length" class="cn-tree-toggle">▼</span>
        <span v-else class="cn-tree-spacer"></span>
        <span class="cn-tree-label">{{ node.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nodes: { type: Array, default: () => [] },
  selectedId: { type: String, default: '' },
});
defineEmits(['select']);
</script>

<style scoped>
.cn-treeview { font-size: 14px; }
.cn-tree-node-content { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; cursor: pointer; color: #ccc; }
.cn-tree-node-content:hover { background: #1a1a1a; }
.cn-tree-node-selected { background: #2a1a1a; color: #c97a7a; }
.cn-tree-toggle { font-size: 10px; color: #888; width: 16px; text-align: center; }
.cn-tree-spacer { width: 16px; }
</style>
