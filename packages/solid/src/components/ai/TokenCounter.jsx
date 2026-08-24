import { createMemo } from 'solid-js';

export default function TokenCounter(props) {
  const percentage = createMemo(() => {
    if (!props.maxTokens) return 0;
    return Math.min(100, (props.count / props.maxTokens) * 100);
  });

  const status = createMemo(() => {
    const pct = percentage();
    if (pct >= 90) return 'danger';
    if (pct >= 70) return 'warning';
    return 'normal';
  });

  const formatCount = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  };

  return (
    <div 
      class={`cn-token-counter cn-token-${status()}`}
      role="status"
      aria-label={`${formatCount(props.count)} tokens used`}
    >
      <div class="cn-token-info">
        <span class="cn-token-label">Tokens</span>
        <span class="cn-token-count">{formatCount(props.count)}</span>
        {props.maxTokens && (
          <span class="cn-token-max">/ {formatCount(props.maxTokens)}</span>
        )}
      </div>

      {props.maxTokens && (
        <div class="cn-token-bar">
          <div 
            class="cn-token-bar-fill" 
            style={{ width: `${percentage()}%` }}
          />
        </div>
      )}

      <style>{`
        .cn-token-counter {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        .cn-token-info {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .cn-token-label {
          color: var(--cn-text-secondary);
          font-weight: 500;
        }

        .cn-token-count {
          color: var(--cn-text-primary);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .cn-token-max {
          color: var(--cn-text-tertiary);
          font-size: 12px;
        }

        .cn-token-bar {
          height: 4px;
          background: var(--cn-bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }

        .cn-token-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 200ms ease;
        }

        .cn-token-normal .cn-token-bar-fill {
          background: var(--cn-primary);
        }

        .cn-token-warning .cn-token-bar-fill {
          background: var(--cn-warning);
        }

        .cn-token-warning .cn-token-count {
          color: var(--cn-warning);
        }

        .cn-token-danger .cn-token-bar-fill {
          background: var(--cn-error);
        }

        .cn-token-danger .cn-token-count {
          color: var(--cn-error);
        }
      `}</style>
    </div>
  );
}
