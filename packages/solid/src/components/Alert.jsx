import { mergeProps, Show } from 'solid-js';

export function Alert(props) {
  const merged = mergeProps({
    title: '',
    message: '',
    variant: 'info',
    dismissible: false,
    onClose: () => {}
  }, props);

  const variantIcons = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✕'
  };

  return (
    <div class={`cn-alert cn-alert-${merged.variant}`}>
      <span class="cn-alert-icon">{variantIcons[merged.variant]}</span>
      <div class="cn-alert-content">
        <Show when={merged.title}>
          <h4 class="cn-alert-title">{merged.title}</h4>
        </Show>
        <Show when={merged.message}>
          <p class="cn-alert-message">{merged.message}</p>
        </Show>
      </div>
      <Show when={merged.dismissible}>
        <button class="cn-alert-close" onClick={merged.onClose}>×</button>
      </Show>
    </div>
  );
}
