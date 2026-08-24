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

// Demo data
const DEMO_MODELS: ModelOption[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', description: 'Most capable model', contextLength: 128000, costPer1k: 0.03 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', description: 'Fast and efficient', contextLength: 16384, costPer1k: 0.002 },
  { id: 'claude-3', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Advanced reasoning', contextLength: 200000, costPer1k: 0.015 },
  { id: 'llama-3', name: 'Llama 3 70B', provider: 'Meta', description: 'Open source', contextLength: 8192, costPer1k: 0.001 },
];

const DEMO_CONVERSATIONS: Conversation[] = [
  { id: '1', title: 'React hooks explained', lastMessage: 'Hooks let you use state in functions...', timestamp: new Date(Date.now() - 3600000), model: 'gpt-4', messageCount: 12 },
  { id: '2', title: 'TypeScript generics', lastMessage: 'Generics provide type safety...', timestamp: new Date(Date.now() - 86400000), model: 'claude-3', messageCount: 8 },
  { id: '3', title: 'API design patterns', lastMessage: 'REST vs GraphQL trade-offs...', timestamp: new Date(Date.now() - 172800000), model: 'gpt-3.5-turbo', messageCount: 15 },
];

const DEMO_REFERENCES: Reference[] = [
  { id: '1', title: 'React Documentation', source: 'react.dev', snippet: 'Hooks let you use state and other React features without writing a class.', score: 0.95, url: 'https://react.dev' },
  { id: '2', title: 'MDN Web Docs', source: 'developer.mozilla.org', snippet: 'The useState hook lets you add state to functional components.', score: 0.88, url: 'https://developer.mozilla.org' },
  { id: '3', title: 'GitHub Repository', source: 'github.com', snippet: 'Custom hooks for reusable stateful logic.', score: 0.72 },
];

const DEMO_MARKDOWN = `# AI Component Demo

This is a **Markdown** renderer example.

## Features
- Supports *italics* and **bold**
- Code blocks with syntax highlighting
- Lists and tables
- Links and images

### Code Example
\`\`\`typescript
const greeting = "Hello, CronixUI!";
console.log(greeting);
\`\`\`

> This is a blockquote for important information.

---

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Code | ✅ |
| Tables | ✅ |`;

// Section wrapper component
const DemoSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#1a1a2e', borderRadius: '12px', border: '1px solid #333' }}>
    <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{title}</h2>
    <p style={{ color: '#aaa', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{description}</p>
    {children}
  </div>
);

// Interactive Chat Demo
const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'user', content: 'What are the benefits of using CronixUI?', timestamp: new Date(Date.now() - 60000) },
    { id: '2', role: 'assistant', content: 'CronixUI provides **cross-framework components** with consistent APIs across React, Vue, Svelte, and more. Key benefits:\n\n- 🎯 **Type safety** with TypeScript\n- 🎨 **Theme support** with CSS custom properties\n- ♿ **Accessibility** built-in\n- 📦 **Tree-shakable** imports', timestamp: new Date(Date.now() - 30000), model: 'gpt-4', tokens: { prompt: 24, completion: 89 } },
  ]);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [status, setStatus] = useState<'idle' | 'generating'>('idle');

  const handleSend = useCallback((message: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setStatus('generating');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Great question! Here's a detailed response about "${message}".\n\nThis is a simulated response that demonstrates the **ChatInterface** component with streaming capabilities.`,
        timestamp: new Date(),
        model: selectedModel,
        tokens: { prompt: Math.floor(Math.random() * 100), completion: Math.floor(Math.random() * 200) },
      };
      setMessages(prev => [...prev, aiMsg]);
      setStatus('idle');
    }, 2000);
  }, [selectedModel]);

  return (
    <div style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <ChatInterface
        messages={messages}
        models={DEMO_MODELS}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSend={handleSend}
        status={status}
        showTokenCounts
        showModelSelector
      />
    </div>
  );
};

