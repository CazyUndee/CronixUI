import { mergeProps, For } from 'solid-js';

export function Rating(props) {
  const merged = mergeProps({
    value: 0,
    max: 5,
    size: 'md',
    disabled: false,
    onChange: () => {}
  }, props);

  const stars = () => Array.from({ length: Math.max(1, merged.max) }, (_, i) => i + 1);

  const handleKeydown = (e, star) => {
    if (merged.disabled) return;
    let nextStar = star;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        nextStar = Math.min(star + 1, merged.max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        nextStar = Math.max(star - 1, 1);
        break;
      case 'Home':
        e.preventDefault();
        nextStar = 1;
        break;
      case 'End':
        e.preventDefault();
        nextStar = merged.max;
        break;
      default:
        return;
    }
    merged.onChange(nextStar);
  };

  return (
    <div
      class={`cn-rating cn-rating-${merged.size}`}
      classList={{ 'cn-rating-disabled': merged.disabled }}
      role="radiogroup"
      aria-label="Rating"
    >
      <For each={stars()}>
        {(star) => (
          <button
            type="button"
            role="radio"
            aria-checked={star <= merged.value}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            class="cn-rating-star"
            classList={{ 'cn-rating-star-active': star <= merged.value }}
            disabled={merged.disabled}
            tabindex={star === merged.value || (merged.value === 0 && star === 1) ? 0 : -1}
            onClick={() => merged.onChange(star)}
            onKeyDown={(e) => handleKeydown(e, star)}
          >★</button>
        )}
      </For>
    </div>
  );
}

export default Rating;
