import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnTooltip extends StatelessWidget {
  final String message;
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final Color? backgroundColor;
  final Color? textColor;
  final Duration? waitDuration;
  final Duration? showDuration;
  final bool preferBelow;

  const CnTooltip({
    super.key,
    required this.message,
    required this.child,
    this.padding,
    this.backgroundColor,
    this.textColor,
    this.waitDuration,
    this.showDuration,
    this.preferBelow = true,
  });

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: message,
      padding: padding ?? const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      margin: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: backgroundColor ?? CronixColors.surfaceLight,
        borderRadius: CronixRadius.radiusSM,
        border: Border.all(color: CronixColors.border),
      ),
      textStyle: TextStyle(
        color: textColor ?? CronixColors.text,
        fontSize: 12,
      ),
      waitDuration: waitDuration ?? const Duration(milliseconds: 500),
      showDuration: showDuration ?? const Duration(seconds: 2),
      preferBelow: preferBelow,
      child: child,
    );
  }
}

class CnRichTooltip extends StatelessWidget {
  final Widget Function(BuildContext context) builder;
  final Widget child;
  final Offset? offset;

  const CnRichTooltip({
    super.key,
    required this.builder,
    required this.child,
    this.offset,
  });

  @override
  Widget build(BuildContext context) {
    return _CnRichTooltipWrapper(
      builder: builder,
      offset: offset,
      child: child,
    );
  }
}

class _CnRichTooltipWrapper extends StatefulWidget {
  final Widget Function(BuildContext context) builder;
  final Widget child;
  final Offset? offset;

  const _CnRichTooltipWrapper({
    required this.builder,
    required this.child,
    this.offset,
  });

  @override
  State<_CnRichTooltipWrapper> createState() => _CnRichTooltipWrapperState();
}

class _CnRichTooltipWrapperState extends State<_CnRichTooltipWrapper> {
  OverlayEntry? _overlayEntry;
  bool _isVisible = false;

  void _showTooltip() {
    _overlayEntry = OverlayEntry(
      builder: widget.builder,
    );
    Overlay.of(context).insert(_overlayEntry!);
    setState(() => _isVisible = true);
  }

  void _hideTooltip() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    setState(() => _isVisible = false);
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _showTooltip(),
      onExit: (_) => _hideTooltip(),
      child: GestureDetector(
        onTapDown: (_) => _showTooltip(),
        onTapUp: (_) => _hideTooltip(),
        onTapCancel: () => _hideTooltip(),
        child: widget.child,
      ),
    );
  }
}
