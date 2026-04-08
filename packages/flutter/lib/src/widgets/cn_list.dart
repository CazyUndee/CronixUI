import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnListItem {
  final String title;
  final String? subtitle;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final VoidCallback? onTap;
  final Widget? trailing;
  final Color? backgroundColor;

  const CnListItem({
    required this.title,
    this.subtitle,
    this.leadingIcon,
    this.trailingIcon,
    this.onTap,
    this.trailing,
    this.backgroundColor,
  });
}

class CnList extends StatelessWidget {
  final List<CnListItem> items;
  final bool divided;
  final bool bordered;
  final double itemHeight;

  const CnList({
    super.key,
    required this.items,
    this.divided = true,
    this.bordered = false,
    this.itemHeight = 56,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: CronixColors.surface,
        borderRadius: CronixRadius.radiusMD,
        border: bordered ? Border.all(color: CronixColors.border) : null,
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: items.length,
        separatorBuilder: (context, index) => divided
            ? const Divider(color: CronixColors.border, height: 1)
            : const SizedBox.shrink(),
        itemBuilder: (context, index) {
          final item = items[index];
          return _buildItem(item);
        },
      ),
    );
  }

  Widget _buildItem(CnListItem item) {
    return InkWell(
      onTap: item.onTap,
      child: Container(
        height: itemHeight,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        color: item.backgroundColor,
        child: Row(
          children: [
            if (item.leadingIcon != null) ...[
              Icon(
                item.leadingIcon,
                size: 20,
                color: CronixColors.textSecondary,
              ),
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.title,
                    style: const TextStyle(
                      color: CronixColors.text,
                      fontSize: 14,
                    ),
                  ),
                  if (item.subtitle != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      item.subtitle!,
                      style: const TextStyle(
                        color: CronixColors.textSecondary,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            if (item.trailing != null) item.trailing!,
            if (item.trailingIcon != null)
              Icon(
                item.trailingIcon,
                size: 18,
                color: CronixColors.textMuted,
              ),
          ],
        ),
      ),
    );
  }
}

class CnListBuilder<T> extends StatelessWidget {
  final List<T> items;
  final Widget Function(BuildContext context, T item, int index) itemBuilder;
  final bool divided;
  final bool bordered;

  const CnListBuilder({
    super.key,
    required this.items,
    required this.itemBuilder,
    this.divided = true,
    this.bordered = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: CronixRadius.radiusMD,
        border: bordered ? Border.all(color: CronixColors.border) : null,
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: items.length,
        separatorBuilder: (context, index) => divided
            ? const Divider(color: CronixColors.border, height: 1)
            : const SizedBox.shrink(),
        itemBuilder: (context, index) => itemBuilder(context, items[index], index),
      ),
    );
  }
}
