# CronixUI AI Components

AI-focused UI components for building chat interfaces, model selectors, token counters, and more.

## Components

| Component | Description | Status |
|-----------|-------------|--------|
| `ChatInterface` | Complete chat UI with messages, input, and model selection | ✅ |
| `MessageBubble` | Individual message display with role, timestamp, and actions | ✅ |
| `TypingIndicator` | Animated dots indicating AI is generating | ✅ |
| `ModelSelector` | Dropdown for selecting AI models | ✅ |
| `TokenCounter` | Token usage display with progress bar | ✅ |
| `CodeBlock` | Syntax-highlighted code display with copy button | ✅ |
| `CopyButton` | Copy-to-clipboard with feedback | ✅ |
| `FeedbackButtons` | Thumbs up/down with optional comment | ✅ |
| `PromptInput` | Multi-line input with submit and token count | ✅ |
| `StreamingText` | Character-by-character text reveal animation | ✅ |
| `MarkdownRenderer` | Simple markdown to HTML converter | ✅ |
| `ConversationHistory` | Chat history sidebar with management | ✅ |
| `RAGReference` | Expandable source citations | ✅ |
| `AIStatus` | Connection/processing status indicator | ✅ |

## Quick Start

```tsx
import {
  ChatInterface,
  ChatMessage,
  ThemeProvider,
} from '@cronixui/react';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  return (
    <ThemeProvider defaultMode="dark">
      <ChatInterface
        messages={messages}
        models={[
          { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
          { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
        ]}
        onSend={(content, model) => {
          // Send to your AI backend
          sendToBackend(content, model);
        }}
        status="idle"
      />
    </ThemeProvider>
  );
}
```

## Individual Components

### MessageBubble

```tsx
<MessageBubble
  role="assistant"
  content="Hello! How can I help you?"
  timestamp={new Date()}
  onCopy={(content) => navigator.clipboard.writeText(content)}
  actions={<button>Regenerate</button>}
/>
```

### TokenCounter

```tsx
<TokenCounter
  promptTokens={150}
  completionTokens={320}
  maxTokens={4096}
  showBreakdown
/>
```

### CodeBlock

```tsx
<CodeBlock
  code={`function greet(name) {\n  return \`Hello, ${"${name}"}!\`;\n}`}
  language="javascript"
  showLineNumbers
/>
```

### StreamingText

```tsx
<StreamingText
  text={streamingResponse}
  speed={20}
  showCursor
  onComplete={() => console.log('Done!')}
/>
```

### FeedbackButtons

```tsx
<FeedbackButtons
  onFeedback={(type, comment) => {
    console.log('Feedback:', type, comment);
  }}
  showComment
/>
```

### AIStatus

```tsx
<AIStatus status="generating" model="GPT-4" />
```

## Theme Support

All AI components use CSS custom properties for theming:

```css
:root {
  --cn-bg-primary: #0a0a0a;
  --cn-bg-secondary: #1a1a1a;
  --cn-text-primary: #f0ede8;
  --cn-text-muted: #888;
  --cn-accent: #6b2323;
  --cn-border: #333;
}
```

Use the `ThemeProvider` to switch between light and dark modes:

```tsx
<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>
```

## Accessibility

All components include:
- ARIA roles and labels
- Keyboard navigation
- Screen reader support
- Focus management
- Live regions for dynamic content

## Hooks

Custom hooks for AI interfaces:

```tsx
import {
  useMediaQuery,
  useBreakpoint,
  useClickOutside,
  useEscapeKey,
  useTheme,
} from '@cronixui/react';

// Responsive design
const isMobile = useMediaQuery('(max-width: 768px)');
const breakpoint = useBreakpoint(); // 'sm' | 'md' | 'lg' | 'xl'

// Interaction
useClickOutside(ref, () => close());
useEscapeKey(() => close());

// Theme
const { resolvedTheme, toggle } = useTheme();
```

## Demos

See the `demos/` folder for complete examples:
- `AIComponentsDemo.tsx` - Showcase of all AI components
- `AIChatExample.tsx` - Working chat with streaming
- `ThemeProviderDemo.tsx` - Theme switching demo
- `ComponentDemos.tsx` - Individual component demos
