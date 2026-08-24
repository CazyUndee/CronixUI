import { mergeProps, Show } from 'solid-js';

export function Drawer(props) {
  const merged = mergeProps({
    isOpen: false,
    title: '',
    side: 'right',
    size: 'md',
    onClose: () => {},
  }, props);

  return (
    <Show when={merged.isOpen}>
      <div class="cn-drawer-overlay" onClick={merged.onClose}>
        <div
          class={`cn-drawer cn-drawer-${merged.side} cn-drawer-${merged.size}`}
          role="dialog"
          aria-modal="true"
          aria-label={merged.title || 'Drawer'}
          onClick={(e) => e.stopPropagation()}
        >
          <Show when={merged.title}>
            <div class="cn-drawer-header">
              <h3 class="cn-drawer-title">{merged.title}</h3>
              <button class="cn-drawer-close" onClick={merged.onClose}>×</button>
            </div>
          </Show>
          <div class="cn-drawer-body">{merged.children}</div>
        </div>
      </div>
    </Show>
  );
}
