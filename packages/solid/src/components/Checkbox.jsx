import { mergeProps } from 'solid-js';

export function Checkbox(props) {
  const merged = mergeProps({
    checked: false,
    disabled: false,
    onChange: () => {}
  }, props);

  const handleChange = (e) => {
    if (!merged.disabled) {
      merged.onChange(e.target.checked);
    }
  };

  return (
    <label class={`cn-checkbox ${merged.disabled ? 'cn-checkbox-disabled' : ''}`}>
      <input
        type="checkbox"
        class="cn-checkbox-input"
        checked={merged.checked}
        disabled={merged.disabled}
        onChange={handleChange}
      />
      <span class="cn-checkbox-indicator" />
      {merged.label && <span class="cn-checkbox-label">{merged.label}</span>}
    </label>
  );
}
