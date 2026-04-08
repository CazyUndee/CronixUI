import { mergeProps, Show } from 'solid-js';

export function Tag(props) {
  const merged = mergeProps({
    text: '',
    removable: false,
    onRemove: () => {}
  }, props);

  return (
    <span class="cn-tag">
      <span class="cn-tag-text">{merged.text}</span>
      <Show when={merged.removable}>
        <button class="cn-tag-remove" onClick={merged.onRemove}>×</button>
      </Show>
    </span>
  );
}
