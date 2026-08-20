<script>
  export let value = '#6B2323';
  export let presets = ['#6B2323', '#8B3A3A', '#C97A7A', '#1A1A1A', '#2A2A2A', '#FFFFFF', '#2A6B23', '#6B5A23', '#23356B'];
  export let onchange = () => {};

  function selectColor(color) {
    value = color;
    onchange(color);
  }
</script>

<div class="cn-colorpicker">
  <div class="cn-colorpicker-preview" style="background-color: {value}"></div>
  <div class="cn-colorpicker-presets">
    {#each presets as preset}
      <button
        class="cn-colorpicker-swatch"
        class:cn-colorpicker-swatch-active={preset === value}
        style="background-color: {preset}"
        on:click={() => selectColor(preset)}
        aria-label="Color {preset}"
      />
    {/each}
  </div>
  <input type="color" class="cn-colorpicker-input" bind:value on:change={(e) => selectColor(e.target.value)} />
</div>

<style>
  .cn-colorpicker { display: flex; flex-direction: column; gap: 8px; }
  .cn-colorpicker-preview { width: 100%; height: 48px; border-radius: 8px; border: 1px solid #2a2a2a; }
  .cn-colorpicker-presets { display: flex; flex-wrap: wrap; gap: 4px; }
  .cn-colorpicker-swatch { width: 28px; height: 28px; border-radius: 6px; border: 2px solid transparent; cursor: pointer; padding: 0; }
  .cn-colorpicker-swatch:hover { border-color: #888; }
  .cn-colorpicker-swatch-active { border-color: #6b2323; }
  .cn-colorpicker-input { width: 100%; height: 36px; border: 1px solid #2a2a2a; border-radius: 8px; background: #1a1a1a; cursor: pointer; padding: 2px; }
</style>
