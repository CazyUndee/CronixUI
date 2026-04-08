import { mergeProps } from 'solid-js';

export function Spinner(props) {
  const merged = mergeProps({
    size: 'md'
  }, props);

  const sizeClasses = {
    sm: 'cn-spinner-sm',
    md: 'cn-spinner-md',
    lg: 'cn-spinner-lg',
    xl: 'cn-spinner-xl'
  };

  return (
    <div class={`cn-spinner ${sizeClasses[merged.size] || 'cn-spinner-md'}`}>
      <div class="cn-spinner-circle" />
    </div>
  );
}
