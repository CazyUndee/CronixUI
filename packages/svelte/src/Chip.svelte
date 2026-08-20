<script>
  export let variant = 'default';
  export let size = 'md';
  export let selected = false;
  export let onRemove = null;
  export let onclick = () => {};
</script>

<span
  class="cn-chip cn-chip-{variant} cn-chip-{size}"
  class:cn-chip-selected={selected}
  on:click={onclick}
  role={onclick ? 'button' : undefined}
  tabindex={onclick ? 0 : undefined}
>
  <slot />
  {#if onRemove}
    <button class="cn-chip-remove" on:click|stopPropagation={onRemove} aria-label="Remove">×</button>
  {/if}
</span>

<style>
  .cn-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 16px; font-size: 14px; cursor: default; transition: all 0.15s; border: 1px solid #2a2a2a; color: #ccc; background: #1a1a1a; }
  .cn-chip-selected { background: #6b2323; border-color: #6b2323; color: #fff; }
  .cn-chip:hover { border-color: #6b2323; }
  .cn-chip-accent { border-color: #6b2323; color: #8b3a3a; }
  .cn-chip-success { border-color: #2a6b23; color: #4a8b4a; }
  .cn-chip-warning { border-color: #6b5a23; color: #8b7a4a; }
  .cn-chip-error { border-color: #6b2323; color: #8b3a3a; }
  .cn-chip-info { border-color: #23356b; color: #3a5a8b; }
  .cn-chip-sm { font-size: 12px; padding: 2px 8px; }
  .cn-chip-lg { font-size: 16px; padding: 6px 16px; }
  .cn-chip-remove { background: transparent; border: none; color: inherit; cursor: pointer; padding: 0; font-size: 16px; line-height: 1; }
</style>
