import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnStat extends StatelessWidget {
  final String label;
  final String value;
  final String? change;
  final bool changePositive;
  final IconData? icon;
  final Color? accentColor;
  final Widget? trailing;

  const CnStat({
    super.key,
    required this.label,
    required this.value,
    this.change,
    this.changePositive = true,
    this.icon,
    this.accentColor,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CronixColors.surface,
        borderRadius: CronixRadius.radiusMD,
        border: Border.all(color: CronixColors.border),
      ),
      child: Row(
        children: [
          if (icon != null) ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: (accentColor ?? CronixColors.accent).withOpacity(0.15),
                borderRadius: CronixRadius.radiusMD,
              ),
              child: Icon(
                icon,
                size: 24,
                color: accentColor ?? CronixColors.accent,
              ),
            ),
            const SizedBox(width: 16),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    color: CronixColors.textSecondary,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: const TextStyle(
                    color: CronixColors.text,
                    fontSize: 28,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                if (change != null) ...[
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(
                        changePositive
                            ? Icons.arrow_upward
                            : Icons.arrow_downward,
                        size: 14,
                        color: changePositive
                            ? CronixColors.success
                            : CronixColors.error,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        change!,
                        style: TextStyle(
                          color: changePositive
                              ? CronixColors.success
                              : CronixColors.error,
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
          if (trailing != null) trailing!,
        ],
      ),
    );
  }
}

class CnStatGrid extends StatelessWidget {
  final List<CnStat> stats;
  final int crossAxisCount;
  final double spacing;

  const CnStatGrid({
    super.key,
    required this.stats,
    this.crossAxisCount = 4,
    this.spacing = 16,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: spacing,
        mainAxisSpacing: spacing,
        childAspectRatio: 1.5,
      ),
      itemCount: stats.length,
      itemBuilder: (context, index) => stats[index],
    );
  }
}
