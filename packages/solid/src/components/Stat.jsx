import { mergeProps, Show } from 'solid-js';

export function Stat(props) {
  const merged = mergeProps({
    value: '',
    label: '',
    delta: '',
    deltaType: 'neutral'
  }, props);

  const deltaIcons = {
    positive: '↑',
    negative: '↓',
    neutral: '•'
  };

  return (
    <div class="cn-stat">
      <span class="cn-stat-value">{merged.value}</span>
      <Show when={merged.label}>
        <span class="cn-stat-label">{merged.label}</span>
      </Show>
      <Show when={merged.delta}>
        <span class={`cn-stat-delta cn-stat-delta-${merged.deltaType}`}>
          <span class="cn-stat-delta-icon">{deltaIcons[merged.deltaType]}</span>
          {merged.delta}
        </span>
      </Show>
    </div>
  );
}