// Streaming Text Demo
const StreamingDemo: React.FC = () => {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const fullText = 'CronixUI is a modern component library that provides native implementations across React, Vue, Svelte, Solid, Flutter, Go, Rust, and Python. It features consistent theming, accessibility, and developer experience.';

  const startStreaming = () => {
    setText('');
    setIsStreaming(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 30);
  };

  return (
    <div>
      <button
        onClick={startStreaming}
        disabled={isStreaming}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: isStreaming ? '#666' : '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: isStreaming ? 'not-allowed' : 'pointer',
          marginBottom: '1rem',
        }}
      >
        {isStreaming ? 'Streaming...' : 'Start Streaming'}
      </button>
      <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', minHeight: '100px' }}>
        <StreamingText text={text} showCursor={isStreaming} speed={10} />
      </div>
    </div>
  );
};

// Main Demo Component
export const AIComponentsDemo: React.FC = () => {
  const [activeModel, setActiveModel] = useState('gpt-4');
  const [tokenUsage, setTokenUsage] = useState({ prompt: 1250, completion: 890, max: 4096 });
  const [activeConversation, setActiveConversation] = useState('1');
  const [aiStatus, setAiStatus] = useState<'idle' | 'generating' | 'streaming' | 'error' | 'rate-limited'>('idle');
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          🤖 CronixUI AI Components
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Interactive demos for all 14 AI-focused components
        </p>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 1. ChatInterface */}
        <DemoSection title="💬 ChatInterface" description="Full-featured chat interface with message history, model selection, and token counting">
          <ChatDemo />
        </DemoSection>

        {/* 2. MessageBubble */}
        <DemoSection title="💭 MessageBubble" description="Individual message display with role-based styling and actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <MessageBubble role="user" content="What's the best way to learn CronixUI?" timestamp={new Date()} />
            <MessageBubble role="assistant" content="Start with the basic components and work your way up. The **ChatInterface** is a great starting point!" timestamp={new Date()} />
            <MessageBubble role="system" content="System message: Session started" timestamp={new Date()} />
          </div>
        </DemoSection>

        {/* 3. TypingIndicator */}
        <DemoSection title="⏳ TypingIndicator" description="Animated indicator showing AI is processing">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <TypingIndicator show label="Thinking..." />
            <TypingIndicator show label="Generating response" />
            <TypingIndicator show label="Analyzing..." />
          </div>
        </DemoSection>

        {/* 4. ModelSelector */}
        <DemoSection title="🎯 ModelSelector" description="Searchable dropdown for selecting AI models">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#888', marginBottom: '0.5rem' }}>Select a model:</p>
              <ModelSelector
                models={DEMO_MODELS}
                value={activeModel}
                onChange={setActiveModel}
                placeholder="Choose model..."
              />
            </div>
            <div style={{ color: '#aaa' }}>
              <p>Current: <strong style={{ color: '#fff' }}>{DEMO_MODELS.find(m => m.id === activeModel)?.name}</strong></p>
            </div>
          </div>
        </DemoSection>

        {/* 5. TokenCounter */}
        <DemoSection title="🔢 TokenCounter" description="Track token usage with progress bar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <TokenCounter
              promptTokens={tokenUsage.prompt}
              completionTokens={tokenUsage.completion}
              maxTokens={tokenUsage.max}
              showBreakdown
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setTokenUsage(prev => ({ ...prev, prompt: Math.min(prev.prompt + 100, prev.max) }))}
                style={{ padding: '0.25rem 0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                +100 tokens
              </button>
              <button
                onClick={() => setTokenUsage({ prompt: 100, completion: 50, max: 4096 })}
                style={{ padding: '0.25rem 0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>
        </DemoSection>

        {/* 6. CodeBlock */}
        <DemoSection title="💻 CodeBlock" description="Syntax-highlighted code display with line numbers and copy">
          <CodeBlock
            code={`import { ChatInterface } from '@cronixui/react';

function App() {
  const [messages, setMessages] = useState([]);
  
  const handleSend = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }]);
  };

  return (
    <ChatInterface
      messages={messages}
      onSend={handleSend}
      models={models}
    />
  );
}`}
            language="typescript"
            showLineNumbers
            filename="App.tsx"
          />
        </DemoSection>

        {/* 7. CopyButton */}
        <DemoSection title="📋 CopyButton" description="One-click copy to clipboard with feedback">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <CopyButton text="Hello from CronixUI!" label="Copy greeting" copiedLabel="Copied!" />
            <CopyButton text="import { ThemeProvider } from '@cronixui/react';" label="Copy import" copiedLabel="Copied to clipboard!" timeout={3000} />
          </div>
        </DemoSection>

        {/* 8. FeedbackButtons */}
        <DemoSection title="👍 FeedbackButtons" description="Collect user feedback on AI responses">
          <FeedbackButtons
            onFeedback={(feedback, comment) => {
              setFeedbackGiven(feedback);
              console.log('Feedback:', { feedback, comment });
            }}
            showComment
          />
          {feedbackGiven && (
            <p style={{ color: '#888', marginTop: '0.5rem' }}>
              Last feedback: {feedbackGiven}
            </p>
          )}
        </DemoSection>

        {/* 9. PromptInput */}
        <DemoSection title="✏️ PromptInput" description="Auto-resizing textarea with model selection">
          <PromptInput
            onSubmit={(message, model) => {
              console.log('Submitted:', { message, model });
              alert(`Message sent: "${message}" with model: ${model}`);
            }}
            models={DEMO_MODELS}
            selectedModel={activeModel}
            onModelChange={setActiveModel}
            placeholder="Ask AI anything..."
            showTokenCount
          />
        </DemoSection>

        {/* 10. StreamingText */}
        <DemoSection title="📺 StreamingText" description="Character-by-character text reveal with cursor">
          <StreamingDemo />
        </DemoSection>

        {/* 11. MarkdownRenderer */}
        <DemoSection title="📝 MarkdownRenderer" description="Render markdown content with formatting">
          <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px' }}>
            <MarkdownRenderer content={DEMO_MARKDOWN} />
          </div>
        </DemoSection>

        {/* 12. ConversationHistory */}
        <DemoSection title="📚 ConversationHistory" description="Browse and manage past conversations">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '300px', height: '300px' }}>
              <ConversationHistory
                conversations={DEMO_CONVERSATIONS}
                activeId={activeConversation}
                onSelect={setActiveConversation}
                onDelete={(id) => console.log('Delete:', id)}
                onRename={(id, title) => console.log('Rename:', id, title)}
                onNewChat={() => console.log('New chat')}
              />
            </div>
            <div style={{ color: '#888', flex: 1 }}>
              <p>Selected conversation: <strong style={{ color: '#fff' }}>{DEMO_CONVERSATIONS.find(c => c.id === activeConversation)?.title}</strong></p>
            </div>
          </div>
        </DemoSection>

        {/* 13. RAGReference */}
        <DemoSection title="🔗 RAGReference" description="Display source references with relevance scores">
          <RAGReference references={DEMO_REFERENCES} expandable />
        </DemoSection>

        {/* 14. AIStatus */}
        <DemoSection title="⚡ AIStatus" description="Show current AI processing status">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <AIStatus status="idle" />
              <AIStatus status="generating" model="GPT-4" />
              <AIStatus status="streaming" model="Claude 3" />
              <AIStatus status="error" errorMessage="Rate limit exceeded" />
              <AIStatus status="rate-limited" retryAfter={30} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {(['idle', 'generating', 'streaming', 'error', 'rate-limited'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setAiStatus(status)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: aiStatus === status ? '#6366f1' : '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
            <div>
              <p style={{ color: '#888' }}>Current status:</p>
              <AIStatus
                status={aiStatus}
                model="GPT-4"
                errorMessage={aiStatus === 'error' ? 'Test error message' : undefined}
                retryAfter={aiStatus === 'rate-limited' ? 45 : undefined}
              />
            </div>
          </div>
        </DemoSection>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '2rem 0', color: '#666', borderTop: '1px solid #333', marginTop: '3rem' }}>
          <p>CronixUI AI Components • 14 components • Cross-framework support</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            React • Vue • Svelte • Solid • Flutter • Go • Rust • Python
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AIComponentsDemo;
