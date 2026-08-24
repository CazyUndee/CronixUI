import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { ModelSelector, ModelOption } from './ModelSelector';
import { TokenCounter } from './TokenCounter';

export interface PromptInputProps {
  onSubmit?: (prompt: string, model?: string) => void;
  models?: ModelOption[];
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  showTokenCount?: boolean;
  className?: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  models,
  selectedModel,
  onModelChange,
  placeholder = 'Ask AI anything...',
  disabled = false,
  loading = false,
  maxLength = 10000,
  showTokenCount = false,
  className,
}) => {
  const [prompt, setPrompt] = useState('');
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple token estimation (roughly 4 chars per token)
  useEffect(() => {
    setTokenEstimate(Math.ceil(prompt.length / 4));
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || disabled || loading) return;
    onSubmit?.(prompt, selectedModel);
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    setPrompt(textarea.value);
  };

  return (
    <div className={cn('cn-prompt-input', className)}>
      <div className="cn-prompt-input-toolbar">
        {models && models.length > 0 && (
          <ModelSelector
            models={models}
            value={selectedModel || ''}
            onChange={onModelChange || (() => {})}
            placeholder="Select model"
          />
        )}
      </div>

      <div className="cn-prompt-input-main">
        <textarea
          ref={textareaRef}
          className="cn-prompt-textarea"
          placeholder={placeholder}
          value={prompt}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          maxLength={maxLength}
          rows={1}
          aria-label="AI prompt input"
        />
        <button
          className={cn('cn-prompt-submit', (!prompt.trim() || disabled || loading) && 'cn-prompt-submit-disabled')}
          onClick={handleSubmit}
          disabled={!prompt.trim() || disabled || loading}
          aria-label="Send prompt"
        >
          {loading ? (
            <span className="cn-prompt-loading">
              <span className="cn-spinner-small" />
            </span>
          ) : (
            <span className="cn-prompt-send-icon">↑</span>
          )}
        </button>
      </div>

      <div className="cn-prompt-footer">
        <span className="cn-prompt-hint">
          Press Enter to send · Shift+Enter for new line
        </span>
        {showTokenCount && (
          <TokenCounter
            promptTokens={tokenEstimate}
            completionTokens={0}
            showBreakdown={false}
          />
        )}
      </div>
    </div>
  );
};
