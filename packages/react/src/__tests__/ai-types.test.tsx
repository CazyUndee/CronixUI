/**
 * TypeScript type tests for AI components
 *
 * These tests verify that all AI component props and interfaces
 * compile correctly at type-check time.
 */

// Only import types, not runtime components
import type {
  ChatInterfaceProps,
  ChatMessage,
  MessageBubbleProps,
  MessageRole,
  TypingIndicatorProps,
  ModelSelectorProps,
  ModelOption,
  TokenCounterProps,
  CodeBlockProps,
  CopyButtonProps,
  FeedbackButtonsProps,
  PromptInputProps,
  StreamingTextProps,
  MarkdownRendererProps,
  ConversationHistoryProps,
  RAGReferenceProps,
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
  onModelChange: (_id: string) => {},
  onSend: (_msg: string, _model?: string) => {},
  onRegenerate: (_id: string) => {},
  onCopy: (_content: string) => {},
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
  onCopy: (_content: string) => {},
  actions: null,
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
  onChange: (_id: string) => {},
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
  className: 'custom',
};

// Type test: CodeBlockProps (correct API)
const codeBlockProps: CodeBlockProps = {
  code: 'console.log("hello")',
  language: 'typescript',
  showLineNumbers: true,
  maxHeight: 400,
  filename: 'index.ts',
  className: 'custom',
};

// Type test: CopyButtonProps (correct API)
const copyButtonProps: CopyButtonProps = {
  text: 'Copy this',
  label: 'Copy',
  copiedLabel: 'Copied!',
  showIcon: true,
  timeout: 2000,
  className: 'custom',
};

// Type test: FeedbackButtonsProps (correct API)
const feedbackButtonsProps: FeedbackButtonsProps = {
  onFeedback: (_feedback: 'positive' | 'negative' | null, _comment?: string) => {},
  showComment: true,
  className: 'custom',
};

// Type test: PromptInputProps
const promptInputProps: PromptInputProps = {
  onSubmit: (_message: string, _model?: string) => {},
  models: [modelOption],
  selectedModel: 'gpt-4',
  onModelChange: (_id: string) => {},
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

// Type test: ConversationHistoryProps (correct API)
const conversationHistoryProps: ConversationHistoryProps = {
  conversations: [
    { id: '1', title: 'Chat 1', lastMessage: 'Hello', timestamp: new Date(), messageCount: 5 },
  ],
  activeId: '1',
  onSelect: (_id: string) => {},
  onDelete: (_id: string) => {},
  onNewChat: () => {},
  className: 'custom',
};

// Type test: RAGReferenceProps (correct API)
const ragReferenceProps: RAGReferenceProps = {
  references: [
    { id: '1', title: 'Document', source: 'web', snippet: 'This is a snippet...', score: 0.95 },
  ],
  expandable: true,
  className: 'custom',
};

// Type test: AIStatusType (correct values)
const statusTypes: AIStatusType[] = ['idle', 'generating', 'streaming', 'error', 'rate-limited'];

// Type test: AIStatusProps (correct API)
const aiStatusProps: AIStatusProps = {
  status: 'generating',
  model: 'gpt-4',
  errorMessage: 'Something went wrong',
  retryAfter: 30,
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
    expect(messageBubbleFull.actions).toBeNull();
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
    expect(codeBlockProps.maxHeight).toBe(400);
  });

  it('CopyButtonProps works', () => {
    expect(copyButtonProps.text).toBe('Copy this');
    expect(copyButtonProps.label).toBe('Copy');
  });

  it('FeedbackButtonsProps works', () => {
    expect(feedbackButtonsProps.onFeedback).toBeDefined();
    expect(feedbackButtonsProps.showComment).toBe(true);
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
    expect(conversationHistoryProps.activeId).toBe('1');
  });

  it('RAGReferenceProps works', () => {
    expect(ragReferenceProps.references.length).toBe(1);
    expect(ragReferenceProps.references[0].score).toBe(0.95);
  });

  it('AIStatusType accepts all valid values', () => {
    expect(statusTypes).toEqual(['idle', 'generating', 'streaming', 'error', 'rate-limited']);
  });

  it('AIStatusProps works', () => {
    expect(aiStatusProps.status).toBe('generating');
    expect(aiStatusProps.model).toBe('gpt-4');
  });
});
