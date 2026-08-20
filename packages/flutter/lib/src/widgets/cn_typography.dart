import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// Typography components for headings and text.
///
/// Provides H1-H6 headings and styled Text widgets matching
/// the CronixUI design system.
class CnH1 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH1({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 32, fontWeight: FontWeight.w800, height: 1.2,
      color: color ?? CronixColors.text,
    )));
  }
}

class CnH2 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH2({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 24, fontWeight: FontWeight.w700, height: 1.3,
      color: color ?? CronixColors.text,
    )));
  }
}

class CnH3 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH3({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 20, fontWeight: FontWeight.w600, height: 1.3,
      color: color ?? CronixColors.text,
    )));
  }
}

class CnH4 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH4({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 16, fontWeight: FontWeight.w600, height: 1.4,
      color: color ?? CronixColors.text,
    )));
  }
}

class CnH5 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH5({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 14, fontWeight: FontWeight.w600, height: 1.4,
      color: color ?? CronixColors.text,
    )));
  }
}

class CnH6 extends StatelessWidget {
  final String text;
  final Color? color;
  final TextStyle? style;

  const CnH6({super.key, required this.text, this.color, this.style});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: 12, fontWeight: FontWeight.w600, height: 1.4,
      color: color ?? CronixColors.text,
    )));
  }
}

enum CnTextVariant { default$, muted, dim, accent, mono }

/// Styled text component.
class CnText extends StatelessWidget {
  final String text;
  final CnTextVariant variant;
  final double? fontSize;
  final FontWeight? fontWeight;
  final TextStyle? style;

  const CnText({
    super.key,
    required this.text,
    this.variant = CnTextVariant.default$,
    this.fontSize,
    this.fontWeight,
    this.style,
  });

  @override
  Widget build(BuildContext context) {
    Color textColor;
    switch (variant) {
      case CnTextVariant.muted:
        textColor = CronixColors.textMuted;
        break;
      case CnTextVariant.dim:
        textColor = CronixColors.textDim;
        break;
      case CnTextVariant.accent:
        textColor = CronixColors.accent;
        break;
      case CnTextVariant.mono:
        textColor = CronixColors.text;
        break;
      case CnTextVariant.default$:
      default:
        textColor = CronixColors.text;
    }

    return Text(text, style: (style ?? const TextStyle()).merge(TextStyle(
      fontSize: fontSize ?? 14,
      fontWeight: fontWeight ?? FontWeight.w400,
      color: textColor,
      fontFamily: variant == CnTextVariant.mono ? 'monospace' : null,
    )));
  }
}
