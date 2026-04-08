import { mergeProps, createSignal, Show, For } from 'solid-js';

export function Dropdown(props) {
  const merged = mergeProps({
    items: [],
    selected: '',
    onSelect: () => {}
  }, props);

  const [isOpen, setIsOpen] = createSignal(false);

  const selectedItem = () => {
    return merged.items.find(item => item.value === merged.selected);
  };

  const handleSelect = (item) => {
    merged.onSelect(item.value);
    setIsOpen(false);
  };

  return (
    <div class="cn-dropdown">
      <button
        type="button"
        class="cn-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen())}
      >
        {selectedItem()?.label || 'Select...'}
        <span class="cn-dropdown-arrow">{isOpen() ? '▲' : '▼'}</span>
      </button>
      <Show when={isOpen()}>
        <div class="cn-dropdown-menu">
          <For each={merged.items}>{(item) => (
            <div
              class={`cn-dropdown-item ${item.value === merged.selected ? 'cn-dropdown-item-selected' : ''}`}
              onClick={() => handleSelect(item)}
            >
              <Show when={item.icon}>
                <span class="cn-dropdown-item-icon">{item.icon}</span>
              </Show>
              <span class="cn-dropdown-item-label">{item.label}</span>
            </div>
          )}</For>
        </div>
      </Show>
    </div>
  );
}
