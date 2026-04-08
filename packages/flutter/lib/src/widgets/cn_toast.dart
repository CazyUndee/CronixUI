import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnToastVariant { info, success, warning, error }

class CnToast {
  final String message;
  final CnToastVariant variant;
  final Duration duration;
  final IconData? icon;
  final String? actionLabel;
  final VoidCallback? onAction;

  CnToast({
    required this.message,
    this.variant = CnToastVariant.info,
    this.duration = const Duration(seconds: 3),
    this.icon,
    this.actionLabel,
    this.onAction,
  });

  IconData get _defaultIcon {
    switch (variant) {
      case CnToastVariant.info:
        return Icons.info_outline;
      case CnToastVariant.success:
        return Icons.check_circle_outline;
      case CnToastVariant.warning:
        return Icons.warning_amber_outlined;
      case CnToastVariant.error:
        return Icons.error_outline;
    }
  }

  Color get _backgroundColor {
    switch (variant) {
      case CnToastVariant.info:
        return CronixColors.info;
      case CnToastVariant.success:
        return CronixColors.success;
      case CnToastVariant.warning:
        return CronixColors.warning;
      case CnToastVariant.error:
        return CronixColors.error;
    }
  }

  SnackBar toSnackBar() {
    return SnackBar(
      content: Row(
        children: [
          Icon(icon ?? _defaultIcon, color: CronixColors.text, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              message,
              style: const TextStyle(color: CronixColors.text),
            ),
          ),
          if (actionLabel != null)
            TextButton(
              onPressed: onAction,
              child: Text(
                actionLabel!,
                style: const TextStyle(
                  color: CronixColors.text,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
      backgroundColor: _backgroundColor,
      duration: duration,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: CronixRadius.radiusMD,
      ),
      margin: const EdgeInsets.all(16),
    );
  }

  static void show(
    BuildContext context, {
    required String message,
    CnToastVariant variant = CnToastVariant.info,
    Duration duration = const Duration(seconds: 3),
    IconData? icon,
    String? actionLabel,
    VoidCallback? onAction,
  }) {
    final toast = CnToast(
      message: message,
      variant: variant,
      duration: duration,
      icon: icon,
      actionLabel: actionLabel,
      onAction: onAction,
    );
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(toast.toSnackBar());
  }

  static void success(BuildContext context, String message) {
    show(context, message: message, variant: CnToastVariant.success);
  }

  static void error(BuildContext context, String message) {
    show(context, message: message, variant: CnToastVariant.error);
  }

  static void warning(BuildContext context, String message) {
    show(context, message: message, variant: CnToastVariant.warning);
  }

  static void info(BuildContext context, String message) {
    show(context, message: message, variant: CnToastVariant.info);
  }
}
