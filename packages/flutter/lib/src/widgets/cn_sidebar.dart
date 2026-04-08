import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnSidebarItem {
  final String label;
  final IconData icon;
  final IconData? activeIcon;
  final VoidCallback? onTap;
  final bool isActive;
  final List<CnSidebarItem>? children;

  const CnSidebarItem({
    required this.label,
    required this.icon,
    this.activeIcon,
    this.onTap,
    this.isActive = false,
    this.children,
  });
}

class CnSidebar extends StatefulWidget {
  final List<CnSidebarItem> items;
  final Widget? header;
  final Widget? footer;
  final double width;
  final Color? backgroundColor;
  final bool collapsible;
  final VoidCallback? onCollapseToggle;
  final bool isCollapsed;

  const CnSidebar({
    super.key,
    required this.items,
    this.header,
    this.footer,
    this.width = 240,
    this.backgroundColor,
    this.collapsible = false,
    this.onCollapseToggle,
    this.isCollapsed = false,
  });

  @override
  State<CnSidebar> createState() => _CnSidebarState();
}

class _CnSidebarState extends State<CnSidebar> {
  late bool _isCollapsed;
  final Map<int, bool> _expandedItems = {};

  @override
  void initState() {
    super.initState();
    _isCollapsed = widget.isCollapsed;
  }

  void _toggleCollapse() {
    setState(() => _isCollapsed = !_isCollapsed);
    widget.onCollapseToggle?.call();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: _isCollapsed ? 64 : widget.width,
      decoration: BoxDecoration(
        color: widget.backgroundColor ?? CronixColors.surface,
        border: const Border(
          right: BorderSide(color: CronixColors.border),
        ),
      ),
      child: Column(
        children: [
          if (widget.header != null)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: CronixColors.border),
                ),
              ),
              child: _isCollapsed ? null : widget.header,
            ),
          if (widget.collapsible)
            IconButton(
              icon: Icon(
                _isCollapsed ? Icons.chevron_right : Icons.chevron_left,
                color: CronixColors.textSecondary,
              ),
              onPressed: _toggleCollapse,
            ),
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: widget.items.asMap().entries.map((entry) {
                  final index = entry.key;
                  final item = entry.value;
                  return _buildItem(item, index);
                }).toList(),
              ),
            ),
          ),
          if (widget.footer != null)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                border: Border(
                  top: BorderSide(color: CronixColors.border),
                ),
              ),
              child: _isCollapsed ? null : widget.footer,
            ),
        ],
      ),
    );
  }

  Widget _buildItem(CnSidebarItem item, int index) {
    final hasChildren = item.children != null && item.children!.isNotEmpty;
    final isExpanded = _expandedItems[index] ?? false;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        InkWell(
          onTap: hasChildren
              ? () => setState(() => _expandedItems[index] = !isExpanded)
              : item.onTap,
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: _isCollapsed ? 20 : 16,
              vertical: 12,
            ),
            decoration: BoxDecoration(
              color: item.isActive
                  ? CronixColors.accent.withOpacity(0.15)
                  : null,
              border: item.isActive
                  ? const Border(
                      left: BorderSide(color: CronixColors.accent, width: 3),
                    )
                  : null,
            ),
            child: Row(
              children: [
                Icon(
                  item.isActive && item.activeIcon != null
                      ? item.activeIcon!
                      : item.icon,
                  size: 20,
                  color: item.isActive ? CronixColors.accent : CronixColors.textSecondary,
                ),
                if (!_isCollapsed) ...[
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      item.label,
                      style: TextStyle(
                        color: item.isActive ? CronixColors.accent : CronixColors.text,
                        fontWeight: item.isActive ? FontWeight.w500 : FontWeight.w400,
                      ),
                    ),
                  ),
                  if (hasChildren)
                    Icon(
                      isExpanded ? Icons.expand_less : Icons.expand_more,
                      size: 18,
                      color: CronixColors.textSecondary,
                    ),
                ],
              ],
            ),
          ),
        ),
        if (hasChildren && !_isCollapsed && isExpanded)
          ...item.children!.map((child) => Container(
                margin: const EdgeInsets.only(left: 32),
                child: _buildChildItem(child),
              )),
      ],
    );
  }

  Widget _buildChildItem(CnSidebarItem item) {
    return InkWell(
      onTap: item.onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: item.isActive
              ? CronixColors.accent.withOpacity(0.1)
              : null,
        ),
        child: Text(
          item.label,
          style: TextStyle(
            color: item.isActive ? CronixColors.accent : CronixColors.textSecondary,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}
