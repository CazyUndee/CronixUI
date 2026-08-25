<script>
  /** @type {string} */
  export let text = '';
  /** @type {string} */
  export let label = 'Copy';
  /** @type {string} */
  export let copiedLabel = 'Copied!';
  /** @type {boolean} */
  export let showIcon = true;
  /** @type {number} */
  export let timeout = 2000;

  let copied = false;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => { copied = false; }, timeout);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copied = true;
      setTimeout(() => { copied = false; }, timeout);
    }
  }
</script>

<button
  class="cn-copy-button"
  class:cn-copy-button-copied={copied}
  on:click={handleCopy}
  aria-label={copied ? copiedLabel : label}
>
  {#if showIcon}
    <span class="cn-copy-icon">{copied ? '✓' : '📋'}</span>
  {/if}
  <span class="cn-copy-text">{copied ? copiedLabel : label}</span>
</button>

<style>
  .cn-copy-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--cn-surface);
    border: 1px solid var(--cn-border);
    border-radius: var(--cn-radius);
    cursor: pointer;
    font-size: 13px;
    color: var(--cn-text);
    transition: all 0.15s ease;
  }
  .cn-copy-button:hover { background: var(--cn-surface-2); }
  .cn-copy-button-copied { color: var(--cn-success); border-color: var(--cn-success); }
  .cn-copy-icon { font-size: 14px; }
</style>
