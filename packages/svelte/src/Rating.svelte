<script>
  export let value = 0;
  export let max = 5;
  export let size = 'md';
  export let disabled = false;
  export let onchange = () => {};

  $: stars = Array.from({ length: Math.max(1, max) }, (_, i) => i + 1);

  function handleClick(star) {
    if (!disabled) {
      value = star;
      onchange(star);
    }
  }
</script>

<div class="cn-rating cn-rating-{size}" class:cn-rating-disabled={disabled}>
  {#each stars as star}
    <button
      type="button"
      class="cn-rating-star"
      class:cn-rating-star-active={star <= value}
      disabled={disabled}
      aria-label="{star} star{star > 1 ? 's' : ''}"
      on:click={() => handleClick(star)}
    >★</button>
  {/each}
</div>

<style>
  .cn-rating {
    display: inline-flex;
    gap: 4px;
  }

  .cn-rating-star {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 24px;
    line-height: 1;
    color: #2a2a2a;
    cursor: pointer;
    transition: color 0.15s ease, transform 0.15s ease;
  }

  .cn-rating-star:hover {
    transform: scale(1.15);
  }

  .cn-rating-star-active {
    color: #6b2323;
  }

  .cn-rating-sm .cn-rating-star { font-size: 16px; }
  .cn-rating-lg .cn-rating-star { font-size: 32px; }

  .cn-rating-disabled .cn-rating-star {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .cn-rating-disabled .cn-rating-star:hover {
    transform: none;
  }
</style>
