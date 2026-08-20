<script>
  export let placement = 'bottom';
  export let open = false;
  export let onToggle = null;
</script>

<div class="cn-popover-wrapper cn-popover-{placement}">
  <div class="cn-popover-trigger" on:click={() => { open = !open; if (onToggle) onToggle(open); }}>
    <slot name="trigger" />
  </div>
  {#if open}
    <div class="cn-popover-content">
      <slot />
    </div>
  {/if}
</div>

<style>
  .cn-popover-wrapper { position: relative; display: inline-block; }
  .cn-popover-content { position: absolute; z-index: 1000; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); min-width: 200px; }
  .cn-popover-bottom { top: 100%; left: 0; margin-top: 4px; }
  .cn-popover-top { bottom: 100%; left: 0; margin-bottom: 4px; }
  .cn-popover-left { right: 100%; top: 0; margin-right: 4px; }
  .cn-popover-right { left: 100%; top: 0; margin-left: 4px; }
</style>
