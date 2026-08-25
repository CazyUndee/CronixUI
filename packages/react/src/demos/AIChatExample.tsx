/**
 * Complete AI Chat Example
 *
 * This example demonstrates how to wire together all CronixUI AI components
 * into a fully functional chat interface with streaming, feedback, and more.
 *
 * Usage:
 * ```tsx
 * import { AIChatExample } from '@cronixui/react/demos';
 *
 * <AIChatExample model="gpt-4" />
 * ```
 */

import React, { useState, useCallback, useRef } from 'react';
import { ChatInterface, ChatMessage } from '../components/ai/ChatInterface';
import { ModelOption } from '../components/ai/ModelSelector';
import { ThemeProvider } from '../components/ThemeProvider';
import { Button } from '../components/Button';

// Simulated streaming response
async function* streamResponse(
  input: string,
  model: string
): AsyncGenerator<string> {
  const responses: Record<string, string> = {
    default: `I received your message: "${input}". 

This is a simulated AI response. In a real application, you would connect this to your preferred LLM API (OpenAI, Anthropic, Google, etc.).

Here are some things I can help with:
- **Code generation**: I can write code in multiple languages
- **Analysis**: I can analyze data and provide insights  
- **Writing**: I can help draft, edit, and proofread content
- **Research**: I can summarize and explain complex topics

Feel free to ask me anything!`,
    'gpt-4': `[GPT-4 Response] I'm GPT-4, and I'm here to help! 

${input.includes('code') ? `Here's a code example:\n\n\`\`\`typescript\nfunction greet(name: string) {\n  return \`Hello, ${"${name}"}!\`;\n}\n\`\`\`` : 'I can assist you with various tasks.'}`,
    'claude-3': `[Claude Response] Thanks for your message!

As Claude, I focus on being helpful, harmless, and honest. Let me assist you with: ${input}`,
  };

  const response = responses[model] || responses.default;
  const words = response.split(' ');

  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 20));
    yield word + ' ';
  }
}

interface AIChatExampleProps {
  apiKey?: string;
  model?: string;
}

export const AIChatExample: React.FC<AIChatExampleProps> = ({
  model = 'gpt-4',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'system',
      content: 'Welcome to the CronixUI AI Chat Example! Send a message to get started.',
      timestamp: new Date(),
    },
  ]);
  const [status, setStatus] = useState<'idle' | 'generating' | 'streaming' | 'error'>('idle');
  const [selectedModel, setSelectedModel] = useState(model);
  const streamingIdRef = useRef<string>('');

  const models: ModelOption[] = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  ];

  const handleSend = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus('streaming');

      // Add placeholder for assistant response
      const assistantId = `assistant-${Date.now()}`;
      streamingIdRef.current = assistantId;

      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        model: selectedModel,
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Stream the response
      let fullContent = '';
      try {
        for await (const chunk of streamResponse(content, selectedModel)) {
          fullContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: fullContent } : msg
            )
          );
        }

        // Mark streaming as complete
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  isStreaming: false,
                  tokens: {
                    prompt: Math.floor(content.length / 4),
                    completion: Math.floor(fullContent.length / 4),
                  },
                }
              : msg
          )
        );
      } catch {
        setStatus('error');
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: 'Error generating response. Please try again.', isStreaming: false }
              : msg
          )
        );
      }

      setStatus('idle');
    },
    [selectedModel]
  );

  const handleRegenerate = useCallback(
    async (messageId: string) => {
      // Find the user message before this one
      const msgIndex = messages.findIndex((m) => m.id === messageId);
      if (msgIndex <= 0) return;

      const userMsg = messages[msgIndex - 1];
      if (userMsg.role !== 'user') return;

      // Remove the assistant message and resend
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
      await handleSend(userMsg.content);
    },
    [messages, handleSend]
  );

  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content).catch(() => {
      // Clipboard API may not be available
    });
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'system',
        content: 'Chat cleared. Send a new message to get started!',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <ThemeProvider defaultMode="dark">
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--cn-bg-primary)',
          color: 'var(--cn-text-primary)',
        }}
      >
        {/* Example Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--cn-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
              AI Chat Example
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--cn-text-muted)' }}>
              Powered by CronixUI AI Components
            </p>
          </div>
          <Button variant="ghost" onClick={handleClearChat}>
            Clear Chat
          </Button>
        </div>

        {/* Chat Interface */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ChatInterface
            messages={messages}
            models={models}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onSend={handleSend}
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
            status={status}
            showTokenCounts
            showModelSelector
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AIChatExample;
