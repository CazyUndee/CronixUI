import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  showIcon?: boolean;
  timeout?: number;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  showIcon = true,
  timeout = 2000,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    }
  };

  return (
    <button
      className={cn('cn-copy-button', copied && 'cn-copy-button-copied', className)}
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
    >
      {showIcon && <span className="cn-copy-icon">{copied ? '✓' : '📋'}</span>}
      <span className="cn-copy-text">{copied ? copiedLabel : label}</span>
    </button>
  );
};
