<script>
  export let nodes = [];
  export let selectedId = '';
  export let onSelect = () => {};
</script>

<div class="cn-treeview" role="tree">
  {#each nodes as node}
    <svelte:self {node} level={0} {selectedId} {onSelect} />
  {/each}
</div>

<script context="module">
</script>

{#if node}
  <div class="cn-tree-node">
    <div
      class="cn-tree-node-content"
      class:cn-tree-node-selected={node.id === selectedId}
      on:click={() => onSelect(node.id)}
    >
      {#if node.children?.length}
        <span class="cn-tree-toggle" on:click|stopPropagation={() => {}}>▼</span>
      {:else}
        <span class="cn-tree-spacer"></span>
      {/if}
      <span class="cn-tree-label">{node.label}</span>
    </div>
  </div>
{/if}

<style>
  .cn-treeview { font-size: 14px; }
  .cn-tree-node-content { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; cursor: pointer; color: #ccc; }
  .cn-tree-node-content:hover { background: #1a1a1a; }
  .cn-tree-node-selected { background: #2a1a1a; color: #c97a7a; }
  .cn-tree-toggle { font-size: 10px; color: #888; width: 16px; text-align: center; cursor: pointer; }
  .cn-tree-spacer { width: 16px; }
</style>
