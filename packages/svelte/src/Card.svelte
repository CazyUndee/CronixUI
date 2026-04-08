<script>
  export let title = '';
  export let subtitle = '';
  export let clickable = false;
</script>

<div class="cn-card" class:cn-card-clickable={clickable}>
  {#if title || subtitle}
    <div class="cn-card-header">
      {#if title}<h3 class="cn-card-title">{title}</h3>{/if}
      {#if subtitle}<p class="cn-card-subtitle">{subtitle}</p>{/if}
    </div>
  {/if}
  <div class="cn-card-body">
    <slot />
  </div>
  {#if $$slots.footer}
    <div class="cn-card-footer">
      <slot name="footer" />
    </div>
  {/if}
</div>

<style>
  .cn-card {
    background: #111111;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 20px;
    transition: border-color 0.15s ease;
  }
  .cn-card:hover { border-color: rgba(255, 255, 255, 0.15); }
  .cn-card-clickable { cursor: pointer; }
  .cn-card-clickable:hover { background: #1a1a1a; }
  .cn-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .cn-card-title { font-size: 14px; font-weight: 500; color: #f0ede8; }
  .cn-card-subtitle { font-size: 12px; color: rgba(240, 237, 232, 0.5); margin-top: 4px; }
  .cn-card-body { color: rgba(240, 237, 232, 0.5); }
  .cn-card-footer { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
</style>
