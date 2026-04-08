import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnProgress extends StatelessWidget {
  final double value;
  final double max;
  final double height;
  final Color? backgroundColor;
  final Color? valueColor;
  final bool showLabel;
  final String? label;

  const CnProgress({
    super.key,
    required this.value,
    this.max = 100,
    this.height = 8,
    this.backgroundColor,
    this.valueColor,
    this.showLabel = false,
    this.label,
  });

  double get _percentage => (value / max).clamp(0.0, 1.0);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showLabel || label != null) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label ?? 'Progress',
                style: const TextStyle(
                  color: CronixColors.text,
                  fontSize: 12,
                ),
              ),
              Text(
                '${(_percentage * 100).toStringAsFixed(0)}%',
                style: const TextStyle(
                  color: CronixColors.textSecondary,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
        ],
        Container(
          height: height,
          decoration: BoxDecoration(
            color: backgroundColor ?? CronixColors.border,
            borderRadius: CronixRadius.radiusFull,
          ),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: _percentage,
            child: Container(
              decoration: BoxDecoration(
                color: valueColor ?? CronixColors.accent,
                borderRadius: CronixRadius.radiusFull,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class CnProgressIndeterminate extends StatefulWidget {
  final double height;
  final Color? backgroundColor;
  final Color? valueColor;

  const CnProgressIndeterminate({
    super.key,
    this.height = 8,
    this.backgroundColor,
    this.valueColor,
  });

  @override
  State<CnProgressIndeterminate> createState() => _CnProgressIndeterminateState();
}

class _CnProgressIndeterminateState extends State<CnProgressIndeterminate>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          height: widget.height,
          decoration: BoxDecoration(
            color: widget.backgroundColor ?? CronixColors.border,
            borderRadius: CronixRadius.radiusFull,
          ),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Stack(
                children: [
                  Positioned(
                    left: constraints.maxWidth * _controller.value * 0.8,
                    child: Container(
                      width: constraints.maxWidth * 0.3,
                      height: widget.height,
                      decoration: BoxDecoration(
                        color: widget.valueColor ?? CronixColors.accent,
                        borderRadius: CronixRadius.radiusFull,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        );
      },
    );
  }
}
