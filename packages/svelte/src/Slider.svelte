<script>
  export let min = 0;
  export let max = 100;
  export let value = min;
  export let step = 1;
  export let disabled = false;

  $: if (value < min) value = min;
  $: if (value > max) value = max;

  function handleChange(event) {
    if (!disabled) {
      value = Number(event.target.value);
    }
  }
</script>

<input
  type="range"
  class="cn-slider"
  class:disabled
  {min}
  {max}
  {step}
  {value}
  {disabled}
  on:change={handleChange}
  on:input={handleChange}
/>

<style>
  .cn-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: #222222;
    outline: none;
    cursor: pointer;
  }

  .cn-slider.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .cn-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6b2323;
    border: 2px solid #f0ede8;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .cn-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  .cn-slider.disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .cn-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6b2323;
    border: 2px solid #f0ede8;
    cursor: pointer;
  }

  .cn-slider.disabled::-moz-range-thumb {
    cursor: not-allowed;
  }
</style>
