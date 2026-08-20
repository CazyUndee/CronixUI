import 'package:flutter/material.dart';
import '../tokens/spacing.dart';

/// Vertical stack layout with spacing.
class CnStack extends StatelessWidget {
  final List<Widget> children;
  final double? spacing;

  const CnStack({super.key, required this.children, this.spacing});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: _withSpacing(children, spacing ?? CronixSpacing.space4),
    );
  }

  static List<Widget> _withSpacing(List<Widget> children, double spacing) {
    if (children.isEmpty) return [];
    return [
      for (int i = 0; i < children.length; i++) ...[
        if (i > 0) SizedBox(height: spacing),
        children[i],
      ],
    ];
  }
}

/// Horizontal stack layout with spacing.
class CnHStack extends StatelessWidget {
  final List<Widget> children;
  final double? spacing;

  const CnHStack({super.key, required this.children, this.spacing});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: _withSpacing(children, spacing ?? CronixSpacing.space4),
    );
  }

  static List<Widget> _withSpacing(List<Widget> children, double spacing) {
    if (children.isEmpty) return [];
    return [
      for (int i = 0; i < children.length; i++) ...[
        if (i > 0) SizedBox(width: spacing),
        children[i],
      ],
    ];
  }
}
