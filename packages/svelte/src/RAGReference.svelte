<script>
  /** @type {Array<{id: string, title: string, source: string, snippet: string, url?: string, score?: number}>} */
  export let references = [];
  /** @type {boolean} */
  export let expandable = true;

  let expanded = !expandable;
</script>

{#if references.length > 0}
  <div class="cn-rag-reference">
    {#if expandable}
      <button
        class="cn-rag-toggle"
        on:click={() => expanded = !expanded}
        aria-expanded={expanded}
      >
        📚 Sources ({references.length})
        <span class="cn-rag-chevron">{expanded ? '▲' : '▼'}</span>
      </button>
    {/if}

    {#if expanded}
      <div class="cn-rag-list">
        {#each references as ref}
          <div class="cn-rag-item">
            <div class="cn-rag-item-header">
              <span class="cn-rag-item-title">{ref.title}</span>
              <span class="cn-rag-item-source">{ref.source}</span>
              {#if ref.score !== undefined}
                <span class="cn-rag-item-score">{Math.round(ref.score * 100)}% match</span>
              {/if}
            </div>
            <div class="cn-rag-item-snippet">{ref.snippet}</div>
            {#if ref.url}
              <a class="cn-rag-item-link" href={ref.url} target="_blank" rel="noopener noreferrer">View source →</a>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .cn-rag-reference { display: flex; flex-direction: column; gap: 8px; }
  .cn-rag-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid var(--cn-border);
    padding: 8px 12px;
    border-radius: var(--cn-radius);
    cursor: pointer;
    font-size: 13px;
    width: 100%;
    text-align: left;
    color: var(--cn-text);
  }
  .cn-rag-toggle:hover { background: var(--cn-surface-2); }
  .cn-rag-chevron { margin-left: auto; }
  .cn-rag-list { display: flex; flex-direction: column; gap: 8px; }
  .cn-rag-item { padding: 12px; background: var(--cn-surface-2); border-radius: var(--cn-radius); border: 1px solid var(--cn-border); }
  .cn-rag-item-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
  .cn-rag-item-title { font-weight: 500; font-size: 14px; }
  .cn-rag-item-source { font-size: 11px; padding: 2px 6px; background: var(--cn-surface-3); border-radius: var(--cn-radius); }
  .cn-rag-item-score { font-size: 11px; color: var(--cn-success); margin-left: auto; }
  .cn-rag-item-snippet { font-size: 13px; color: var(--cn-text-muted); line-height: 1.5; }
  .cn-rag-item-link { display: inline-block; margin-top: 6px; font-size: 12px; color: var(--cn-primary); text-decoration: none; }
  .cn-rag-item-link:hover { text-decoration: underline; }
</style>
