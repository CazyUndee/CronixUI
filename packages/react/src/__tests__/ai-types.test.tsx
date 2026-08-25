import React from 'react';
import {
  ChatInterface,
  ChatInterfaceProps,
  ChatMessage,
  MessageBubble,
  MessageBubbleProps,
  MessageRole,
  TypingIndicator,
  TypingIndicatorProps,
  ModelSelector,
  ModelSelectorProps,
  ModelOption,
  TokenCounter,
  TokenCounterProps,
  CodeBlock,
  CodeBlockProps,
  CopyButton,
  CopyButtonProps,
  FeedbackButtons,
  FeedbackButtonsProps,
  PromptInput,
  PromptInputProps,
  StreamingText,
  StreamingTextProps,
  MarkdownRenderer,
  MarkdownRendererProps,
  ConversationHistory,
  ConversationHistoryProps,
  RAGReference,
  RAGReferenceProps,
  AIStatus,
  AIStatusProps,
  AIStatusType,
} from '../components/ai';

// Type test: ChatMessage
const chatMessage: ChatMessage = {
  id: '1',
  role: 'user',
  content: 'Hello',
  timestamp: new Date(),
  model: 'gpt-4',
  tokens: { prompt: 10, completion: 20 },
  references: [{ id: '1', title: 'Ref', snippet: 'snippet' }],
  isStreaming: false,
};

// Type test: ChatInterfaceProps (minimal)
const chatInterfaceMinimal: ChatInterfaceProps = {
  messages: [chatMessage],
};

