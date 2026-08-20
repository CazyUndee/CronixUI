import { mergeProps, Show, onCleanup, createEffect } from 'solid-js';

export function Notification(props) {
  const merged = mergeProps({ isOpen: false, variant: 'info', title: '', message: '', duration: 5000, onClose: () => {} }, props);
  createEffect(() => {
    if (merged.isOpen && merged.duration > 0) {
      const timer = setTimeout(() => merged.onClose(), merged.duration);
      onCleanup(() => clearTimeout(timer));
    }
  });
  return (
    <Show when={merged.isOpen}>
      <div class={`cn-notification cn-notification-${merged.variant}`} role="alert">
        <div class="cn-notification-content">
          <Show when={merged.title}><div class="cn-notification-title">{merged.title}</div></Show>
          <div class="cn-notification-message">{merged.message}</div>
        </div>
        <button class="cn-notification-close" onClick={merged.onClose}>×</button>
      </div>
    </Show>
  );
}
