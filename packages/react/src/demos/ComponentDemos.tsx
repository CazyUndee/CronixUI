import React, { useState, useCallback } from 'react';
import {
  ChatInterface,
  MessageBubble,
  TypingIndicator,
  ModelSelector,
  TokenCounter,
  CodeBlock,
  CopyButton,
  FeedbackButtons,
  PromptInput,
  StreamingText,
  MarkdownRenderer,
  ConversationHistory,
  RAGReference,
  AIStatus,
} from '../components/ai';
import type { ChatMessage, ModelOption, Conversation, Reference } from '../components/ai';

// Shared demo styles
const styles = {
  section: {
    padding: '2rem',
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    border: '1px solid #333',
    marginBottom: '2rem',
  },
  title: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#888',
    marginBottom: '1.5rem',
  },
  demoArea: {
    backgroundColor: '#111',
    padding: '1.5rem',
    borderRadius: '8px',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const,
    marginBottom: '1rem',
  },
};

// Demo data
const MODELS: ModelOption[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', contextLength: 128000 },
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI', contextLength: 16384 },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', contextLength: 200000 },
];

const SAMPLE_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hello! How are you?', timestamp: new Date(Date.now() - 120000) },
  { id: '2', role: 'assistant', content: "I'm doing well! Thanks for asking. How can I help you today?", timestamp: new Date(Date.now() - 60000), model: 'gpt-4' },
  { id: '3', role: 'system', content: 'Session started', timestamp: new Date(Date.now() - 180000) },
];

const SAMPLE_CONVERSATIONS: Conversation[] = [
  { id: '1', title: 'React hooks', lastMessage: 'useEffect cleanup...', timestamp: new Date(), messageCount: 5 },
  { id: '2', title: 'TypeScript tips', lastMessage: 'Generics are useful...', timestamp: new Date(Date.now() - 86400000), messageCount: 3 },
];

const SAMPLE_REFERENCES: Reference[] = [
  { id: '1', title: 'React Docs', source: 'react.dev', snippet: 'Hooks let you use state...', score: 0.95 },
  { id: '2', title: 'MDN', source: 'developer.mozilla.org', snippet: 'The useState hook...', score: 0.88 },
];

