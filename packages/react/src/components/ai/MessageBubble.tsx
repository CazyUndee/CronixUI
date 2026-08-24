import React from 'react';
import { cn } from '../../utils/cn';

export type MessageRole = 'user' | 'assistant' | 'system' | 'function';

export interface MessageBubbleProps {
  role: MessageRole;
  content: React.ReactNode;
  rawContent?: string;
  timestamp?: Date;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  isStreaming?: boolean;
  className?: string;
  onCopy?: (content: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  role,
  content,
  rawContent,
  timestamp,
  avatar,
  actions,
  isStreaming = false,
  className,
  onCopy,
}) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'cn-message-bubble',
        `cn-message-${role}`,
        isStreaming && 'cn-message-streaming',
        className
      )}
      role="article"
      aria-label={`${role} message`}
    >
      {!isUser && avatar && (
        <div className="cn-message-avatar">{avatar}</div>
      )}
      <div className="cn-message-content-wrapper">
        <div className={cn('cn-message-bubble-inner', isUser && 'cn-message-user')}>
          <div className="cn-message-role">{role}</div>
          <div className={cn('cn-message-content', isStreaming && 'cn-message-content-streaming')}>
            {content}
            {isStreaming && <span className="cn-cursor-blink">|</span>}
          </div>
        </div>
        <div className="cn-message-meta">
          {timestamp && (
            <span className="cn-message-time">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {actions && <div className="cn-message-actions">{actions}</div>}
          {onCopy && (
            <button
              className="cn-message-copy"
              onClick={() => onCopy(rawContent || (typeof content === 'string' ? content : ''))}
              aria-label="Copy message"
            >
              📋
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
