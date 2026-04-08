import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnFileInput extends StatelessWidget {
  final String? label;
  final String buttonText;
  final IconData? icon;
  final VoidCallback? onPick;
  final String? fileName;
  final bool enabled;
  final bool loading;
  final List<String>? allowedExtensions;

  const CnFileInput({
    super.key,
    this.label,
    this.buttonText = 'Choose File',
    this.icon,
    this.onPick,
    this.fileName,
    this.enabled = true,
    this.loading = false,
    this.allowedExtensions,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: const TextStyle(
              color: CronixColors.text,
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 8),
        ],
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: CronixColors.surface,
            borderRadius: CronixRadius.radiusMD,
            border: Border.all(color: CronixColors.border),
          ),
          child: Column(
            children: [
              Icon(
                icon ?? Icons.cloud_upload_outlined,
                size: 40,
                color: CronixColors.textSecondary,
              ),
              const SizedBox(height: 12),
              if (loading)
                const CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation(CronixColors.accent),
                )
              else
                ElevatedButton(
                  onPressed: enabled ? onPick : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: CronixColors.accent,
                    foregroundColor: CronixColors.text,
                    shape: RoundedRectangleBorder(
                      borderRadius: CronixRadius.radiusMD,
                    ),
                  ),
                  child: Text(buttonText),
                ),
              if (fileName != null) ...[
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.insert_drive_file,
                      size: 16,
                      color: CronixColors.textSecondary,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      fileName!,
                      style: const TextStyle(
                        color: CronixColors.text,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ],
              if (allowedExtensions != null) ...[
                const SizedBox(height: 8),
                Text(
                  'Allowed: ${allowedExtensions!.join(', ')}',
                  style: const TextStyle(
                    color: CronixColors.textMuted,
                    fontSize: 12,
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }
}
