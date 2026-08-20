import { mergeProps, Show } from 'solid-js';

export function Chip(props) {
  const merged = mergeProps({
    variant: 'default',
    size: 'md',
    selected: false,
    onRemove: null,
    onClick: null,
  }, props);

  return (
    <span
      class={`cn-chip cn-chip-${merged.variant} cn-chip-${merged.size}`}
      classList={{ 'cn-chip-selected': merged.selected }}
      role={merged.onClick ? 'button' : undefined}
      tabindex={merged.onClick ? 0 : undefined}
      onClick={merged.onClick}
    >
      {merged.children}
      <Show when={merged.onRemove}>
        <button
          class="cn-chip-remove"
          onClick={(e) => { e.stopPropagation(); merged.onRemove(); }}
          aria-label="Remove"
        >
          ×
        </button>
      </Show>
    </span>
  );
}
