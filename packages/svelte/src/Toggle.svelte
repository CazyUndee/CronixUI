<script>
  import { createEventDispatcher } from 'svelte';

  export let on = false;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function toggle() {
    if (disabled) return;
    on = !on;
    dispatch('toggle', { on });
  }
</script>

<button
  type="button"
  class="cn-toggle"
  class:on
  {disabled}
  on:click={toggle}
  aria-pressed={on}
  aria-disabled={disabled}
>
</button>

<style>
  .cn-toggle {
    width: 40px;
    height: 22px;
    background: #222222;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    position: relative;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
    outline: none;
  }

  .cn-toggle::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(240, 237, 232, 0.5);
    top: 2px;
    left: 2px;
    transition: transform 0.15s ease, background 0.15s ease;
  }

  .cn-toggle.on {
    background: #6b2323;
    border-color: #6b2323;
  }

  .cn-toggle.on::after {
    transform: translateX(18px);
    background: #f0ede8;
  }

  .cn-toggle:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
