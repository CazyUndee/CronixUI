import 'package:flutter/material.dart';

/// A complete chat interface with message list and input.
///
/// ```dart
/// CnChatInterface(
///   messages: messages,
///   onSend: (msg) => sendToApi(msg),
///   assistantAvatar: Icon(Icons.smart_toy),
/// )
/// ```
class CnChatInterface extends StatefulWidget {
  final List<CnChatMessage> messages;
  final ValueChanged<String>? onSend;
  final Widget? assistantAvatar;
  final Widget? userAvatar;
  final String placeholder;
  final bool isTyping;

  const CnChatInterface({
    super.key,
    this.messages = const [],
    this.onSend,
    this.assistantAvatar,
    this.userAvatar,
    this.placeholder = 'Type a message...',
    this.isTyping = false,
  });

  @override
  State<CnChatInterface> createState() => _CnChatInterfaceState();
}

class _CnChatInterfaceState extends State<CnChatInterface> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    _scrollToBottom();

    return Semantics(
      label: 'Chat conversation',
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          border: Border.all(
            color: Theme.of(context).dividerColor,
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: widget.messages.length + (widget.isTyping ? 1 : 0),
                itemBuilder: (context, index) {
                  if (index == widget.messages.length) {
                    return CnTypingIndicator(
                      avatar: widget.assistantAvatar,
                    );
                  }
                  final msg = widget.messages[index];
                  return CnMessageBubble(
                    message: msg,
                    userAvatar: widget.userAvatar,
                    assistantAvatar: widget.assistantAvatar,
                  );
                },
              ),
            ),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceVariant,
                border: Border(
                  top: BorderSide(color: Theme.of(context).dividerColor),
                ),
              ),
              child: CnPromptInput(
                controller: _controller,
                onSend: (text) {
                  widget.onSend?.call(text);
                  _controller.clear();
                },
                placeholder: widget.placeholder,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Represents a chat message.
class CnChatMessage {
  final String id;
  final String role; // 'user' | 'assistant' | 'system'
  final String content;
  final DateTime? timestamp;
  final String? status; // 'sending' | 'sent' | 'delivered' | 'error'

  const CnChatMessage({
    required this.id,
    required this.role,
    required this.content,
    this.timestamp,
    this.status,
  });
}

/// A message bubble component.
class CnMessageBubble extends StatelessWidget {
  final CnChatMessage message;
  final Widget? userAvatar;
  final Widget? assistantAvatar;

  const CnMessageBubble({
    super.key,
    required this.message,
    this.userAvatar,
    this.assistantAvatar,
  });

  @override
  Widget build(BuildContext context) {
    final isUser = message.role == 'user';
    final avatar = isUser ? userAvatar : assistantAvatar;

    return Semantics(
      label: '${message.role} message',
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          mainAxisAlignment:
              isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (!isUser && avatar != null) ...[
              avatar,
              const SizedBox(width: 12),
            ],
            Flexible(
              child: Column(
                crossAxisAlignment:
                    isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: Text(
                      isUser ? 'You' : 'Assistant',
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 12,
                    ),
                    decoration: BoxDecoration(
                      color: isUser
                          ? Theme.of(context).colorScheme.primary
                          : Theme.of(context).colorScheme.surfaceVariant,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      message.content,
                      style: TextStyle(
                        color: isUser
                            ? Theme.of(context).colorScheme.onPrimary
                            : Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            if (isUser && avatar != null) ...[
              const SizedBox(width: 12),
              avatar,
            ],
          ],
        ),
      ),
    );
  }
}

/// Typing indicator with animated dots.
class CnTypingIndicator extends StatelessWidget {
  final Widget? avatar;

  const CnTypingIndicator({super.key, this.avatar});

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Assistant is typing',
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            if (avatar != null) ...[
              avatar!,
              const SizedBox(width: 12),
            ],
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceVariant,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _AnimatedDot(delay: 0),
                  const SizedBox(width: 4),
                  _AnimatedDot(delay: 150),
                  const SizedBox(width: 4),
                  _AnimatedDot(delay: 300),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AnimatedDot extends StatefulWidget {
  final int delay;
  const _AnimatedDot({required this.delay});

  @override
  State<_AnimatedDot> createState() => _AnimatedDotState();
}

class _AnimatedDotState extends State<_AnimatedDot>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1400),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0.6, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _controller.repeat(reverse: true);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.scale(
          scale: _animation.value,
          child: child,
        );
      },
      child: Container(
        width: 8,
        height: 8,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.onSurfaceVariant,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}

/// Message input with send button.
class CnPromptInput extends StatefulWidget {
  final TextEditingController? controller;
  final ValueChanged<String>? onSend;
  final String placeholder;
  final bool enabled;
  final int? maxLength;

  const CnPromptInput({
    super.key,
    this.controller,
    this.onSend,
    this.placeholder = 'Type a message...',
    this.enabled = true,
    this.maxLength,
  });

  @override
  State<CnPromptInput> createState() => _CnPromptInputState();
}

class _CnPromptInputState extends State<CnPromptInput> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Message input',
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          border: Border.all(color: Theme.of(context).dividerColor),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                enabled: widget.enabled,
                maxLength: widget.maxLength,
                decoration: InputDecoration(
                  hintText: widget.placeholder,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
                onSubmitted: (text) {
                  if (text.trim().isNotEmpty) {
                    widget.onSend?.call(text.trim());
                  }
                },
              ),
            ),
            IconButton(
              onPressed: widget.enabled && _controller.text.trim().isNotEmpty
                  ? () {
                      widget.onSend?.call(_controller.text.trim());
                    }
                  : null,
              icon: const Icon(Icons.send),
              ariaLabel: 'Send message',
            ),
          ],
        ),
      ),
    );
  }
}
