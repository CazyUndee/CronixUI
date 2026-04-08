import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnModal extends StatelessWidget {
  final String? title;
  final Widget? content;
  final List<Widget>? actions;
  final bool fullWidth;
  final double? width;
  final double? maxHeight;
  final bool showCloseButton;
  final VoidCallback? onClose;
  final IconData? icon;
  final Color? iconColor;

  const CnModal({
    super.key,
    this.title,
    this.content,
    this.actions,
    this.fullWidth = false,
    this.width,
    this.maxHeight,
    this.showCloseButton = true,
    this.onClose,
    this.icon,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        width: fullWidth ? double.infinity : (width ?? 400),
        constraints: BoxConstraints(
          maxWidth: fullWidth ? double.infinity : 500,
          maxHeight: maxHeight ?? 600,
        ),
        decoration: BoxDecoration(
          color: CronixColors.surface,
          borderRadius: CronixRadius.radiusLG,
          border: Border.all(color: CronixColors.border),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (title != null || showCloseButton || icon != null)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: const BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: CronixColors.border),
                  ),
                ),
                child: Row(
                  children: [
                    if (icon != null) ...[
                      Icon(icon, color: iconColor ?? CronixColors.accent, size: 24),
                      const SizedBox(width: 12),
                    ],
                    Expanded(
                      child: Text(
                        title ?? '',
                        style: const TextStyle(
                          color: CronixColors.text,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    if (showCloseButton)
                      GestureDetector(
                        onTap: onClose ?? () => Navigator.of(context).pop(),
                        child: const Icon(
                          Icons.close,
                          color: CronixColors.textSecondary,
                          size: 20,
                        ),
                      ),
                  ],
                ),
              ),
            if (content != null)
              Flexible(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: content,
                ),
              ),
            if (actions != null && actions!.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: CronixColors.border),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    for (int i = 0; i < actions!.length; i++) ...[
                      if (i > 0) const SizedBox(width: 8),
                      actions![i],
                    ],
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }

  static Future<T?> show<T>({
    required BuildContext context,
    String? title,
    Widget? content,
    List<Widget>? actions,
    bool fullWidth = false,
    bool barrierDismissible = true,
    bool showCloseButton = true,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      builder: (context) => CnModal(
        title: title,
        content: content,
        actions: actions,
        fullWidth: fullWidth,
        showCloseButton: showCloseButton,
      ),
    );
  }
}

class CnConfirmModal extends StatelessWidget {
  final String title;
  final String message;
  final String confirmText;
  final String cancelText;
  final Color? confirmColor;
  final VoidCallback? onConfirm;
  final VoidCallback? onCancel;
  final IconData? icon;
  final Color? iconColor;

  const CnConfirmModal({
    super.key,
    required this.title,
    required this.message,
    this.confirmText = 'Confirm',
    this.cancelText = 'Cancel',
    this.confirmColor,
    this.onConfirm,
    this.onCancel,
    this.icon,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return CnModal(
      title: title,
      icon: icon ?? Icons.help_outline,
      iconColor: iconColor,
      content: Text(
        message,
        style: const TextStyle(color: CronixColors.text),
      ),
      actions: [
        TextButton(
          onPressed: onCancel ?? () => Navigator.of(context).pop(false),
          child: Text(cancelText, style: const TextStyle(color: CronixColors.textSecondary)),
        ),
        ElevatedButton(
          onPressed: onConfirm ?? () => Navigator.of(context).pop(true),
          style: ElevatedButton.styleFrom(
            backgroundColor: confirmColor ?? CronixColors.accent,
          ),
          child: Text(confirmText, style: const TextStyle(color: CronixColors.text)),
        ),
      ],
    );
  }

  static Future<bool?> show({
    required BuildContext context,
    required String title,
    required String message,
    String confirmText = 'Confirm',
    String cancelText = 'Cancel',
    Color? confirmColor,
    IconData? icon,
    Color? iconColor,
  }) {
    return showDialog<bool>(
      context: context,
      builder: (context) => CnConfirmModal(
        title: title,
        message: message,
        confirmText: confirmText,
        cancelText: cancelText,
        confirmColor: confirmColor,
        icon: icon,
        iconColor: iconColor,
      ),
    );
  }
}
