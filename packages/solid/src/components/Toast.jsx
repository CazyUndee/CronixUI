import { mergeProps, createEffect, onCleanup, Show } from 'solid-js';

export function Toast(props) {
  const merged = mergeProps({
    message: '',
    type: 'info',
    duration: 3000,
    onClose: () => {}
  }, props);

  createEffect(() => {
    if (merged.message && merged.duration > 0) {
      const timer = setTimeout(() => {
        merged.onClose();
      }, merged.duration);
      
      onCleanup(() => clearTimeout(timer));
    }
  });

  const typeIcons = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✕'
  };

  return (
    <Show when={merged.message}>
      <div class={`cn-toast cn-toast-${merged.type}`}>
        <span class="cn-toast-icon">{typeIcons[merged.type]}</span>
        <span class="cn-toast-message">{merged.message}</span>
        <button class="cn-toast-close" onClick={merged.onClose}>×</button>
      </div>
    </Show>
  );
}
