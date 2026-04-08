import { mergeProps, Show } from 'solid-js';

export function Progress(props) {
  const merged = mergeProps({
    value: 0,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: false
  }, props);

  const percentage = () => {
    return Math.min(Math.max((merged.value / merged.max) * 100, 0), 100);
  };

  const sizeClasses = {
    sm: 'cn-progress-sm',
    md: 'cn-progress-md',
    lg: 'cn-progress-lg'
  };

  return (
    <div class={`cn-progress ${sizeClasses[merged.size] || 'cn-progress-md'}`}>
      <div class="cn-progress-track">
        <div
          class={`cn-progress-bar cn-progress-${merged.variant}`}
          style={`width: ${percentage()}%`}
        />
      </div>
      <Show when={merged.showLabel}>
        <span class="cn-progress-label">{Math.round(percentage())}%</span>
      </Show>
    </div>
  );
}
