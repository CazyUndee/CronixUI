import { mergeProps, Show, createEffect, onCleanup } from 'solid-js';

export function Modal(props) {
  const merged = mergeProps({
    open: false,
    title: '',
    size: 'md',
    onClose: () => {}
  }, props);

  const sizeClasses = {
    sm: 'cn-modal-sm',
    md: 'cn-modal-md',
    lg: 'cn-modal-lg',
    xl: 'cn-modal-xl',
    full: 'cn-modal-full'
  };

  createEffect(() => {
    if (merged.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  onCleanup(() => {
    document.body.style.overflow = '';
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      merged.onClose();
    }
  };

  return (
    <Show when={merged.open}>
      <div class="cn-modal-backdrop" onClick={handleBackdropClick}>
        <div class={`cn-modal ${sizeClasses[merged.size] || 'cn-modal-md'}`}>
          <div class="cn-modal-header">
            <h2 class="cn-modal-title">{merged.title}</h2>
            <button class="cn-modal-close" onClick={merged.onClose}>×</button>
          </div>
          <div class="cn-modal-body">{merged.children}</div>
        </div>
      </div>
    </Show>
  );
}
