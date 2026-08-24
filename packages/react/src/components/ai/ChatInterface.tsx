import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { MessageBubble, MessageRole } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { PromptInput } from './PromptInput';
import { ModelSelector, ModelOption } from './ModelSelector';
import { TokenCounter } from './TokenCounter';
import { StreamingText } from './StreamingText';
import { AIStatus, AIStatusType } from './AIStatus';
import { MarkdownRenderer } from './MarkdownRenderer';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  model?: string;
  tokens?: { prompt: number; completion: number };
  references?: Array<{ id: string; title: string; snippet: string }>;
  isStreaming?: boolean;
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  models?: ModelOption[];
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
  onSend?: (message: string, model?: string) => void;
  onRegenerate?: (messageId: string) => void;
  onCopy?: (content: string) => void;
  status?: AIStatusType;
  showTokenCounts?: boolean;
  showModelSelector?: boolean;
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  models,
  selectedModel,
  onModelChange,
  onSend,
  onRegenerate,
  onCopy,
  status = 'idle',
  showTokenCounts = false,
  showModelSelector = true,
  className,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isAutoScroll && messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch {
        // scrollIntoView may not be available in test environments
      }
    }
  }, [messages, isAutoScroll]);

  const handleScroll = (e: React.UIEvent) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    setIsAutoScroll(isAtBottom);
  };

  return (
    <div className={cn('cn-chat-interface', className)}>
      {/* Header */}
      <div className="cn-chat-header">
        <h2 className="cn-chat-title">Chat</h2>
        <div className="cn-chat-header-right">
          <AIStatus status={status} />
          {showModelSelector && models && models.length > 0 && (
            <ModelSelector
              models={models}
              value={selectedModel || ''}
              onChange={onModelChange || (() => {})}
              placeholder="Select model"
            />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="cn-chat-messages" onScroll={handleScroll} role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className="cn-chat-message-wrapper">
            <MessageBubble
              role={msg.role}
              content={
                msg.isStreaming ? (
                  <StreamingText text={msg.content} showCursor />
                ) : (
                  <MarkdownRenderer content={msg.content} />
                )
              }
              rawContent={msg.content}
              timestamp={msg.timestamp}
              isStreaming={msg.isStreaming}
              onCopy={onCopy}
              actions={
                msg.role === 'assistant' && !msg.isStreaming ? (
                  <button
                    className="cn-chat-regenerate"
                    onClick={() => onRegenerate?.(msg.id)}
                    aria-label="Regenerate response"
                  >
                    ↻
                  </button>
                ) : undefined
              }
            />
            {showTokenCounts && msg.tokens && (
              <div className="cn-chat-token-info">
                <TokenCounter
                  promptTokens={msg.tokens.prompt}
                  completionTokens={msg.tokens.completion}
                  showBreakdown
                />
              </div>
            )}
            {msg.references && msg.references.length > 0 && (
              <div className="cn-chat-references">
                {msg.references.map((ref) => (
                  <span key={ref.id} className="cn-chat-reference" title={ref.snippet}>
                    📄 {ref.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {status === 'generating' && (
          <TypingIndicator show label="Thinking..." />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="cn-chat-input-container">
        <PromptInput
          onSubmit={onSend}
          models={models}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          loading={status === 'generating' || status === 'streaming'}
          showTokenCount={showTokenCounts}
        />
      </div>
    </div>
  );
};
