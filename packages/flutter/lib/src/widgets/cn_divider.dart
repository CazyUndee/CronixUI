import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// A horizontal divider line.
class CnDivider extends StatelessWidget {
  final double? height;
  final double? thickness;
  final Color? color;
  final double? indent;
  final double? endIndent;

  const CnDivider({
    super.key,
    this.height,
    this.thickness,
    this.color,
    this.indent,
    this.endIndent,
  });

  @override
  Widget build(BuildContext context) {
    return Divider(
      height: height ?? CronixSpacing.space4,
      thickness: thickness ?? 1,
      color: color ?? CronixColors.border,
      indent: indent,
      endIndent: endIndent,
    );
  }
}

/// A vertical divider line.
class CnVerticalDivider extends StatelessWidget {
  final double? width;
  final double? thickness;
  final Color? color;

  const CnVerticalDivider({
    super.key,
    this.width,
    this.thickness,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return VerticalDivider(
      width: width ?? CronixSpacing.space4,
      thickness: thickness ?? 1,
      color: color ?? CronixColors.border,
    );
  }
}
