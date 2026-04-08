import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnSlider extends StatefulWidget {
  final double min;
  final double max;
  final double value;
  final ValueChanged<double>? onChanged;
  final int divisions;
  final String? label;
  final bool enabled;
  final String Function(double)? valueFormatter;

  const CnSlider({
    super.key,
    this.min = 0,
    this.max = 100,
    required this.value,
    this.onChanged,
    this.divisions = 100,
    this.label,
    this.enabled = true,
    this.valueFormatter,
  });

  @override
  State<CnSlider> createState() => _CnSliderState();
}

class _CnSliderState extends State<CnSlider> {
  late double _value;

  @override
  void initState() {
    super.initState();
    _value = widget.value;
  }

  @override
  void didUpdateWidget(CnSlider oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _value = widget.value;
    }
  }

  String _formatValue(double value) {
    if (widget.valueFormatter != null) {
      return widget.valueFormatter!(value);
    }
    return value.toStringAsFixed(0);
  }

  @override
  Widget build(BuildContext context) {
    final percent = (_value - widget.min) / (widget.max - widget.min);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.label!,
                style: const TextStyle(
                  color: CronixColors.text,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                _formatValue(_value),
                style: const TextStyle(
                  color: CronixColors.accent,
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
        ],
        Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              height: 4,
              decoration: BoxDecoration(
                color: CronixColors.border,
                borderRadius: CronixRadius.radiusFull,
              ),
            ),
            FractionallySizedBox(
              widthFactor: percent,
              child: Container(
                height: 4,
                decoration: BoxDecoration(
                  color: widget.enabled ? CronixColors.accent : CronixColors.textMuted,
                  borderRadius: CronixRadius.radiusFull,
                ),
              ),
            ),
            Positioned(
              left: MediaQuery.of(context).size.width > 0
                  ? 0
                  : 0,
              child: LayoutBuilder(
                builder: (context, constraints) {
                  return GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onHorizontalDragUpdate: widget.enabled
                        ? (details) {
                            final box = context.findRenderObject() as RenderBox;
                            final localPosition = box.globalToLocal(details.globalPosition);
                            final sliderWidth = box.size.width;
                            final newValue = widget.min + 
                                (localPosition.dx / sliderWidth) * (widget.max - widget.min);
                            final clampedValue = newValue.clamp(widget.min, widget.max);
                            setState(() => _value = clampedValue);
                            widget.onChanged?.call(clampedValue);
                          }
                        : null,
                    child: Container(
                      width: double.infinity,
                      height: 24,
                      color: Colors.transparent,
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ],
    );
  }
}
