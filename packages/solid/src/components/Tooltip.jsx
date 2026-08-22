import { mergeProps, createSignal, Show, createUniqueId } from 'solid-js';

export function Tooltip(props) {
  const merged = mergeProps({
    content: '',
    position: 'top'
  }, props);

  const [isVisible, setIsVisible] = createSignal(false);
  const tooltipId = createUniqueId();

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
      <span aria-describedby={tooltipId}>{merged.children}</span>
      <Show when={isVisible()}>
        <div class={`cn-tooltip ${positionClasses[merged.position] || 'cn-tooltip-top'}`} id={tooltipId} role="tooltip">
          {merged.content}
        </div>
      </Show>
    </div>
  );
}

export default Tooltip;
