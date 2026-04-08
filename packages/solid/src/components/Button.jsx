import { createSignal, mergeProps } from 'solid-js';

export function Button(props) {
  const merged = mergeProps({ variant: 'default', size: 'md' }, props);
  
  const getClass = () => {
    const classes = ['cn-btn', `cn-btn-${merged.variant}`];
    if (merged.size !== 'md') classes.push(`cn-btn-${merged.size}`);
    if (merged.icon) classes.push('cn-btn-icon');
    return classes.join(' ');
  };

  return (
    <button
      class={getClass()}
      disabled={merged.disabled}
      onClick={merged.onClick}
    >
      {merged.children}
    </button>
  );
}
