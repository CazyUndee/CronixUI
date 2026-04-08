import { mergeProps, For, Show } from 'solid-js';

export function Sidebar(props) {
  const merged = mergeProps({
    items: []
  }, props);

  return (
    <aside class="cn-sidebar">
      <For each={merged.items}>{(item) => (
        <a
          class={`cn-sidebar-item ${item.active ? 'cn-sidebar-item-active' : ''}`}
          href={item.href || '#'}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          }}
        >
          <Show when={item.icon}>
            <span class="cn-sidebar-icon">{item.icon}</span>
          </Show>
          <span class="cn-sidebar-label">{item.label}</span>
        </a>
      )}</For>
      <Show when={merged.children}>
        <div class="cn-sidebar-content">{merged.children}</div>
      </Show>
    </aside>
  );
}
