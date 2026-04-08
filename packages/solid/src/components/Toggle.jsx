import { mergeProps } from 'solid-js';

export function Toggle(props) {
  const merged = mergeProps({
    on: false,
    disabled: false,
    onToggle: () => {}
  }, props);

  const handleToggle = () => {
    if (!merged.disabled) {
      merged.onToggle(!merged.on);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={merged.on}
      class={`cn-toggle ${merged.on ? 'cn-toggle-on' : ''} ${merged.disabled ? 'cn-toggle-disabled' : ''}`}
      disabled={merged.disabled}
      onClick={handleToggle}
    >
      <span class="cn-toggle-thumb" />
    </button>
  );
}
