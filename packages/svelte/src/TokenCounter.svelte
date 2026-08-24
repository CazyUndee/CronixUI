<script>
  /** @type {number} */
  export let promptTokens = 0;
  /** @type {number} */
  export let completionTokens = 0;
  /** @type {number|null} */
  export let maxTokens = null;

  $: total = promptTokens + completionTokens;
  $: percentage = maxTokens ? Math.min((total / maxTokens) * 100, 100) : null;
</script>

<div class="cn-token-counter" aria-label="{total} tokens used">
  {#if percentage !== null}
    <div class="cn-token-bar">
      <div
        class="cn-token-bar-fill"
        class:cn-token-bar-warning={percentage > 80}
        class:cn-token-bar-danger={percentage > 95}
        style="width: {percentage}%"
      />
    </div>
  {/if}
  <div class="cn-token-info">
    <span class="cn-token-total">{total.toLocaleString()} tokens</span>
    <span class="cn-token-breakdown">
      ({promptTokens.toLocaleString()} prompt + {completionTokens.toLocaleString()} completion)
    </span>
    {#if maxTokens}
      <span class="cn-token-limit">/ {maxTokens.toLocaleString()}</span>
    {/if}
  </div>
</div>

<style>
  .cn-token-counter { display: flex; flex-direction: column; gap: 4px; }
  .cn-token-bar { height: 4px; background: var(--cn-surface-2); border-radius: 2px; overflow: hidden; }
  .cn-token-bar-fill { height: 100%; background: var(--cn-primary); transition: width 0.3s ease; }
  .cn-token-bar-warning { background: var(--cn-warning); }
  .cn-token-bar-danger { background: var(--cn-error); }
  .cn-token-info { display: flex; align-items: center; gap: 8px; font-size: 12px; }
  .cn-token-total { font-weight: 500; }
  .cn-token-breakdown { color: var(--cn-text-muted); }
</style>
