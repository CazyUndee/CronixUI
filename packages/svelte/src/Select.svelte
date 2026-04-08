<script>
  import { createEventDispatcher } from 'svelte';

  export let options = [];
  export let value = '';
  export let placeholder = 'Select...';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleChange(event) {
    const newValue = event.target.value;
    value = newValue;
    dispatch('change', { value: newValue });
  }

  $: normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );
</script>

<div class="cn-select-wrapper">
  <select
    class="cn-select"
    {disabled}
    {value}
    on:change={handleChange}
  >
    {#if placeholder}
      <option value="" disabled>{placeholder}</option>
    {/if}
    {#each normalizedOptions as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
</div>

<style>
  .cn-select-wrapper {
    position: relative;
    display: inline-block;
  }

  .cn-select {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    background: #111111;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 8px 32px 8px 12px;
    color: #f0ede8;
    cursor: pointer;
    appearance: none;
    width: 100%;
    transition: border-color 0.15s ease;
  }

  .cn-select:hover:not(:disabled) {
    border-color: rgba(255,255,255,0.15);
  }

  .cn-select:focus {
    outline: none;
    border-color: #6b2323;
    box-shadow: 0 0 0 3px rgba(107,35,35,0.3);
  }

  .cn-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .cn-select option {
    background: #111111;
    color: #f0ede8;
  }
</style>
