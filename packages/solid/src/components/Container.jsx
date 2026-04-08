import { mergeProps } from 'solid-js';

export function Container(props) {
  const merged = mergeProps({
    size: 'lg'
  }, props);

  const sizeClasses = {
    sm: 'cn-container-sm',
    md: 'cn-container-md',
    lg: 'cn-container-lg',
    xl: 'cn-container-xl',
    fluid: 'cn-container-fluid'
  };

  return (
    <div class={`cn-container ${sizeClasses[merged.size] || 'cn-container-lg'}`}>
      {merged.children}
    </div>
  );
}
