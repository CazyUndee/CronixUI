import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

enum CnSpinnerSize { sm, md, lg }

class CnSpinner extends StatelessWidget {
  final CnSpinnerSize size;
  final Color? color;
  final double? strokeWidth;

  const CnSpinner({
    super.key,
    this.size = CnSpinnerSize.md,
    this.color,
    this.strokeWidth,
  });

  double get _size {
    switch (size) {
      case CnSpinnerSize.sm:
        return 16;
      case CnSpinnerSize.md:
        return 24;
      case CnSpinnerSize.lg:
        return 40;
    }
  }

  double get _strokeWidth {
    return strokeWidth ?? _size / 8;
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: _size,
      height: _size,
      child: CircularProgressIndicator(
        strokeWidth: _strokeWidth,
        valueColor: AlwaysStoppedAnimation<Color>(
          color ?? CronixColors.accent,
        ),
      ),
    );
  }
}

class CnSpinnerOverlay extends StatelessWidget {
  final String? message;
  final bool visible;

  const CnSpinnerOverlay({
    super.key,
    this.message,
    this.visible = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!visible) return const SizedBox.shrink();
    
    return Container(
      color: Colors.black54,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CnSpinner(size: CnSpinnerSize.lg),
            if (message != null) ...[
              const SizedBox(height: 16),
              Text(
                message!,
                style: const TextStyle(
                  color: CronixColors.text,
                  fontSize: 14,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
