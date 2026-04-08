import { mergeProps } from 'solid-js';

export function Badge(props) {
  const merged = mergeProps({ text: '', variant: 'default', solid: false }, props);
  
  const classes = () => {
    const c = ['cn-badge', `cn-badge-${merged.variant}`];
    if (merged.solid) c.push('cn-badge-solid');
    return c.join(' ');
  };

  return <span class={classes()}>{merged.children || merged.text}</span>;
}
