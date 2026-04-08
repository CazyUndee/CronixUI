import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final String? label;
  final bool enabled;
  final Color? activeColor;

  const CnCheckbox({
    super.key,
    required this.value,
    this.onChanged,
    this.label,
    this.enabled = true,
    this.activeColor,
  });

  @override
  Widget build(BuildContext context) {
    final checkbox = GestureDetector(
      onTap: enabled && onChanged != null
          ? () => onChanged!(!value)
          : null,
      child: Container(
        width: 20,
        height: 20,
        decoration: BoxDecoration(
          color: value 
              ? (activeColor ?? CronixColors.accent)
              : Colors.transparent,
          borderRadius: CronixRadius.radiusSM,
          border: Border.all(
            color: value 
                ? (activeColor ?? CronixColors.accent)
                : CronixColors.borderLight,
            width: 2,
          ),
        ),
        child: value
            ? const Icon(
                Icons.check,
                size: 14,
                color: CronixColors.text,
              )
            : null,
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
            checkbox,
            const SizedBox(width: 8),
            Text(
              label!,
              style: TextStyle(
                color: enabled ? CronixColors.text : CronixColors.textMuted,
                fontSize: 14,
              ),
            ),
          ],
        ),
      );
    }

    return checkbox;
  }
}
