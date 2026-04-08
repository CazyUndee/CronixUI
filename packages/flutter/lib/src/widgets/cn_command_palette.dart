import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnCommandItem {
  final String label;
  final String? shortcut;
  final IconData? icon;
  final VoidCallback? onTap;
  final String? category;

  const CnCommandItem({
    required this.label,
    this.shortcut,
    this.icon,
    this.onTap,
    this.category,
  });
}

class CnCommandPalette extends StatefulWidget {
  final List<CnCommandItem> commands;
  final String? placeholder;
  final VoidCallback? onClose;

  const CnCommandPalette({
    super.key,
    required this.commands,
    this.placeholder,
    this.onClose,
  });

  static Future<void> show({
    required BuildContext context,
    required List<CnCommandItem> commands,
    String? placeholder,
  }) {
    return showDialog(
      context: context,
      barrierColor: Colors.black87,
      builder: (context) => CnCommandPalette(
        commands: commands,
        placeholder: placeholder,
      ),
    );
  }

  @override
  State<CnCommandPalette> createState() => _CnCommandPaletteState();
}

class _CnCommandPaletteState extends State<CnCommandPalette> {
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  String _query = '';
  int _selectedIndex = 0;

  List<CnCommandItem> get _filteredCommands {
    if (_query.isEmpty) return widget.commands;
    return widget.commands
        .where((cmd) => cmd.label.toLowerCase().contains(_query.toLowerCase()))
        .toList();
  }

  Map<String, List<CnCommandItem>> get _groupedCommands {
    final groups = <String, List<CnCommandItem>>{};
    for (final cmd in _filteredCommands) {
      final category = cmd.category ?? 'General';
      groups.putIfAbsent(category, () => []).add(cmd);
    }
    return groups;
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _handleKeyEvent(KeyEvent event) {
    if (event is KeyDownEvent || event is RawKeyDownEvent) {
      final rawEvent = event as RawKeyEvent;
      if (rawEvent.logicalKey == LogicalKeyboardKey.arrowDown) {
        setState(() {
          _selectedIndex = (_selectedIndex + 1).clamp(0, _filteredCommands.length - 1);
        });
      } else if (rawEvent.logicalKey == LogicalKeyboardKey.arrowUp) {
        setState(() {
          _selectedIndex = (_selectedIndex - 1).clamp(0, _filteredCommands.length - 1);
        });
      } else if (rawEvent.logicalKey == LogicalKeyboardKey.enter) {
        if (_filteredCommands.isNotEmpty && _selectedIndex < _filteredCommands.length) {
          _filteredCommands[_selectedIndex].onTap?.call();
          Navigator.of(context).pop();
        }
      } else if (rawEvent.logicalKey == LogicalKeyboardKey.escape) {
        Navigator.of(context).pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return RawKeyboardListener(
      focusNode: FocusNode(),
      onKey: _handleKeyEvent,
      child: Dialog(
        backgroundColor: Colors.transparent,
        child: Container(
          width: 560,
          constraints: const BoxConstraints(maxHeight: 400),
          decoration: BoxDecoration(
            color: CronixColors.surface,
            borderRadius: CronixRadius.radiusLG,
            border: Border.all(color: CronixColors.border),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: TextField(
                  controller: _searchController,
                  focusNode: _focusNode,
                  onChanged: (value) => setState(() => _query = value),
                  style: const TextStyle(color: CronixColors.text, fontSize: 16),
                  decoration: InputDecoration(
                    hintText: widget.placeholder ?? 'Type a command or search...',
                    hintStyle: const TextStyle(color: CronixColors.textMuted),
                    filled: true,
                    fillColor: CronixColors.background,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    border: OutlineInputBorder(
                      borderRadius: CronixRadius.radiusMD,
                      borderSide: BorderSide.none,
                    ),
                    prefixIcon: const Icon(Icons.search, color: CronixColors.textSecondary),
                  ),
                ),
              ),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  itemCount: _groupedCommands.length,
                  itemBuilder: (context, groupIndex) {
                    final entry = _groupedCommands.entries.elementAt(groupIndex);
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          child: Text(
                            entry.key,
                            style: const TextStyle(
                              color: CronixColors.textMuted,
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                        ...entry.value.asMap().entries.map((itemEntry) {
                          final index = _filteredCommands.indexOf(itemEntry.value);
                          final isSelected = index == _selectedIndex;
                          return _CommandItemWidget(
                            item: itemEntry.value,
                            isSelected: isSelected,
                            onTap: () {
                              itemEntry.value.onTap?.call();
                              Navigator.of(context).pop();
                            },
                          );
                        }),
                      ],
                    );
                  },
                ),
              ),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: CronixColors.border),
                  ),
                ),
                child: Row(
                  children: [
                    _KeyboardHint(icon: Icons.arrow_upward, label: 'Up'),
                    _KeyboardHint(icon: Icons.arrow_downward, label: 'Down'),
                    _KeyboardHint(icon: Icons.keyboard_return, label: 'Select'),
                    _KeyboardHint(icon: Icons.close, label: 'Close'),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CommandItemWidget extends StatelessWidget {
  final CnCommandItem item;
  final bool isSelected;
  final VoidCallback onTap;

  const _CommandItemWidget({
    required this.item,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? CronixColors.accent.withOpacity(0.2) : null,
          borderRadius: CronixRadius.radiusSM,
        ),
        child: Row(
          children: [
            if (item.icon != null) ...[
              Icon(item.icon, size: 18, color: CronixColors.textSecondary),
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Text(
                item.label,
                style: TextStyle(
                  color: CronixColors.text,
                  fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                ),
              ),
            ),
            if (item.shortcut != null)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: CronixColors.border,
                  borderRadius: CronixRadius.radiusSM,
                ),
                child: Text(
                  item.shortcut!,
                  style: const TextStyle(
                    color: CronixColors.textSecondary,
                    fontSize: 11,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _KeyboardHint extends StatelessWidget {
  final IconData icon;
  final String label;

  const _KeyboardHint({
    required this.icon,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 16),
      child: Row(
        children: [
          Icon(icon, size: 14, color: CronixColors.textMuted),
          const SizedBox(width: 4),
          Text(
            label,
            style: const TextStyle(
              color: CronixColors.textMuted,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}
