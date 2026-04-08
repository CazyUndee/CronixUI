<script>
  export let value = '';
  export let label = '';
  export let delta = '';
  export let deltaType = 'up';
</script>

<div class="cn-stat">
  <div class="cn-stat-value">{value}</div>
  {#if label}
    <div class="cn-stat-label">{label}</div>
  {/if}
  {#if delta}
    <div class="cn-stat-delta" class:cn-stat-delta-up={deltaType === 'up'} class:cn-stat-delta-down={deltaType === 'down'}>
      {#if deltaType === 'up'}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2.5L10 7H2L6 2.5Z" fill="currentColor"/>
        </svg>
      {:else}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9.5L2 5H10L6 9.5Z" fill="currentColor"/>
        </svg>
      {/if}
      {delta}
    </div>
  {/if}
</div>

<style>
  .cn-stat {
    background: #111111;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 16px;
  }

  .cn-stat-value {
    font-size: 28px;
    font-weight: 600;
    color: #f0ede8;
  }

  .cn-stat-label {
    font-size: 11px;
    color: rgba(240,237,232,0.5);
    margin-top: 4px;
  }

  .cn-stat-delta {
    font-size: 11px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .cn-stat-delta-up {
    color: #6bc47a;
  }

  .cn-stat-delta-down {
    color: #c46b6b;
  }
</style>
