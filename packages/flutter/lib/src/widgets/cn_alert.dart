import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnAlertVariant { info, success, warning, error }

class CnAlert extends StatelessWidget {
  final String message;
  final String? title;
  final CnAlertVariant variant;
  final IconData? icon;
  final bool showIcon;
  final VoidCallback? onDismiss;
  final Widget? action;

  const CnAlert({
    super.key,
    required this.message,
    this.title,
    this.variant = CnAlertVariant.info,
    this.icon,
    this.showIcon = true,
    this.onDismiss,
    this.action,
  });

  IconData get _defaultIcon {
    switch (variant) {
      case CnAlertVariant.info:
        return Icons.info_outline;
      case CnAlertVariant.success:
        return Icons.check_circle_outline;
      case CnAlertVariant.warning:
        return Icons.warning_amber_outlined;
      case CnAlertVariant.error:
        return Icons.error_outline;
    }
  }

  Color get _backgroundColor {
    switch (variant) {
      case CnAlertVariant.info:
        return CronixColors.info.withOpacity(0.1);
      case CnAlertVariant.success:
        return CronixColors.success.withOpacity(0.1);
      case CnAlertVariant.warning:
        return CronixColors.warning.withOpacity(0.1);
      case CnAlertVariant.error:
        return CronixColors.error.withOpacity(0.1);
    }
  }

  Color get _borderColor {
    switch (variant) {
      case CnAlertVariant.info:
        return CronixColors.info;
      case CnAlertVariant.success:
        return CronixColors.success;
      case CnAlertVariant.warning:
        return CronixColors.warning;
      case CnAlertVariant.error:
        return CronixColors.error;
    }
  }

  Color get _iconColor {
    switch (variant) {
      case CnAlertVariant.info:
        return CronixColors.info;
      case CnAlertVariant.success:
        return CronixColors.success;
      case CnAlertVariant.warning:
        return CronixColors.warning;
      case CnAlertVariant.error:
        return CronixColors.error;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: _backgroundColor,
        borderRadius: CronixRadius.radiusMD,
        border: Border.all(color: _borderColor.withOpacity(0.5)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showIcon) ...[
            Icon(icon ?? _defaultIcon, color: _iconColor, size: 20),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (title != null) ...[
                  Text(
                    title!,
                    style: const TextStyle(
                      color: CronixColors.text,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                ],
                Text(
                  message,
                  style: const TextStyle(
                    color: CronixColors.text,
                    fontSize: 14,
                  ),
                ),
                if (action != null) ...[
                  const SizedBox(height: 8),
                  action!,
                ],
              ],
            ),
          ),
          if (onDismiss != null)
            GestureDetector(
              onTap: onDismiss,
              child: const Icon(
                Icons.close,
                color: CronixColors.textSecondary,
                size: 18,
              ),
            ),
        ],
      ),
    );
  }
}
