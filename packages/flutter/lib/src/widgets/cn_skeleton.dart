import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnSkeletonVariant { text, circular, rectangular }

class CnSkeleton extends StatefulWidget {
  final double? width;
  final double? height;
  final CnSkeletonVariant variant;
  final BorderRadius? borderRadius;

  const CnSkeleton({
    super.key,
    this.width,
    this.height,
    this.variant = CnSkeletonVariant.rectangular,
    this.borderRadius,
  });

  const CnSkeleton.text({
    super.key,
    this.width,
    this.height = 14,
    this.borderRadius,
  }) : variant = CnSkeletonVariant.text;

  const CnSkeleton.circular({
    super.key,
    double? size,
  })  : width = size,
        height = size,
        variant = CnSkeletonVariant.circular,
        borderRadius = null;

  @override
  State<CnSkeleton> createState() => _CnSkeletonState();
}

class _CnSkeletonState extends State<CnSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
    _animation = Tween<double>(begin: -1, end: 2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            color: CronixColors.shimmerBase,
            borderRadius: _getBorderRadius(),
          ),
          child: ClipRRect(
            borderRadius: _getBorderRadius(),
            child: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: const [
                CronixColors.shimmerBase,
                CronixColors.shimmerHighlight,
                CronixColors.shimmerBase,
              ],
              stops: [
                _animation.value - 0.3,
                _animation.value,
                _animation.value + 0.3,
              ].map((e) => e.clamp(0.0, 1.0)).toList(),
            ).createShader(
              Rect.fromLTWH(0, 0, widget.width ?? 100, widget.height ?? 14),
            ),
          ),
        );
      },
    );
  }

  BorderRadius _getBorderRadius() {
    if (widget.borderRadius != null) return widget.borderRadius!;
    switch (widget.variant) {
      case CnSkeletonVariant.text:
        return CronixRadius.radiusSM;
      case CnSkeletonVariant.circular:
        return BorderRadius.circular((widget.width ?? 40) / 2);
      case CnSkeletonVariant.rectangular:
        return CronixRadius.radiusMD;
    }
  }
}

class CnSkeletonList extends StatelessWidget {
  final int itemCount;
  final double itemHeight;
  final double spacing;

  const CnSkeletonList({
    super.key,
    this.itemCount = 5,
    this.itemHeight = 60,
    this.spacing = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(
        itemCount,
        (index) => Padding(
          padding: EdgeInsets.only(bottom: index < itemCount - 1 ? spacing : 0),
          child: const CnSkeleton(height: 60),
        ),
      ),
    );
  }
}
