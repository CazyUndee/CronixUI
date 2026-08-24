import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
import MessageBubble from './MessageBubble';
import PromptInput from './PromptInput';
import TypingIndicator from './TypingIndicator';

export default function ChatInterface(props) {
  const [messages, setMessages] = createSignal(props.messages || []);
  const [isTyping, setIsTyping] = createSignal(false);
  let messagesEndRef;

  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (content) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    props.onSend?.(userMessage);

    setIsTyping(true);
  };

  const addAssistantMessage = (content) => {
    const assistantMessage = {
      id: Date.now(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleError = (error) => {
    setIsTyping(false);
    props.onError?.(error);
  };

  onMount(() => {
    scrollToBottom();
  });

  return (
    <div 
      class="cn-chat-interface"
      role="log"
      aria-label="Chat conversation"
      aria-live="polite"
    >
      <div class="cn-chat-messages" role="list">
        <For each={messages()}>
          {(message) => (
            <div role="listitem">
              <MessageBubble
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                avatar={message.avatar}
                status={message.status}
              />
            </div>
          )}
        </For>
        <Show when={isTyping()}>
          <TypingIndicator avatar={props.assistantAvatar} />
        </Show>
        <div ref={messagesEndRef} />
      </div>

      <div class="cn-chat-footer">
        <PromptInput
          onSend={handleSend}
          disabled={isTyping()}
          placeholder={props.placeholder || 'Type a message...'}
          maxLength={props.maxInputLength}
        />
      </div>

      <style>{`
        .cn-chat-interface {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: 100vh;
          background: var(--cn-bg-primary);
          border: 1px solid var(--cn-border-default);
          border-radius: 12px;
          overflow: hidden;
        }

        .cn-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cn-chat-footer {
          padding: 16px;
          border-top: 1px solid var(--cn-border-default);
          background: var(--cn-bg-secondary);
        }
      `}</style>
    </div>
  );
}
