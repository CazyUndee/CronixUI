import React from 'react';
import { cn } from '../../utils/cn';

export type AIStatusType = 'idle' | 'generating' | 'streaming' | 'error' | 'rate-limited';

export interface AIStatusProps {
  status: AIStatusType;
  model?: string;
  errorMessage?: string;
  retryAfter?: number;
  className?: string;
}

const statusConfig: Record<AIStatusType, { label: string; color: string; icon: string }> = {
  idle: { label: 'Ready', color: 'success', icon: '●' },
  generating: { label: 'Generating', color: 'warning', icon: '◉' },
  streaming: { label: 'Streaming', color: 'info', icon: '◉' },
  error: { label: 'Error', color: 'error', icon: '✕' },
  'rate-limited': { label: 'Rate Limited', color: 'warning', icon: '◉' },
};

export const AIStatus: React.FC<AIStatusProps> = ({
  status,
  model,
  errorMessage,
  retryAfter,
  className,
}) => {
  const config = statusConfig[status];

  return (
    <div className={cn('cn-ai-status', `cn-ai-status-${config.color}`, className)} role="status" aria-live="polite">
      <span className={cn('cn-ai-status-dot', status === 'generating' || status === 'streaming' ? 'cn-ai-status-pulse' : '')}>
        {config.icon}
      </span>
      <span className="cn-ai-status-label">{config.label}</span>
      {model && <span className="cn-ai-status-model">{model}</span>}
      {status === 'error' && errorMessage && (
        <span className="cn-ai-status-error">{errorMessage}</span>
      )}
      {status === 'rate-limited' && retryAfter && (
        <span className="cn-ai-status-retry">Retry in {retryAfter}s</span>
      )}
    </div>
  );
};
