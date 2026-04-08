import { mergeProps, createSignal } from 'solid-js';

export function Radio(props) {
  const merged = mergeProps({
    name: 'radio',
    options: [],
    value: '',
    disabled: false,
    onChange: () => {}
  }, props);

  const handleChange = (optionValue) => {
    if (!merged.disabled) {
      merged.onChange(optionValue);
    }
  };

  return (
    <div class="cn-radio-group" role="radiogroup">
      <For each={merged.options}>{(option) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const isChecked = merged.value === optionValue;
        
        return (
          <label class={`cn-radio ${merged.disabled ? 'cn-radio-disabled' : ''}`}>
            <input
              type="radio"
              name={merged.name}
              value={optionValue}
              checked={isChecked}
              disabled={merged.disabled}
              onChange={() => handleChange(optionValue)}
            />
            <span class="cn-radio-indicator" />
            <span class="cn-radio-label">{optionLabel}</span>
          </label>
        );
      }}</For>
    </div>
  );
}
