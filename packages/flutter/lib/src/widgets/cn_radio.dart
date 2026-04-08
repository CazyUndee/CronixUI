import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnRadio<T> extends StatelessWidget {
  final T value;
  final T? groupValue;
  final ValueChanged<T?>? onChanged;
  final String? label;
  final bool enabled;

  const CnRadio({
    super.key,
    required this.value,
    required this.groupValue,
    this.onChanged,
    this.label,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    final isSelected = value == groupValue;
    
    final radio = GestureDetector(
      onTap: enabled && onChanged != null
          ? () => onChanged!(value)
          : null,
      child: Container(
        width: 20,
        height: 20,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(
            color: isSelected 
                ? CronixColors.accent 
                : CronixColors.borderLight,
            width: 2,
          ),
        ),
        child: Center(
          child: Container(
            width: 10,
            height: 10,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isSelected ? CronixColors.accent : Colors.transparent,
            ),
          ),
        ),
      ),
    );

    if (label != null) {
      return InkWell(
        onTap: enabled && onChanged != null
            ? () => onChanged!(value)
            : null,
        borderRadius: CronixRadius.radiusSM,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            radio,
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

    return radio;
  }
}

class CnRadioGroup<T> extends StatelessWidget {
  final T? groupValue;
  final List<CnRadioOption<T>> options;
  final ValueChanged<T?>? onChanged;
  final Axis direction;
  final bool enabled;

  const CnRadioGroup({
    super.key,
    required this.groupValue,
    required this.options,
    this.onChanged,
    this.direction = Axis.vertical,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    final radios = options.map((option) {
      return Padding(
        padding: direction == Axis.vertical
            ? const EdgeInsets.only(bottom: 8)
            : const EdgeInsets.only(right: 16),
        child: CnRadio<T>(
          value: option.value,
          groupValue: groupValue,
          onChanged: onChanged,
          label: option.label,
          enabled: enabled,
        ),
      );
    }).toList();

    return direction == Axis.vertical
        ? Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: radios,
          )
        : Row(
            children: radios,
          );
  }
}

class CnRadioOption<T> {
  final T value;
  final String label;

  const CnRadioOption({
    required this.value,
    required this.label,
  });
}
