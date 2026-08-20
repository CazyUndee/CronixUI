import { mergeProps, Show } from 'solid-js';

export function EmptyState(props) {
  const merged = mergeProps({ title: '', description: '', icon: null }, props);
  return (
    <div class="cn-empty-state">
      <Show when={merged.icon}>
        <div class="cn-empty-state-icon">{merged.icon}</div>
      </Show>
      <div class="cn-empty-state-title">{merged.title}</div>
      <Show when={merged.description}>
        <div class="cn-empty-state-description">{merged.description}</div>
      </Show>
      <Show when={merged.children}>
        <div class="cn-empty-state-action">{merged.children}</div>
      </Show>
    </div>
  );
}
