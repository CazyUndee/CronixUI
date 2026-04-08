import { mergeProps, For, Show } from 'solid-js';

export function Footer(props) {
  const merged = mergeProps({
    copyright: '',
    links: []
  }, props);

  return (
    <footer class="cn-footer">
      <Show when={merged.links.length > 0}>
        <nav class="cn-footer-links">
          <For each={merged.links}>{(link) => (
            <a
              class="cn-footer-link"
              href={link.href || '#'}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          )}</For>
        </nav>
      </Show>
      <Show when={merged.copyright}>
        <div class="cn-footer-copyright">{merged.copyright}</div>
      </Show>
    </footer>
  );
}
