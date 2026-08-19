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
            onClick={() => merged.onChange(star)}
          >★</button>
        )}
      </For>
    </div>
  );
}
