import { mergeProps, createSignal, Show, For } from 'solid-js';

export function Search(props) {
  const merged = mergeProps({
    placeholder: 'Search...',
    items: [],
    onSelect: () => {}
  }, props);

  const [query, setQuery] = createSignal('');
  const [isOpen, setIsOpen] = createSignal(false);

  const filteredItems = () => {
    const q = query().toLowerCase();
    if (!q) return [];
    return merged.items.filter(item => {
      const label = typeof item === 'string' ? item : item.label;
      return label.toLowerCase().includes(q);
    });
  };

  const handleSelect = (item) => {
    const value = typeof item === 'string' ? item : item.value;
    const label = typeof item === 'string' ? item : item.label;
    setQuery(label);
    setIsOpen(false);
    merged.onSelect(value);
  };

  return (
    <div class="cn-search">
      <input
        type="text"
        class="cn-search-input"
        placeholder={merged.placeholder}
        value={query()}
        onInput={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      <Show when={isOpen() && filteredItems().length > 0}>
        <div class="cn-search-dropdown">
          <For each={filteredItems()}>{(item) => (
            <div
              class="cn-search-item"
              onClick={() => handleSelect(item)}
            >
              {typeof item === 'string' ? item : item.label}
            </div>
          )}</For>
        </div>
      </Show>
    </div>
  );
}
