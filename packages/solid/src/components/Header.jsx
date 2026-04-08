import { mergeProps, Show } from 'solid-js';

export function Header(props) {
  const merged = mergeProps({
    brand: '',
    sticky: false
  }, props);

  return (
    <header class={`cn-header ${merged.sticky ? 'cn-header-sticky' : ''}`}>
      <div class="cn-header-brand">
        <Show when={typeof merged.brand === 'string'} fallback={merged.brand}>
          <span class="cn-header-brand-text">{merged.brand}</span>
        </Show>
      </div>
      <nav class="cn-header-nav">
        {merged.children}
      </nav>
    </header>
  );
}
