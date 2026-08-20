<script>
  export let icon = '';
  export let title = '';
  export let description = '';
</script>

<div class="cn-empty-state">
  {#if icon}
    <div class="cn-empty-state-icon">{icon}</div>
  {/if}
  <div class="cn-empty-state-title">{title}</div>
  {#if description}
    <div class="cn-empty-state-description">{description}</div>
  {/if}
  <div class="cn-empty-state-action">
    <slot />
  </div>
</div>

<style>
  .cn-empty-state { display: flex; flex-direction: column; align-items: center; padding: 48px 24px; text-align: center; }
  .cn-empty-state-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
  .cn-empty-state-title { font-size: 16px; font-weight: 600; color: #ccc; margin-bottom: 8px; }
  .cn-empty-state-description { font-size: 13px; color: #888; max-width: 400px; margin-bottom: 16px; }
</style>
