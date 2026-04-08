import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnButtonVariant { primary, ghost, outline, danger, success }

class CnButton extends StatelessWidget {
  final String? label;
  final Widget? child;
  final CnButtonVariant variant;
  final VoidCallback? onPressed;
  final bool disabled;
  final bool loading;
  final IconData? icon;
  final IconData? trailingIcon;
  final double? width;
  final double height;
  final EdgeInsetsGeometry? padding;

  const CnButton({
    super.key,
    this.label,
    this.child,
    this.variant = CnButtonVariant.primary,
    this.onPressed,
    this.disabled = false,
    this.loading = false,
    this.icon,
    this.trailingIcon,
    this.width,
    this.height = 40,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveOnPressed = (disabled || loading) ? null : onPressed;
    
    Widget content;
    if (loading) {
      content = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 16,
            height: 16,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(_getTextColor()),
            ),
          ),
          if (label != null) ...[
            const SizedBox(width: 8),
            Text(label!, style: TextStyle(color: _getTextColor())),
          ],
        ],
      );
    } else if (child != null) {
      content = child!;
    } else {
      content = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 18, color: _getTextColor()),
            const SizedBox(width: 8),
          ],
          if (label != null) Text(label!, style: TextStyle(color: _getTextColor())),
          if (trailingIcon != null) ...[
            const SizedBox(width: 8),
            Icon(trailingIcon, size: 18, color: _getTextColor()),
          ],
        ],
      );
    }

    return SizedBox(
      width: width,
      height: height,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: effectiveOnPressed,
          borderRadius: CronixRadius.radiusMD,
          child: Container(
            padding: padding ?? const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: _getBackgroundColor(),
              border: _getBorder(),
              borderRadius: CronixRadius.radiusMD,
            ),
            child: Center(child: content),
          ),
        ),
      ),
    );
  }

  Color _getBackgroundColor() {
    if (disabled) return CronixColors.surfaceLight;
    switch (variant) {
      case CnButtonVariant.primary:
        return CronixColors.accent;
      case CnButtonVariant.ghost:
        return Colors.transparent;
      case CnButtonVariant.outline:
        return Colors.transparent;
      case CnButtonVariant.danger:
        return CronixColors.error;
      case CnButtonVariant.success:
        return CronixColors.success;
    }
  }

  Color _getTextColor() {
    if (disabled) return CronixColors.textMuted;
    switch (variant) {
      case CnButtonVariant.primary:
      case CnButtonVariant.danger:
      case CnButtonVariant.success:
        return CronixColors.text;
      case CnButtonVariant.ghost:
      case CnButtonVariant.outline:
        return CronixColors.text;
    }
  }

  BoxBorder? _getBorder() {
    if (disabled) return null;
    switch (variant) {
      case CnButtonVariant.outline:
        return Border.all(color: CronixColors.borderLight);
      default:
        return null;
    }
  }
}
