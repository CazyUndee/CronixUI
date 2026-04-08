import { mergeProps } from 'solid-js';

export function Input(props) {
  const merged = mergeProps({ 
    value: '', 
    placeholder: '', 
    size: 'md', 
    error: false, 
    disabled: false 
  }, props);

  const classes = () => {
    const c = ['cn-input'];
    if (merged.size !== 'md') c.push(`cn-input-${merged.size}`);
    if (merged.error) c.push('cn-input-error');
    return c.join(' ');
  };

  return (
    <input
      type="text"
      class={classes()}
      value={merged.value}
      placeholder={merged.placeholder}
      disabled={merged.disabled}
      onInput={(e) => merged.onInput?.(e.target.value)}
    />
  );
}
