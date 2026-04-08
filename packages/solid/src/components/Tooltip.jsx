import { mergeProps, createSignal, Show } from 'solid-js';

export function Tooltip(props) {
  const merged = mergeProps({
    content: '',
    position: 'top'
  }, props);

  const [isVisible, setIsVisible] = createSignal(false);

  const positionClasses = {
    top: 'cn-tooltip-top',
    bottom: 'cn-tooltip-bottom',
    left: 'cn-tooltip-left',
    right: 'cn-tooltip-right'
  };

  return (
    <div
      class="cn-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {merged.children}
      <Show when={isVisible()}>
        <div class={`cn-tooltip ${positionClasses[merged.position] || 'cn-tooltip-top'}`}>
          {merged.content}
        </div>
      </Show>
    </div>
  );
}
