import { createSignal, For, Show } from 'solid-js';

export function RAGReference(props) {
  const [expanded, setExpanded] = createSignal(!props.expandable);

  const references = () => props.references || [];

  return (
    <Show when={references().length > 0}>
      <div class={props.className ? `cn-rag-reference ${props.className}` : 'cn-rag-reference'}>
        <Show when={props.expandable}>
          <button
            class="cn-rag-toggle"
            onClick={() => setExpanded(!expanded())}
            aria-expanded={expanded()}
          >
            📚 Sources ({references().length})
            <span class="cn-rag-chevron">{expanded() ? '▲' : '▼'}</span>
          </button>
        </Show>

        <Show when={expanded()}>
          <div class="cn-rag-list">
            <For each={references()}>
              {(ref) => (
                <div class="cn-rag-item">
                  <div class="cn-rag-item-header">
                    <span class="cn-rag-item-title">{ref.title}</span>
                    <span class="cn-rag-item-source">{ref.source}</span>
                    <Show when={ref.score !== undefined}>
                      <span class="cn-rag-item-score">
                        {Math.round(ref.score * 100)}% match
                      </span>
                    </Show>
                  </div>
                  <div class="cn-rag-item-snippet">{ref.snippet}</div>
                  <Show when={ref.url}>
                    <a
                      class="cn-rag-item-link"
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source →
                    </a>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </Show>
  );
}