// Type test: ChatInterfaceProps (full)
const chatInterfaceFull: ChatInterfaceProps = {
  messages: [chatMessage],
  models: [{ id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' }],
  selectedModel: 'gpt-4',
  onModelChange: (id: string) => {},
  onSend: (msg: string, model?: string) => {},
  onRegenerate: (id: string) => {},
  onCopy: (content: string) => {},
  status: 'generating',
  showTokenCounts: true,
  showModelSelector: true,
  className: 'custom',
};

// Type test: MessageRole
const roles: MessageRole[] = ['user', 'assistant', 'system'];

// Type test: MessageBubbleProps (minimal)
const messageBubbleMinimal: MessageBubbleProps = {
  role: 'assistant',
  content: 'Hello',
};

// Type test: MessageBubbleProps (full)
const messageBubbleFull: MessageBubbleProps = {
  role: 'assistant',
  content: 'Hello',
  rawContent: 'Hello',
  timestamp: new Date(),
  isStreaming: true,
  onCopy: (content: string) => {},
  actions: <button>Click</button>,
  className: 'custom',
};

// Type test: TypingIndicatorProps
const typingIndicatorProps: TypingIndicatorProps = {
  show: true,
  label: 'Thinking...',
  className: 'custom',
};

// Type test: ModelOption
const modelOption: ModelOption = {
  id: 'gpt-4',
  name: 'GPT-4',
  provider: 'OpenAI',
};

// Type test: ModelSelectorProps
const modelSelectorProps: ModelSelectorProps = {
  models: [modelOption],
  value: 'gpt-4',
  onChange: (id: string) => {},
  placeholder: 'Select model',
  disabled: false,
  className: 'custom',
};

// Type test: TokenCounterProps
const tokenCounterProps: TokenCounterProps = {
  promptTokens: 100,
  completionTokens: 200,
  maxTokens: 4096,
  showBreakdown: true,
  showProgress: true,
  className: 'custom',
};

// Type test: CodeBlockProps
const codeBlockProps: CodeBlockProps = {
  code: 'console.log("hello")',
  language: 'typescript',
  showLineNumbers: true,
  showCopyButton: true,
  highlightLines: [1, 3],
  maxHeight: '400px',
  className: 'custom',
};

// Type test: CopyButtonProps
const copyButtonProps: CopyButtonProps = {
  text: 'Copy this',
  onCopy: (text: string) => {},
  variant: 'icon',
  label: 'Copy',
  className: 'custom',
};

// Type test: FeedbackButtonsProps
const feedbackButtonsProps: FeedbackButtonsProps = {
  onFeedback: (type: 'up' | 'down', comment?: string) => {},
  showCommentInput: true,
  className: 'custom',
};

// Type test: PromptInputProps
const promptInputProps: PromptInputProps = {
  onSubmit: (message: string, model?: string) => {},
  models: [modelOption],
  selectedModel: 'gpt-4',
  onModelChange: (id: string) => {},
  loading: false,
  placeholder: 'Type a message...',
  showTokenCount: true,
  maxLength: 4096,
  className: 'custom',
};

// Type test: StreamingTextProps
const streamingTextProps: StreamingTextProps = {
  text: 'Hello world',
  speed: 20,
  showCursor: true,
  onComplete: () => {},
  className: 'custom',
};

// Type test: MarkdownRendererProps
const markdownRendererProps: MarkdownRendererProps = {
  content: '# Hello\n\n**Bold** text',
  className: 'custom',
};

// Type test: ConversationHistoryProps
const conversationHistoryProps: ConversationHistoryProps = {
  conversations: [
    { id: '1', title: 'Chat 1', lastMessage: 'Hello', timestamp: new Date() },
  ],
  selectedId: '1',
  onSelect: (id: string) => {},
  onDelete: (id: string) => {},
  onNew: () => {},
  className: 'custom',
};

// Type test: RAGReferenceProps
const ragReferenceProps: RAGReferenceProps = {
  id: '1',
  title: 'Document',
  snippet: 'This is a snippet...',
  score: 0.95,
  url: 'https://example.com',
  expanded: false,
  onToggle: (id: string) => {},
  className: 'custom',
};

// Type test: AIStatusType
const statusTypes: AIStatusType[] = ['idle', 'generating', 'streaming', 'error', 'success'];

// Type test: AIStatusProps
const aiStatusProps: AIStatusProps = {
  status: 'generating',
  showLabel: true,
  className: 'custom',
};

describe('AI Component Types', () => {
  it('ChatMessage has all required fields', () => {
    expect(chatMessage.id).toBe('1');
    expect(chatMessage.role).toBe('user');
    expect(chatMessage.content).toBe('Hello');
    expect(chatMessage.timestamp).toBeInstanceOf(Date);
    expect(chatMessage.model).toBe('gpt-4');
    expect(chatMessage.tokens?.prompt).toBe(10);
    expect(chatMessage.references?.length).toBe(1);
    expect(chatMessage.isStreaming).toBe(false);
  });

  it('ChatInterfaceProps accepts minimal props', () => {
    expect(chatInterfaceMinimal.messages.length).toBe(1);
  });

  it('ChatInterfaceProps accepts full props', () => {
    expect(chatInterfaceFull.models?.length).toBe(1);
    expect(chatInterfaceFull.status).toBe('generating');
    expect(chatInterfaceFull.onModelChange).toBeDefined();
    expect(chatInterfaceFull.onSend).toBeDefined();
  });

  it('MessageRole accepts all valid values', () => {
    expect(roles).toEqual(['user', 'assistant', 'system']);
  });

  it('MessageBubbleProps accepts minimal props', () => {
    expect(messageBubbleMinimal.role).toBe('assistant');
    expect(messageBubbleMinimal.content).toBe('Hello');
  });

  it('MessageBubbleProps accepts full props', () => {
    expect(messageBubbleFull.isStreaming).toBe(true);
    expect(messageBubbleFull.onCopy).toBeDefined();
    expect(messageBubbleFull.actions).toBeDefined();
  });

  it('TypingIndicatorProps works', () => {
    expect(typingIndicatorProps.show).toBe(true);
    expect(typingIndicatorProps.label).toBe('Thinking...');
  });

  it('ModelOption has required fields', () => {
    expect(modelOption.id).toBe('gpt-4');
    expect(modelOption.name).toBe('GPT-4');
    expect(modelOption.provider).toBe('OpenAI');
  });

  it('ModelSelectorProps works', () => {
    expect(modelSelectorProps.models.length).toBe(1);
    expect(modelSelectorProps.value).toBe('gpt-4');
  });

  it('TokenCounterProps works', () => {
    expect(tokenCounterProps.promptTokens).toBe(100);
    expect(tokenCounterProps.completionTokens).toBe(200);
    expect(tokenCounterProps.maxTokens).toBe(4096);
  });

  it('CodeBlockProps works', () => {
    expect(codeBlockProps.code).toBe('console.log("hello")');
    expect(codeBlockProps.language).toBe('typescript');
    expect(codeBlockProps.highlightLines).toEqual([1, 3]);
  });

  it('CopyButtonProps works', () => {
    expect(copyButtonProps.text).toBe('Copy this');
    expect(copyButtonProps.variant).toBe('icon');
  });

  it('FeedbackButtonsProps works', () => {
    expect(feedbackButtonsProps.onFeedback).toBeDefined();
    expect(feedbackButtonsProps.showCommentInput).toBe(true);
  });

  it('PromptInputProps works', () => {
    expect(promptInputProps.onSubmit).toBeDefined();
    expect(promptInputProps.models?.length).toBe(1);
    expect(promptInputProps.loading).toBe(false);
  });

  it('StreamingTextProps works', () => {
    expect(streamingTextProps.text).toBe('Hello world');
    expect(streamingTextProps.speed).toBe(20);
    expect(streamingTextProps.showCursor).toBe(true);
  });

  it('MarkdownRendererProps works', () => {
    expect(markdownRendererProps.content).toContain('# Hello');
  });

  it('ConversationHistoryProps works', () => {
    expect(conversationHistoryProps.conversations.length).toBe(1);
    expect(conversationHistoryProps.selectedId).toBe('1');
  });

  it('RAGReferenceProps works', () => {
    expect(ragReferenceProps.id).toBe('1');
    expect(ragReferenceProps.score).toBe(0.95);
  });

  it('AIStatusType accepts all valid values', () => {
    expect(statusTypes).toEqual(['idle', 'generating', 'streaming', 'error', 'success']);
  });

  it('AIStatusProps works', () => {
    expect(aiStatusProps.status).toBe('generating');
    expect(aiStatusProps.showLabel).toBe(true);
  });
});
