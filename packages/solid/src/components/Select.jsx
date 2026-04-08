import { mergeProps, createSignal, Show } from 'solid-js';

export function Select(props) {
  const merged = mergeProps({
    options: [],
    value: '',
    placeholder: 'Select...',
    disabled: false,
    onChange: () => {}
  }, props);

  const [isOpen, setIsOpen] = createSignal(false);

  const selectedOption = () => {
    return merged.options.find(opt => 
      (typeof opt === 'string' ? opt : opt.value) === merged.value
    );
  };

  const selectedLabel = () => {
    const opt = selectedOption();
    if (!opt) return merged.placeholder;
    return typeof opt === 'string' ? opt : opt.label;
  };

  const handleSelect = (optionValue) => {
    merged.onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div class={`cn-select ${merged.disabled ? 'cn-select-disabled' : ''}`}>
      <button
        type="button"
        class="cn-select-trigger"
        disabled={merged.disabled}
        onClick={() => !merged.disabled && setIsOpen(!isOpen())}
      >
        <span class={merged.value ? '' : 'cn-select-placeholder'}>{selectedLabel()}</span>
        <span class="cn-select-arrow">{isOpen() ? '▲' : '▼'}</span>
      </button>
      <Show when={isOpen()}>
        <div class="cn-select-dropdown">
          <For each={merged.options}>{(option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            const isSelected = merged.value === optionValue;
            
            return (
              <div
                class={`cn-select-option ${isSelected ? 'cn-select-option-selected' : ''}`}
                onClick={() => handleSelect(optionValue)}
              >
                {optionLabel}
              </div>
            );
          }}</For>
        </div>
      </Show>
    </div>
  );
}
