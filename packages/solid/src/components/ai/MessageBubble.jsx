import { Show, createMemo } from 'solid-js';

export default function MessageBubble(props) {
  const isUser = createMemo(() => props.role === 'user');
  const isAssistant = createMemo(() => props.role === 'assistant');

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const statusIcon = createMemo(() => {
    switch (props.status) {
      case 'sending': return '⏳';
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'error': return '❌';
      default: return null;
    }
  });

  return (
    <div 
      class={`cn-message-bubble ${isUser() ? 'cn-message-user' : 'cn-message-assistant'}`}
      role="article"
      aria-label={`${props.role} message`}
    >
      <Show when={props.avatar}>
        <div class="cn-message-avatar">
          {props.avatar}
        </div>
      </Show>

      <div class="cn-message-content">
        <Show when={props.showHeader !== false}>
          <div class="cn-message-header">
            <span class="cn-message-role">
              {isUser() ? 'You' : 'Assistant'}
            </span>
            <Show when={props.timestamp}>
              <span class="cn-message-timestamp">
                {formatTimestamp(props.timestamp)}
              </span>
            </Show>
          </div>
        </Show>

        <div class="cn-message-text">
          {props.content}
        </div>

        <Show when={props.status}>
          <div class="cn-message-status">
            {statusIcon()}
          </div>
        </Show>
      </div>

      <style>{`
        .cn-message-bubble {
          display: flex;
          gap: 12px;
          padding: 8px 0;
          max-width: 80%;
        }

        .cn-message-user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .cn-message-assistant {
          margin-right: auto;
        }

        .cn-message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cn-bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 14px;
        }

        .cn-message-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cn-message-header {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: var(--cn-text-secondary);
        }

        .cn-message-role {
          font-weight: 600;
          color: var(--cn-text-primary);
        }

        .cn-message-timestamp {
          color: var(--cn-text-tertiary);
        }

        .cn-message-text {
          padding: 12px 16px;
          border-radius: 16px;
          background: var(--cn-bg-secondary);
          border: 1px solid var(--cn-border-default);
          line-height: 1.5;
          word-wrap: break-word;
        }

        .cn-message-user .cn-message-text {
          background: var(--cn-primary);
          color: white;
          border-color: var(--cn-primary);
        }

        .cn-message-status {
          font-size: 12px;
          color: var(--cn-text-tertiary);
          text-align: right;
        }
      `}</style>
    </div>
  );
}
