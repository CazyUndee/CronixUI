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

  function handleKeydown(event, star) {
    if (disabled) return;
    let nextStar = star;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        nextStar = Math.min(star + 1, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        nextStar = Math.max(star - 1, 1);
        break;
      case 'Home':
        event.preventDefault();
        nextStar = 1;
        break;
      case 'End':
        event.preventDefault();
        nextStar = max;
        break;
      default:
        return;
    }
    handleClick(nextStar);
  }
</script>

<div class="cn-rating cn-rating-{size}" class:cn-rating-disabled={disabled} role="radiogroup" aria-label="Rating">
  {#each stars as star}
    <button
      type="button"
      class="cn-rating-star"
      class:cn-rating-star-active={star <= value}
      disabled={disabled}
      role="radio"
      aria-checked={star <= value}
      aria-label="{star} star{star > 1 ? 's' : ''}"
      tabindex={star === value || (value === 0 && star === 1) ? 0 : -1}
      on:click={() => handleClick(star)}
      on:keydown={(e) => handleKeydown(e, star)}
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
