import React from 'react';
import { cn } from '../../utils/cn';

export interface TypingIndicatorProps {
  show?: boolean;
  label?: string;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  show = true,
  label = 'Thinking',
  className,
}) => {
  if (!show) return null;

  return (
    <div className={cn('cn-typing-indicator', className)} role="status" aria-label={label}>
      <div className="cn-typing-dots">
        <span className="cn-typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="cn-typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="cn-typing-dot" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="cn-typing-label">{label}</span>
    </div>
  );
};
