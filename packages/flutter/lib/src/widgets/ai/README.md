# CronixUI Flutter AI Components

Native Flutter widgets for building AI chat interfaces.

## Components

| Widget | Description |
|--------|-------------|
| `CnChatInterface` | Complete chat UI with messages, input, and model selection |
| `CnModelSelector` | Dropdown for selecting AI models |
| `CnCodeBlock` | Code display with syntax highlighting |
| `CnTokenCounter` | Token usage display with progress bar |
| `CnAIStatus` | Connection/processing status indicator |

## Quick Start

```dart
import 'package:cronixui/cronixui.dart';

class MyChatScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CnChatInterface(
      messages: [
        ChatMessage(
          id: '1',
          role: MessageRole.user,
          content: 'Hello!',
          timestamp: DateTime.now(),
        ),
        ChatMessage(
          id: '2',
          role: MessageRole.assistant,
          content: 'Hi! How can I help?',
          timestamp: DateTime.now(),
        ),
      ],
      models: [
        AIModel(id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI'),
        AIModel(id: 'claude-3', name: 'Claude 3', provider: 'Anthropic'),
      ],
      onSend: (message, model) {
        // Send to your AI backend
      },
      status: CnAIStatus.idle,
    );
  }
}
```

## Accessibility

All widgets include `Semantics` widgets for:
- Screen reader support
- Role announcements
- State descriptions
- Meaningful labels

## Theme Integration

Widgets use CronixUI tokens for consistent styling:

```dart
final theme = CronixUITheme.dark();

CnCodeBlock(
  code: 'print("hello")',
  language: 'dart',
  theme: theme,
)
```

## Models

```dart
// ChatMessage
ChatMessage(
  id: 'msg_1',
  role: MessageRole.user,
  content: 'Hello!',
  timestamp: DateTime.now(),
  tokens: TokenUsage(prompt: 10, completion: 20),
)

// AIModel
AIModel(
  id: 'gpt-4',
  name: 'GPT-4',
  provider: 'OpenAI',
  maxTokens: 8192,
)
```
