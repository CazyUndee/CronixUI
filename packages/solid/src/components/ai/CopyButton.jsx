import { createSignal, Show } from 'solid-js';

export default function CopyButton(props) {
  const [copied, setCopied] = createSignal(false);
  const [error, setError] = createSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.text || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      props.onCopy?.();
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      props.onError?.(err);
    }
  };

  return (
    <button
      class={`cn-copy-button ${copied() ? 'cn-copy-success' : ''} ${error() ? 'cn-copy-error' : ''}`}
      onClick={handleCopy}
      disabled={props.disabled || !props.text}
      aria-label={copied() ? 'Copied!' : 'Copy to clipboard'}
      title={copied() ? 'Copied!' : 'Copy'}
    >
      <Show when={copied()} fallback={
        <Show when={error()} fallback={
          <span class="cn-copy-icon">⎘</span>
        }>
          <span class="cn-copy-icon">✕</span>
        </Show>
      }>
        <span class="cn-copy-icon">✓</span>
      </Show>

      <style>{`
        .cn-copy-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          border-radius: 4px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--cn-text-secondary);
          cursor: pointer;
          transition: all 150ms ease;
        }

        .cn-copy-button:hover:not(:disabled) {
          background: var(--cn-bg-hover);
          border-color: var(--cn-border-default);
        }

        .cn-copy-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cn-copy-icon {
          font-size: 14px;
        }

        .cn-copy-success {
          color: var(--cn-success);
        }

        .cn-copy-error {
          color: var(--cn-error);
        }
      `}</style>
    </button>
  );
}
