import React from 'react';
import { cn } from '../../utils/cn';

export interface TokenCounterProps {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  maxTokens?: number;
  showBreakdown?: boolean;
  className?: string;
}

export const TokenCounter: React.FC<TokenCounterProps> = ({
  promptTokens = 0,
  completionTokens = 0,
  totalTokens,
  maxTokens,
  showBreakdown = true,
  className,
}) => {
  const total = totalTokens ?? promptTokens + completionTokens;
  const percentage = maxTokens ? Math.min((total / maxTokens) * 100, 100) : null;

  return (
    <div className={cn('cn-token-counter', className)} aria-label={`${total} tokens used`}>
      {percentage !== null && (
        <div className="cn-token-bar">
          <div
            className={cn('cn-token-bar-fill', percentage > 80 && 'cn-token-bar-warning', percentage > 95 && 'cn-token-bar-danger')}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      <div className="cn-token-info">
        <span className="cn-token-total">{total.toLocaleString()} tokens</span>
        {showBreakdown && (
          <span className="cn-token-breakdown">
            ({promptTokens.toLocaleString()} prompt + {completionTokens.toLocaleString()} completion)
          </span>
        )}
        {maxTokens && (
          <span className="cn-token-limit">
            / {maxTokens.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};
