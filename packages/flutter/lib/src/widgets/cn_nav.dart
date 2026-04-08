import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnNavItem {
  final String label;
  final IconData icon;
  final IconData? activeIcon;
  final VoidCallback? onTap;
  final bool isActive;

  const CnNavItem({
    required this.label,
    required this.icon,
    this.activeIcon,
    this.onTap,
    this.isActive = false,
  });
}

class CnNav extends StatelessWidget {
  final List<CnNavItem> items;
  final int? selectedIndex;
  final ValueChanged<int>? onIndexChanged;
  final Color? backgroundColor;
  final bool showLabels;
  final double height;

  const CnNav({
    super.key,
    required this.items,
    this.selectedIndex,
    this.onIndexChanged,
    this.backgroundColor,
    this.showLabels = true,
    this.height = 56,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      color: backgroundColor ?? CronixColors.surface,
      child: Row(
        children: items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;
          final isSelected = selectedIndex == index || item.isActive;

          return Expanded(
            child: InkWell(
              onTap: item.onTap ?? (onIndexChanged != null ? () => onIndexChanged!(index) : null),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      isSelected && item.activeIcon != null
                          ? item.activeIcon!
                          : item.icon,
                      size: 24,
                      color: isSelected ? CronixColors.accent : CronixColors.textSecondary,
                    ),
                    if (showLabels) ...[
                      const SizedBox(height: 4),
                      Text(
                        item.label,
                        style: TextStyle(
                          color: isSelected ? CronixColors.accent : CronixColors.textSecondary,
                          fontSize: 12,
                          fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class CnNavRail extends StatelessWidget {
  final List<CnNavItem> items;
  final int? selectedIndex;
  final ValueChanged<int>? onIndexChanged;
  final Color? backgroundColor;
  final bool showLabels;
  final double width;

  const CnNavRail({
    super.key,
    required this.items,
    this.selectedIndex,
    this.onIndexChanged,
    this.backgroundColor,
    this.showLabels = true,
    this.width = 72,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      color: backgroundColor ?? CronixColors.surface,
      child: Column(
        children: items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;
          final isSelected = selectedIndex == index || item.isActive;

          return InkWell(
            onTap: item.onTap ?? (onIndexChanged != null ? () => onIndexChanged!(index) : null),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 48,
                    height: 32,
                    decoration: BoxDecoration(
                      color: isSelected ? CronixColors.accent.withOpacity(0.2) : null,
                      borderRadius: CronixRadius.radiusMD,
                    ),
                    child: Icon(
                      isSelected && item.activeIcon != null
                          ? item.activeIcon!
                          : item.icon,
                      size: 22,
                      color: isSelected ? CronixColors.accent : CronixColors.textSecondary,
                    ),
                  ),
                  if (showLabels) ...[
                    const SizedBox(height: 4),
                    Text(
                      item.label,
                      style: TextStyle(
                        color: isSelected ? CronixColors.accent : CronixColors.textSecondary,
                        fontSize: 11,
                        fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
