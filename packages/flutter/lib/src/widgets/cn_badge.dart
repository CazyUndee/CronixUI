import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnBadgeVariant { default_, success, warning, error, info }

class CnBadge extends StatelessWidget {
  final String label;
  final CnBadgeVariant variant;
  final IconData? icon;
  final double fontSize;
  final EdgeInsetsGeometry? padding;

  const CnBadge({
    super.key,
    required this.label,
    this.variant = CnBadgeVariant.default_,
    this.icon,
    this.fontSize = 12,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding ?? const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: _getBackgroundColor(),
        borderRadius: CronixRadius.radiusFull,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: fontSize, color: _getTextColor()),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: TextStyle(
              color: _getTextColor(),
              fontSize: fontSize,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Color _getBackgroundColor() {
    switch (variant) {
      case CnBadgeVariant.default_:
        return CronixColors.surfaceLight;
      case CnBadgeVariant.success:
        return CronixColors.success.withOpacity(0.2);
      case CnBadgeVariant.warning:
        return CronixColors.warning.withOpacity(0.2);
      case CnBadgeVariant.error:
        return CronixColors.error.withOpacity(0.2);
      case CnBadgeVariant.info:
        return CronixColors.info.withOpacity(0.2);
    }
  }

  Color _getTextColor() {
    switch (variant) {
      case CnBadgeVariant.default_:
        return CronixColors.text;
      case CnBadgeVariant.success:
        return CronixColors.success;
      case CnBadgeVariant.warning:
        return CronixColors.warning;
      case CnBadgeVariant.error:
        return CronixColors.error;
      case CnBadgeVariant.info:
        return CronixColors.info;
    }
  }
}
