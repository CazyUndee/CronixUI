<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {Array<{id: string, name: string, provider?: string}>} */
  export let models = [];
  /** @type {string} */
  export let value = '';
  /** @type {string} */
  export let placeholder = 'Select model';

  const dispatch = createEventDispatcher();
  let isOpen = false;
  let search = '';

  $: selectedModel = models.find(m => m.id === value);
  $: filteredModels = models.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.provider?.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(modelId) {
    dispatch('change', modelId);
    isOpen = false;
    search = '';
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      isOpen = false;
      search = '';
    }
  }
</script>

<div class="cn-model-selector" on:keydown={handleKeydown}>
  <button
    class="cn-model-selector-trigger"
    on:click={() => { isOpen = !isOpen; }}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-label={selectedModel?.name || placeholder}
  >
    <span class="cn-model-name">{selectedModel?.name || placeholder}</span>
    <span class="cn-model-chevron">{isOpen ? '▲' : '▼'}</span>
  </button>

  {#if isOpen}
    <div class="cn-model-dropdown" role="listbox">
      <div class="cn-model-search">
        <input
          type="text"
          class="cn-model-search-input"
          placeholder="Search models..."
          bind:value={search}
          aria-label="Search models"
        />
      </div>
      <div class="cn-model-list">
        {#each filteredModels as model}
          <button
            class="cn-model-option"
            class:cn-model-option-selected={model.id === value}
            on:click={() => handleSelect(model.id)}
            role="option"
            aria-selected={model.id === value}
          >
            <div class="cn-model-option-header">
              <span class="cn-model-option-name">{model.name}</span>
              {#if model.provider}
                <span class="cn-model-option-provider">{model.provider}</span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .cn-model-selector { position: relative; }
  .cn-model-selector-trigger { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--cn-surface); border: 1px solid var(--cn-border); border-radius: var(--cn-radius); cursor: pointer; font-size: 14px; min-width: 180px; }
  .cn-model-dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--cn-surface); border: 1px solid var(--cn-border); border-radius: var(--cn-radius); box-shadow: var(--cn-shadow-lg); z-index: var(--cn-z-dropdown); max-height: 300px; }
  .cn-model-search { padding: 8px; border-bottom: 1px solid var(--cn-border); }
  .cn-model-search-input { width: 100%; padding: 8px; background: var(--cn-surface-2); border: 1px solid var(--cn-border); border-radius: var(--cn-radius); font-size: 13px; }
  .cn-model-list { max-height: 250px; overflow-y: auto; }
  .cn-model-option { display: block; width: 100%; text-align: left; padding: 10px 12px; background: none; border: none; cursor: pointer; }
  .cn-model-option:hover { background: var(--cn-surface-2); }
  .cn-model-option-selected { background: var(--cn-primary-subtle); }
  .cn-model-option-header { display: flex; align-items: center; gap: 8px; }
</style>
