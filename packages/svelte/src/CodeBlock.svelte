<script>
  /** @type {string} */
  export let code = '';
  /** @type {string} */
  export let language = 'text';
  /** @type {boolean} */
  export let showLineNumbers = false;

  let copied = false;

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  $: lines = code.split('\n');
</script>

<div class="cn-code-block">
  <div class="cn-code-header">
    <span class="cn-code-language">{language}</span>
    <button class="cn-code-copy" on:click={handleCopy} aria-label={copied ? 'Copied' : 'Copy code'}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  </div>
  <pre class="cn-code-pre">
    <code class="cn-code-content">
      {#if showLineNumbers}
        {#each lines as line, i}
          <div class="cn-code-line">
            <span class="cn-code-line-number">{i + 1}</span>
            <span class="cn-code-line-text">{line}</span>
          </div>
        {/each}
      {:else}
        {code}
      {/if}
    </code>
  </pre>
</div>

<style>
  .cn-code-block { background: var(--cn-code-bg, #1e1e1e); border-radius: var(--cn-radius); overflow: hidden; }
  .cn-code-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1); }
  .cn-code-copy { background: none; border: 1px solid rgba(255,255,255,0.1); color: var(--cn-text); padding: 4px 8px; border-radius: var(--cn-radius); cursor: pointer; font-size: 12px; }
  .cn-code-pre { margin: 0; padding: 16px; overflow-x: auto; font-family: 'Monaco', monospace; font-size: 13px; line-height: 1.5; color: #d4d4d4; }
  .cn-code-line { display: flex; }
  .cn-code-line-number { width: 40px; text-align: right; padding-right: 16px; user-select: none; opacity: 0.4; }
</style>
