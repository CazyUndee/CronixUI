import 'package:flutter/material.dart';

import '../tokens/colors.dart';

/// CronixUI star rating widget.
///
/// Renders `max` stars; tapping star *n* reports a rating of *n* through
/// [onChanged]. The displayed value is controlled by [value].
class CnRating extends StatefulWidget {
  final int value;
  final int max;
  final double size;
  final ValueChanged<int>? onChanged;
  final bool enabled;

  const CnRating({
    super.key,
    this.value = 0,
    this.max = 5,
    this.size = 28,
    this.onChanged,
    this.enabled = true,
  });

  @override
  State<CnRating> createState() => _CnRatingState();
}

class _CnRatingState extends State<CnRating> {
  late int _value;

  @override
  void initState() {
    super.initState();
    _value = widget.value;
  }

  @override
  void didUpdateWidget(CnRating oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _value = widget.value;
    }
  }

  void _select(int star) {
    if (!widget.enabled) return;
    setState(() => _value = star);
    widget.onChanged?.call(star);
  }

  @override
  Widget build(BuildContext context) {
    final count = widget.max < 1 ? 1 : widget.max;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(count, (index) {
        final star = index + 1;
        final filled = star <= _value;
        return GestureDetector(
          onTap: () => _select(star),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: Icon(
              filled ? Icons.star_rounded : Icons.star_border_rounded,
              size: widget.size,
              color: filled ? CronixColors.accent : CronixColors.textMuted,
            ),
          ),
        );
      }),
    );
  }
}
