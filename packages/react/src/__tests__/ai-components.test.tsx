import { render, screen, fireEvent } from '@testing-library/react';
import {
  MessageBubble,
  TypingIndicator,
  ModelSelector,
  TokenCounter,
  CopyButton,
  FeedbackButtons,
  StreamingText,
  MarkdownRenderer,
  ConversationHistory,
  RAGReference,
  AIStatus,
  ChatInterface,
} from '../components/ai';

describe('AI Components', () => {
  describe('MessageBubble', () => {
    it('renders user message', () => {
      render(<MessageBubble role="user" content="Hello AI" />);
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
    });

    it('renders assistant message', () => {
      render(<MessageBubble role="assistant" content="Hello human" />);
      expect(screen.getByText('Hello human')).toBeInTheDocument();
    });

    it('shows timestamp when provided', () => {
      render(
        <MessageBubble
          role="user"
          content="Test"
          timestamp={new Date('2024-01-01T12:00:00')}
        />
      );
      expect(screen.getByText(/12:00/)).toBeInTheDocument();
    });

    it('shows copy button when onCopy provided', () => {
      const onCopy = jest.fn();
      render(<MessageBubble role="user" content="Copy me" onCopy={onCopy} />);
      fireEvent.click(screen.getByLabelText('Copy message'));
      expect(onCopy).toHaveBeenCalledWith('Copy me');
    });
  });

  describe('TypingIndicator', () => {
    it('renders when show is true', () => {
      render(<TypingIndicator show label="Thinking" />);
      expect(screen.getByText('Thinking')).toBeInTheDocument();
    });

    it('does not render when show is false', () => {
      render(<TypingIndicator show={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('ModelSelector', () => {
    const models = [
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
      { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
    ];

    it('renders selected model', () => {
      render(
        <ModelSelector models={models} value="gpt-4" onChange={() => {}} />
      );
      expect(screen.getByText('GPT-4')).toBeInTheDocument();
    });

    it('shows dropdown on click', () => {
      render(
        <ModelSelector models={models} value="gpt-4" onChange={() => {}} />
      );
      fireEvent.click(screen.getByText('GPT-4'));
      expect(screen.getByText('Claude 3')).toBeInTheDocument();
    });
  });

  describe('TokenCounter', () => {
    it('displays token counts', () => {
      render(
        <TokenCounter promptTokens={100} completionTokens={50} showBreakdown />
      );
      expect(screen.getByText(/150 tokens/)).toBeInTheDocument();
      expect(screen.getByText(/100 prompt/)).toBeInTheDocument();
      expect(screen.getByText(/50 completion/)).toBeInTheDocument();
    });
  });

  describe('CopyButton', () => {
    it('copies text on click', async () => {
      const mockClipboard = {
        writeText: jest.fn(),
      };
      Object.assign(navigator, { clipboard: mockClipboard });

      render(<CopyButton text="Copy this" />);
      fireEvent.click(screen.getByText('Copy'));
      expect(mockClipboard.writeText).toHaveBeenCalledWith('Copy this');
    });
  });

  describe('FeedbackButtons', () => {
    it('shows positive and negative buttons', () => {
      render(<FeedbackButtons />);
      expect(screen.getByLabelText('Good response')).toBeInTheDocument();
      expect(screen.getByLabelText('Bad response')).toBeInTheDocument();
    });

    it('calls onFeedback when clicked', () => {
      const onFeedback = jest.fn();
      render(<FeedbackButtons onFeedback={onFeedback} />);
      fireEvent.click(screen.getByLabelText('Good response'));
      expect(onFeedback).toHaveBeenCalledWith('positive');
    });
  });

  describe('MarkdownRenderer', () => {
    it('renders headings', () => {
      render(<MarkdownRenderer content="# Heading 1" />);
      expect(screen.getByText('Heading 1')).toBeInTheDocument();
    });

    it('renders bold text', () => {
      render(<MarkdownRenderer content="**bold text**" />);
      expect(screen.getByText('bold text')).toBeInTheDocument();
    });

    it('renders code blocks', () => {
      const { container } = render(
        <MarkdownRenderer content={'```js\nconst x = 1;\n```'} />
      );
      expect(container.querySelector('.cn-md-code-block')).toBeInTheDocument();
    });
  });

  describe('AIStatus', () => {
    it('shows idle status', () => {
      render(<AIStatus status="idle" />);
      expect(screen.getByText('Ready')).toBeInTheDocument();
    });

    it('shows generating status', () => {
      render(<AIStatus status="generating" />);
      expect(screen.getByText('Generating')).toBeInTheDocument();
    });

    it('shows error message', () => {
      render(<AIStatus status="error" errorMessage="API error" />);
      expect(screen.getByText('API error')).toBeInTheDocument();
    });
  });

  describe('RAGReference', () => {
    it('shows source references when expanded', () => {
      const refs = [
        { id: '1', title: 'Doc 1', source: 'Source A', snippet: 'Snippet 1' },
        { id: '2', title: 'Doc 2', source: 'Source B', snippet: 'Snippet 2' },
      ];
      render(<RAGReference references={refs} expandable={false} />);
      expect(screen.getByText('Doc 1')).toBeInTheDocument();
      expect(screen.getByText('Doc 2')).toBeInTheDocument();
    });

    it('toggles references on click', () => {
      const refs = [
        { id: '1', title: 'Doc 1', source: 'Source A', snippet: 'Snippet 1' },
      ];
      render(<RAGReference references={refs} expandable />);
      fireEvent.click(screen.getByText(/Sources/));
      expect(screen.getByText('Doc 1')).toBeInTheDocument();
    });
  });

  describe('ConversationHistory', () => {
    const conversations = [
      {
        id: '1',
        title: 'Chat 1',
        lastMessage: 'Hello',
        timestamp: new Date(),
        messageCount: 5,
      },
    ];

    it('renders conversation list', () => {
      render(
        <ConversationHistory
          conversations={conversations}
          onSelect={() => {}}
        />
      );
      expect(screen.getByText('Chat 1')).toBeInTheDocument();
    });

    it('calls onSelect when clicked', () => {
      const onSelect = jest.fn();
      render(
        <ConversationHistory
          conversations={conversations}
          onSelect={onSelect}
        />
      );
      fireEvent.click(screen.getByText('Chat 1'));
      expect(onSelect).toHaveBeenCalledWith('1');
    });
  });

  describe('StreamingText', () => {
    it('shows cursor while streaming', () => {
      jest.useFakeTimers();
      render(<StreamingText text="Hello" speed={100} />);
      expect(screen.getByText('|')).toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe('ChatInterface', () => {
    const messages = [
      {
        id: '1',
        role: 'user' as const,
        content: 'Hello',
        timestamp: new Date(),
      },
      {
        id: '2',
        role: 'assistant' as const,
        content: 'Hi there!',
        timestamp: new Date(),
      },
    ];

    it('renders messages', () => {
      render(<ChatInterface messages={messages} />);
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    it('shows model selector when models provided', () => {
      const models = [{ id: 'gpt-4', name: 'GPT-4' }];
      render(<ChatInterface messages={messages} models={models} selectedModel="gpt-4" />);
      const modelNames = screen.getAllByText('GPT-4');
      expect(modelNames.length).toBeGreaterThanOrEqual(1);
    });
  });
});
