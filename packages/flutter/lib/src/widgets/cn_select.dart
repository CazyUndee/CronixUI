import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnSelectOption<T> {
  final T value;
  final String label;
  final IconData? icon;

  const CnSelectOption({
    required this.value,
    required this.label,
    this.icon,
  });
}

class CnSelect<T> extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final T? value;
  final List<CnSelectOption<T>> options;
  final ValueChanged<T?>? onChanged;
  final bool enabled;
  final bool searchable;
  final String? Function(T?)? validator;

  const CnSelect({
    super.key,
    this.label,
    this.placeholder,
    this.value,
    required this.options,
    this.onChanged,
    this.enabled = true,
    this.searchable = false,
    this.validator,
  });

  @override
  State<CnSelect<T>> createState() => _CnSelectState<T>();
}

class _CnSelectState<T> extends State<CnSelect<T>> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  bool _isOpen = false;
  String _searchQuery = '';
  String? _errorText;

  String get _selectedLabel {
    if (widget.value == null) return widget.placeholder ?? 'Select...';
    final option = widget.options.firstWhere(
      (o) => o.value == widget.value,
      orElse: () => CnSelectOption(value: widget.value, label: widget.placeholder ?? 'Select...'),
    );
    return option.label;
  }

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

  void _selectOption(T value) {
    widget.onChanged?.call(value);
    if (widget.validator != null) {
      setState(() => _errorText = widget.validator!(value));
    }
    _closeDropdown();
  }

  OverlayEntry _createOverlayEntry() {
    final renderBox = context.findRenderObject() as RenderBox;
    final size = renderBox.size;

    final filteredOptions = _searchQuery.isEmpty
        ? widget.options
        : widget.options
            .where((o) => o.label.toLowerCase().contains(_searchQuery.toLowerCase()))
            .toList();

    return OverlayEntry(
      builder: (context) => Positioned(
        width: size.width,
        child: CompositedTransformFollower(
          link: _layerLink,
          showWhenUnlinked: false,
          offset: Offset(0, size.height + 4),
          child: Material(
            color: Colors.transparent,
            child: Container(
              constraints: const BoxConstraints(maxHeight: 240),
              decoration: BoxDecoration(
                color: CronixColors.surface,
                borderRadius: CronixRadius.radiusMD,
                border: Border.all(color: CronixColors.border),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (widget.searchable)
                    Padding(
                      padding: const EdgeInsets.all(8),
                      child: TextField(
                        onChanged: (value) => setState(() => _searchQuery = value),
                        style: const TextStyle(color: CronixColors.text),
                        decoration: InputDecoration(
                          hintText: 'Search...',
                          hintStyle: const TextStyle(color: CronixColors.textMuted),
                          filled: true,
                          fillColor: CronixColors.background,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          border: OutlineInputBorder(
                            borderRadius: CronixRadius.radiusSM,
                            borderSide: const BorderSide(color: CronixColors.border),
                          ),
                          prefixIcon: const Icon(Icons.search, color: CronixColors.textSecondary, size: 18),
                        ),
                      ),
                    ),
                  Flexible(
                    child: ListView.builder(
                      shrinkWrap: true,
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      itemCount: filteredOptions.length,
                      itemBuilder: (context, index) {
                        final option = filteredOptions[index];
                        final isSelected = option.value == widget.value;
                        return InkWell(
                          onTap: () => _selectOption(option.value),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                            color: isSelected ? CronixColors.accent.withOpacity(0.2) : null,
                            child: Row(
                              children: [
                                if (option.icon != null) ...[
                                  Icon(option.icon, size: 18, color: CronixColors.textSecondary),
                                  const SizedBox(width: 8),
                                ],
                                Text(
                                  option.label,
                                  style: TextStyle(
                                    color: isSelected ? CronixColors.accent : CronixColors.text,
                                    fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                                  ),
                                ),
                                const Spacer(),
                                if (isSelected)
                                  const Icon(Icons.check, size: 16, color: CronixColors.accent),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: const TextStyle(
              color: CronixColors.text,
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 8),
        ],
        CompositedTransformTarget(
          link: _layerLink,
          child: GestureDetector(
            onTap: widget.enabled ? _toggleDropdown : null,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              decoration: BoxDecoration(
                color: widget.enabled ? CronixColors.surface : CronixColors.surfaceLight,
                borderRadius: CronixRadius.radiusMD,
                border: Border.all(
                  color: _errorText != null 
                      ? CronixColors.error 
                      : CronixColors.border,
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      _selectedLabel,
                      style: TextStyle(
                        color: widget.value != null 
                            ? CronixColors.text 
                            : CronixColors.textMuted,
                      ),
                    ),
                  ),
                  Icon(
                    _isOpen ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    color: CronixColors.textSecondary,
                  ),
                ],
              ),
            ),
          ),
        ),
        if (_errorText != null) ...[
          const SizedBox(height: 4),
          Text(
            _errorText!,
            style: const TextStyle(color: CronixColors.error, fontSize: 12),
          ),
        ],
      ],
    );
  }
}
