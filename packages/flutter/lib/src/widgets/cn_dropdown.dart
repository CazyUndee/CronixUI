import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnDropdownItem {
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
  final bool enabled;
  final bool danger;

  const CnDropdownItem({
    required this.label,
    this.icon,
    this.onTap,
    this.enabled = true,
    this.danger = false,
  });
}

class CnDropdown extends StatefulWidget {
  final Widget trigger;
  final List<CnDropdownItem> items;
  final double? width;
  final Offset offset;
  final bool closeOnSelect;

  const CnDropdown({
    super.key,
    required this.trigger,
    required this.items,
    this.width,
    this.offset = Offset.zero,
    this.closeOnSelect = true,
  });

  @override
  State<CnDropdown> createState() => _CnDropdownState();
}

class _CnDropdownState extends State<CnDropdown> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  bool _isOpen = false;

  void _toggleDropdown() {
    if (_isOpen) {
      _closeDropdown();
    } else {
      _openDropdown();
    }
  }

  void _openDropdown() {
    _overlayEntry = _createOverlayEntry();
    Overlay.of(context).insert(_overlayEntry!);
    setState(() => _isOpen = true);
  }

  void _closeDropdown() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    setState(() => _isOpen = false);
  }

  void _onItemTap(CnDropdownItem item) {
    if (!item.enabled) return;
    item.onTap?.call();
    if (widget.closeOnSelect) {
      _closeDropdown();
    }
  }

  OverlayEntry _createOverlayEntry() {
    return OverlayEntry(
      builder: (context) => Positioned(
        width: widget.width,
        child: CompositedTransformFollower(
          link: _layerLink,
          showWhenUnlinked: false,
          offset: Offset(0, 40) + widget.offset,
          child: Material(
            color: Colors.transparent,
            child: Container(
              width: widget.width ?? 200,
              constraints: const BoxConstraints(maxHeight: 300),
              decoration: BoxDecoration(
                color: CronixColors.surface,
                borderRadius: CronixRadius.radiusMD,
                border: Border.all(color: CronixColors.border),
              ),
              child: ClipRRect(
                borderRadius: CronixRadius.radiusMD,
                child: ListView.builder(
                  shrinkWrap: true,
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  itemCount: widget.items.length,
                  itemBuilder: (context, index) {
                    final item = widget.items[index];
                    return InkWell(
                      onTap: item.enabled ? () => _onItemTap(item) : null,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        child: Row(
                          children: [
                            if (item.icon != null) ...[
                              Icon(
                                item.icon,
                                size: 18,
                                color: item.danger
                                    ? CronixColors.error
                                    : CronixColors.textSecondary,
                              ),
                              const SizedBox(width: 8),
                            ],
                            Text(
                              item.label,
                              style: TextStyle(
                                color: item.enabled
                                    ? (item.danger ? CronixColors.error : CronixColors.text)
                                    : CronixColors.textMuted,
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: GestureDetector(
        onTap: _toggleDropdown,
        child: widget.trigger,
      ),
    );
  }
}
