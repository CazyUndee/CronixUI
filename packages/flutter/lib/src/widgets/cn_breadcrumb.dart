import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnBreadcrumbItem {
  final String label;
  final VoidCallback? onTap;
  final IconData? icon;

  const CnBreadcrumbItem({
    required this.label,
    this.onTap,
    this.icon,
  });
}

class CnBreadcrumb extends StatelessWidget {
  final List<CnBreadcrumbItem> items;
  final IconData separator;
  final double fontSize;
  final Color? textColor;
  final Color? activeColor;

  const CnBreadcrumb({
    super.key,
    required this.items,
    this.separator = Icons.chevron_right,
    this.fontSize = 14,
    this.textColor,
    this.activeColor,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;
          final isLast = index == items.length - 1;

          return Row(
            children: [
              if (index > 0)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Icon(
                    separator,
                    size: 16,
                    color: CronixColors.textMuted,
                  ),
                ),
              InkWell(
                onTap: isLast ? null : item.onTap,
                borderRadius: CronixRadius.radiusSM,
                child: Row(
                  children: [
                    if (item.icon != null) ...[
                      Icon(
                        item.icon,
                        size: 16,
                        color: isLast
                            ? CronixColors.text
                            : CronixColors.textSecondary,
                      ),
                      const SizedBox(width: 6),
                    ],
                    Text(
                      item.label,
                      style: TextStyle(
                        color: isLast
                            ? (activeColor ?? CronixColors.text)
                            : (textColor ?? CronixColors.textSecondary),
                        fontSize: fontSize,
                        fontWeight: isLast ? FontWeight.w500 : FontWeight.w400,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
}
