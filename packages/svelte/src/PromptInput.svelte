<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {string} */
  export let placeholder = 'Ask AI anything...';
  /** @type {boolean} */
  export let loading = false;

  const dispatch = createEventDispatcher();
  let prompt = '';

  function handleSubmit() {
    if (!prompt.trim() || loading) return;
    dispatch('submit', { prompt });
    prompt = '';
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="cn-prompt-input">
  <div class="cn-prompt-input-main">
    <textarea
      class="cn-prompt-textarea"
      {placeholder}
      bind:value={prompt}
      on:keydown={handleKeydown}
      disabled={loading}
      rows="1"
      aria-label="AI prompt input"
    />
    <button
      class="cn-prompt-submit"
      class:cn-prompt-submit-disabled={!prompt.trim() || loading}
      on:click={handleSubmit}
      disabled={!prompt.trim() || loading}
      aria-label="Send prompt"
    >
      {#if loading}
        <span class="cn-spinner-small">⏳</span>
      {:else}
        <span class="cn-prompt-send-icon">↑</span>
      {/if}
    </button>
  </div>
  <div class="cn-prompt-footer">
    <span class="cn-prompt-hint">Press Enter to send · Shift+Enter for new line</span>
  </div>
</div>

<style>
  .cn-prompt-input {
    border: 1px solid var(--cn-border);
    border-radius: var(--cn-radius-lg);
    background: var(--cn-surface);
  }
  .cn-prompt-input-main {
    display: flex;
    align-items: flex-end;
    padding: 12px;
    gap: 8px;
  }
  .cn-prompt-textarea {
    flex: 1;
    border: none;
    background: transparent;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    font-family: inherit;
    outline: none;
  }
  .cn-prompt-submit {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--cn-primary);
    color: var(--cn-on-primary, #fff);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .cn-prompt-submit:hover { opacity: 0.9; transform: scale(1.05); }
  .cn-prompt-submit-disabled { opacity: 0.4; cursor: not-allowed; }
  .cn-prompt-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-top: 1px solid var(--cn-border);
    font-size: 12px;
    color: var(--cn-text-muted);
  }
</style>
