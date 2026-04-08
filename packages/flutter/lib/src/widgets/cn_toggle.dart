import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnToggle extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool enabled;
  final Color? activeColor;

  const CnToggle({
    super.key,
    required this.value,
    this.onChanged,
    this.label,
    this.enabled = true,
    this.activeColor,
  });

  @override
  Widget build(BuildContext context) {
    final toggle = GestureDetector(
      onTap: enabled && onChanged != null
          ? () => onChanged!(!value)
          : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 44,
        height: 24,
        decoration: BoxDecoration(
          color: value 
              ? (activeColor ?? CronixColors.accent)
              : CronixColors.border,
          borderRadius: CronixRadius.radiusFull,
        ),
        child: AnimatedAlign(
          duration: const Duration(milliseconds: 200),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 20,
            height: 20,
            margin: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: CronixColors.text,
              borderRadius: CronixRadius.radiusFull,
            ),
          ),
        ),
      ),
    );

    if (label != null) {
      return InkWell(
        onTap: enabled && onChanged != null
            ? () => onChanged!(!value)
            : null,
        borderRadius: CronixRadius.radiusSM,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              label!,
              style: TextStyle(
                color: enabled ? CronixColors.text : CronixColors.textMuted,
                fontSize: 14,
              ),
            ),
            const SizedBox(width: 12),
            toggle,
          ],
        ),
      );
    }

    return toggle;
  }
}
