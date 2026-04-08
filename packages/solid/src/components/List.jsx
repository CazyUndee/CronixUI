import { mergeProps, For, Show } from 'solid-js';

export function List(props) {
  const merged = mergeProps({
    items: [],
    clickable: false
  }, props);

  return (
    <ul class={`cn-list ${merged.clickable ? 'cn-list-clickable' : ''}`}>
      <For each={merged.items}>{(item) => {
        const isObject = typeof item === 'object' && item !== null;
        const content = isObject ? item.content || item.label : item;
        const onClick = isObject ? item.onClick : undefined;
        
        return (
          <li
            class={`cn-list-item ${onClick || merged.clickable ? 'cn-list-item-clickable' : ''}`}
            onClick={onClick}
          >
            <Show when={isObject && item.icon}>
              <span class="cn-list-icon">{item.icon}</span>
            </Show>
            <span class="cn-list-content">{content}</span>
          </li>
        );
      }}</For>
    </ul>
  );
}
