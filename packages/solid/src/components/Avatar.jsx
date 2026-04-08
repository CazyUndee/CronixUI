import { mergeProps, Show } from 'solid-js';

export function Avatar(props) {
  const merged = mergeProps({
    initials: '',
    src: '',
    size: 'md'
  }, props);

  const sizeClasses = {
    sm: 'cn-avatar-sm',
    md: 'cn-avatar-md',
    lg: 'cn-avatar-lg',
    xl: 'cn-avatar-xl'
  };

  return (
    <div class={`cn-avatar ${sizeClasses[merged.size] || 'cn-avatar-md'}`}>
      <Show when={merged.src} fallback={<span class="cn-avatar-initials">{merged.initials}</span>}>
        <img src={merged.src} alt={merged.initials} class="cn-avatar-image" />
      </Show>
    </div>
  );
}
