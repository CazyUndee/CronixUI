import { mergeProps, For, Show } from 'solid-js';

export function Nav(props) {
  const merged = mergeProps({
    items: [],
    activeIndex: 0,
    onChange: () => {}
  }, props);

  const handleClick = (index) => {
    merged.onChange(index);
  };

  return (
    <nav class="cn-nav">
      <For each={merged.items}>{(item, index) => (
        <a
          class={`cn-nav-item ${index() === merged.activeIndex ? 'cn-nav-item-active' : ''}`}
          href={item.href || '#'}
          onClick={(e) => {
            e.preventDefault();
            handleClick(index());
          }}
        >
          <Show when={item.icon}>
            <span class="cn-nav-icon">{item.icon}</span>
          </Show>
          <span class="cn-nav-label">{item.label}</span>
        </a>
      )}</For>
    </nav>
  );
}