// Individual Demo Components
export const ChatInterfaceDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [model, setModel] = useState('gpt-4');
  const [status, setStatus] = useState<'idle' | 'generating'>('idle');

  const handleSend = useCallback((message: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: message, timestamp: new Date() }]);
    setStatus('generating');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Response to: "${message}"`, timestamp: new Date(), model, tokens: { prompt: 10, completion: 20 } }]);
      setStatus('idle');
    }, 1500);
  }, [model]);

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>💬 ChatInterface</h2>
      <p style={styles.subtitle}>Full-featured chat with messages, model selection, and status</p>
      <div style={{ height: '400px' }}>
        <ChatInterface messages={messages} models={MODELS} selectedModel={model} onModelChange={setModel} onSend={handleSend} status={status} showTokenCounts />
      </div>
    </div>
  );
};

export const MessageBubbleDemo: React.FC = () => (
  <div style={styles.section}>
    <h2 style={styles.title}>💭 MessageBubble</h2>
    <p style={styles.subtitle}>Individual message with role-based styling</p>
    <div style={styles.demoArea}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MessageBubble role="user" content="What's the weather today?" timestamp={new Date()} />
        <MessageBubble role="assistant" content="I don't have access to real-time data, but I can help with other questions!" timestamp={new Date()} />
        <MessageBubble role="system" content="System: Session initialized" timestamp={new Date()} />
      </div>
    </div>
  </div>
);

export const TypingIndicatorDemo: React.FC = () => {
  const [show, setShow] = useState(true);
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>⏳ TypingIndicator</h2>
      <p style={styles.subtitle}>Animated indicator for AI processing</p>
      <div style={styles.demoArea}>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'} Indicator
          </button>
        </div>
        <TypingIndicator show={show} label="Thinking..." />
      </div>
    </div>
  );
};

export const ModelSelectorDemo: React.FC = () => {
  const [model, setModel] = useState('gpt-4');
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>🎯 ModelSelector</h2>
      <p style={styles.subtitle}>Searchable model selection dropdown</p>
      <div style={styles.demoArea}>
        <ModelSelector models={MODELS} value={model} onChange={setModel} placeholder="Select model" />
        <p style={{ color: '#888', marginTop: '1rem' }}>Selected: {model}</p>
      </div>
    </div>
  );
};

export const TokenCounterDemo: React.FC = () => {
  const [tokens, setTokens] = useState({ prompt: 500, completion: 200, max: 4096 });
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>🔢 TokenCounter</h2>
      <p style={styles.subtitle}>Track token usage with progress</p>
      <div style={styles.demoArea}>
        <TokenCounter promptTokens={tokens.prompt} completionTokens={tokens.completion} maxTokens={tokens.max} showBreakdown />
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => setTokens(prev => ({ ...prev, prompt: prev.prompt + 100 }))}>+100 tokens</button>
          <button style={styles.button} onClick={() => setTokens({ prompt: 0, completion: 0, max: 4096 })}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export const CodeBlockDemo: React.FC = () => (
  <div style={styles.section}>
    <h2 style={styles.title}>💻 CodeBlock</h2>
    <p style={styles.subtitle}>Syntax-highlighted code with copy</p>
    <div style={styles.demoArea}>
      <CodeBlock code={`const greeting = "Hello, CronixUI!";\nconsole.log(greeting);`} language="typescript" showLineNumbers filename="demo.ts" />
    </div>
  </div>
);

export const CopyButtonDemo: React.FC = () => (
  <div style={styles.section}>
    <h2 style={styles.title}>📋 CopyButton</h2>
    <p style={styles.subtitle}>One-click clipboard copy</p>
    <div style={styles.demoArea}>
      <div style={styles.buttonGroup}>
        <CopyButton text="Hello, World!" label="Copy greeting" copiedLabel="Copied!" />
        <CopyButton text="npm install @cronixui/react" label="Copy command" copiedLabel="Copied!" timeout={3000} />
      </div>
    </div>
  </div>
);

export const FeedbackButtonsDemo: React.FC = () => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>👍 FeedbackButtons</h2>
      <p style={styles.subtitle}>Collect response feedback</p>
      <div style={styles.demoArea}>
        <FeedbackButtons onFeedback={(f) => setFeedback(f)} showComment />
        {feedback && <p style={{ color: '#888', marginTop: '1rem' }}>Last: {feedback}</p>}
      </div>
    </div>
  );
};

export const PromptInputDemo: React.FC = () => {
  const [model, setModel] = useState('gpt-4');
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>✏️ PromptInput</h2>
      <p style={styles.subtitle}>Auto-resizing prompt textarea</p>
      <div style={styles.demoArea}>
        <PromptInput models={MODELS} selectedModel={model} onModelChange={setModel} placeholder="Ask anything..." showTokenCount onSubmit={(m) => alert(m)} />
      </div>
    </div>
  );
};

export const StreamingTextDemo: React.FC = () => {
  const [text, setText] = useState('');
  const [streaming, setStreaming] = useState(false);
  const fullText = 'Streaming text appears character by character.';

  const start = () => {
    setText('');
    setStreaming(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setStreaming(false);
      }
    }, 30);
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>📺 StreamingText</h2>
      <p style={styles.subtitle}>Character-by-character reveal</p>
      <div style={styles.demoArea}>
        <button style={styles.button} onClick={start} disabled={streaming}>{streaming ? 'Streaming...' : 'Start'}</button>
        <div style={{ marginTop: '1rem' }}>
          <StreamingText text={text} showCursor={streaming} />
        </div>
      </div>
    </div>
  );
};

export const MarkdownRendererDemo: React.FC = () => (
  <div style={styles.section}>
    <h2 style={styles.title}>📝 MarkdownRenderer</h2>
    <p style={styles.subtitle}>Render markdown content</p>
    <div style={styles.demoArea}>
      <MarkdownRenderer content="# Hello\n\n**Bold** and *italic*.\n\n```js\nconsole.log('code');\n```" />
    </div>
  </div>
);

export const ConversationHistoryDemo: React.FC = () => {
  const [active, setActive] = useState('1');
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>📚 ConversationHistory</h2>
      <p style={styles.subtitle}>Browse past conversations</p>
      <div style={styles.demoArea}>
        <ConversationHistory conversations={SAMPLE_CONVERSATIONS} activeId={active} onSelect={setActive} onNewChat={() => alert('New chat')} />
      </div>
    </div>
  );
};

export const RAGReferenceDemo: React.FC = () => (
  <div style={styles.section}>
    <h2 style={styles.title}>🔗 RAGReference</h2>
    <p style={styles.subtitle}>Source references with relevance scores</p>
    <div style={styles.demoArea}>
      <RAGReference references={SAMPLE_REFERENCES} expandable />
    </div>
  </div>
);

export const AIStatusDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'generating' | 'streaming' | 'error' | 'rate-limited'>('idle');
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>⚡ AIStatus</h2>
      <p style={styles.subtitle}>Current processing status</p>
      <div style={styles.demoArea}>
        <div style={styles.buttonGroup}>
          {(['idle', 'generating', 'streaming', 'error', 'rate-limited'] as const).map(s => (
            <button key={s} style={{ ...styles.button, backgroundColor: status === s ? '#6366f1' : '#333' }} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
        <AIStatus status={status} model="GPT-4" errorMessage={status === 'error' ? 'Error occurred' : undefined} retryAfter={status === 'rate-limited' ? 30 : undefined} />
      </div>
    </div>
  );
};
