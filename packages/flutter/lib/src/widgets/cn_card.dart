import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnCard extends StatelessWidget {
  final Widget? header;
  final Widget? body;
  final Widget? footer;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? headerPadding;
  final EdgeInsetsGeometry? footerPadding;
  final Color? backgroundColor;
  final double? width;
  final double? elevation;
  final VoidCallback? onTap;
  final bool borderless;

  const CnCard({
    super.key,
    this.header,
    this.body,
    this.footer,
    this.padding,
    this.headerPadding,
    this.footerPadding,
    this.backgroundColor,
    this.width,
    this.elevation,
    this.onTap,
    this.borderless = false,
  });

  @override
  Widget build(BuildContext context) {
    Widget content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (header != null)
          Container(
            padding: headerPadding ?? const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: CronixColors.border),
              ),
            ),
            child: header,
          ),
        if (body != null)
          Flexible(
            child: Padding(
              padding: padding ?? const EdgeInsets.all(16),
              child: body,
            ),
          ),
        if (footer != null)
          Container(
            padding: footerPadding ?? const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              border: Border(
                top: BorderSide(color: CronixColors.border),
              ),
            ),
            child: footer,
          ),
      ],
    );

    if (onTap != null) {
      content = InkWell(
        onTap: onTap,
        borderRadius: CronixRadius.radiusLG,
        child: content,
      );
    }

    return Container(
      width: width,
      decoration: BoxDecoration(
        color: backgroundColor ?? CronixColors.surface,
        borderRadius: CronixRadius.radiusLG,
        border: borderless ? null : Border.all(color: CronixColors.border),
        boxShadow: elevation != null
            ? [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: elevation!,
                  offset: Offset(0, elevation! / 2),
                ),
              ]
            : null,
      ),
      child: ClipRRect(
        borderRadius: CronixRadius.radiusLG,
        child: content,
      ),
    );
  }
}
