import { mergeProps, For, Show } from 'solid-js';

export function Breadcrumb(props) {
  const merged = mergeProps({
    items: [],
    separator: '/'
  }, props);

  return (
    <nav class="cn-breadcrumb">
      <For each={merged.items}>{(item, index) => (
        <>
          <Show when={index() > 0}>
            <span class="cn-breadcrumb-separator">{merged.separator}</span>
          </Show>
          <a
            class={`cn-breadcrumb-item ${index() === merged.items.length - 1 ? 'cn-breadcrumb-item-current' : ''}`}
            href={item.href || '#'}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.label}
          </a>
        </>
      )}</For>
    </nav>
  );
}
