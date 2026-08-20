<script>
  import { createEventDispatcher } from 'svelte';
  export let isOpen = false;
  export let title = '';
  export let side = 'right';
  export let size = 'md';
  const dispatch = createEventDispatcher();

  function handleClose() { dispatch('close'); }
</script>

{#if isOpen}
  <div class="cn-drawer-overlay" on:click={handleClose}>
    <div class="cn-drawer cn-drawer-{side} cn-drawer-{size}" on:click|stopPropagation>
      {#if title}
        <div class="cn-drawer-header">
          <h3 class="cn-drawer-title">{title}</h3>
          <button class="cn-drawer-close" on:click={handleClose}>×</button>
        </div>
      {/if}
      <div class="cn-drawer-body">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .cn-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; }
  .cn-drawer { background: #1a1a1a; border: 1px solid #2a2a2a; height: 100%; display: flex; flex-direction: column; }
  .cn-drawer-right { margin-left: auto; }
  .cn-drawer-left { margin-right: auto; }
  .cn-drawer-top { width: 100%; margin-bottom: auto; }
  .cn-drawer-bottom { width: 100%; margin-top: auto; }
  .cn-drawer-sm { width: 300px; }
  .cn-drawer-md { width: 400px; }
  .cn-drawer-lg { width: 600px; }
  .cn-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #2a2a2a; }
  .cn-drawer-title { margin: 0; font-size: 18px; color: #ccc; }
  .cn-drawer-close { background: transparent; border: none; color: #888; font-size: 24px; cursor: pointer; }
  .cn-drawer-close:hover { color: #ccc; }
  .cn-drawer-body { flex: 1; padding: 16px; overflow-y: auto; }
</style>
