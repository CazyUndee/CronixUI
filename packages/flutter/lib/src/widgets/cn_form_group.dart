import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// A form field wrapper that displays a label, error message, and helper text.
class CnFormGroup extends StatelessWidget {
  final String? label;
  final Widget child;
  final String? error;
  final String? help;
  final bool required;

  const CnFormGroup({
    super.key,
    this.label,
    required this.child,
    this.error,
    this.help,
    this.required = false,
  });

  @override
  Widget build(BuildContext context) {
    final colors = CronixColors();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Row(
            children: [
              Text(
                label!,
                style: TextStyle(
                  color: colors.textMuted,
                  fontSize: CronixSpacing.fontSm,
                  fontWeight: FontWeight.w500,
                ),
              ),
              if (required)
                Text(
                  ' *',
                  style: TextStyle(
                    color: colors.errorText,
                    fontSize: CronixSpacing.fontSm,
                  ),
                ),
            ],
          ),
          SizedBox(height: CronixSpacing.space2),
        ],
        child,
        if (error != null) ...[
          SizedBox(height: CronixSpacing.space1),
          Text(
            error!,
            style: TextStyle(
              color: colors.errorText,
              fontSize: 11,
            ),
          ),
        ] else if (help != null) ...[
          SizedBox(height: CronixSpacing.space1),
          Text(
            help!,
            style: TextStyle(
              color: colors.textDim,
              fontSize: 11,
            ),
          ),
        ],
      ],
    );
  }
}
