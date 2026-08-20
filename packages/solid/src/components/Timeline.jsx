import { mergeProps, For } from 'solid-js';

export function Timeline(props) {
  const merged = mergeProps({ items: [] }, props);

  return (
    <div class="cn-timeline">
      <For each={merged.items}>
        {(item, index) => (
          <div class={`cn-timeline-item ${item.variant || 'default'}`}>
            <div class="cn-timeline-connector">
              <div class="cn-timeline-dot">
                {item.icon || <span class="cn-timeline-dot-inner" />}
              </div>
              {index() < merged.items.length - 1 && <div class="cn-timeline-line" />}
            </div>
            <div class="cn-timeline-content">
              <div class="cn-timeline-header">
                <span class="cn-timeline-title">{item.title}</span>
                {item.timestamp && (
                  <span class="cn-timeline-timestamp">{item.timestamp}</span>
                )}
              </div>
              {item.description && (
                <div class="cn-timeline-description">{item.description}</div>
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
