<script>
  /** @type {'idle' | 'generating' | 'streaming' | 'error' | 'rate-limited'} */
  export let status = 'idle';
  /** @type {string} */
  export let model = '';
  /** @type {string} */
  export let errorMessage = '';
  /** @type {number} */
  export let retryAfter = 0;

  const config = {
    idle: { label: 'Ready', color: 'success', icon: '●' },
    generating: { label: 'Generating', color: 'warning', icon: '◉' },
    streaming: { label: 'Streaming', color: 'info', icon: '◉' },
    error: { label: 'Error', color: 'error', icon: '✕' },
    'rate-limited': { label: 'Rate Limited', color: 'warning', icon: '◉' },
  };
</script>

<div
  class="cn-ai-status"
  class:cn-ai-status-success={config[status]?.color === 'success'}
  class:cn-ai-status-warning={config[status]?.color === 'warning'}
  class:cn-ai-status-error={config[status]?.color === 'error'}
  class:cn-ai-status-info={config[status]?.color === 'info'}
  role="status"
  aria-live="polite"
>
  <span
    class="cn-ai-status-dot"
    class:cn-ai-status-pulse={status === 'generating' || status === 'streaming'}
  >{config[status]?.icon || '●'}</span>
  <span class="cn-ai-status-label">{config[status]?.label || 'Unknown'}</span>
  {#if model}
    <span class="cn-ai-status-model">{model}</span>
  {/if}
  {#if status === 'error' && errorMessage}
    <span class="cn-ai-status-error-msg">{errorMessage}</span>
  {/if}
  {#if status === 'rate-limited' && retryAfter}
    <span class="cn-ai-status-retry">Retry in {retryAfter}s</span>
  {/if}
</div>

<style>
  .cn-ai-status { display: flex; align-items: center; gap: 6px; font-size: 13px; padding: 4px 10px; border-radius: var(--cn-radius); }
  .cn-ai-status-success { color: var(--cn-success); }
  .cn-ai-status-warning { color: var(--cn-warning); }
  .cn-ai-status-error { color: var(--cn-error); }
  .cn-ai-status-info { color: var(--cn-info); }
  .cn-ai-status-pulse { animation: cn-pulse 1.5s ease-in-out infinite; }
  .cn-ai-status-model { font-size: 11px; opacity: 0.7; }
  .cn-ai-status-error-msg { font-size: 12px; color: var(--cn-error); }
  .cn-ai-status-retry { font-size: 12px; }
  @keyframes cn-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
</style>
