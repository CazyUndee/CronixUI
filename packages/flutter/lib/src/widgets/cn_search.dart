import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnSearch extends StatefulWidget {
  final String? placeholder;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final List<String>? suggestions;
  final ValueChanged<String>? onSuggestionSelected;
  final bool loading;
  final IconData? searchIcon;
  final IconData? clearIcon;
  final TextEditingController? controller;
  final FocusNode? focusNode;

  const CnSearch({
    super.key,
    this.placeholder,
    this.onChanged,
    this.onSubmitted,
    this.suggestions,
    this.onSuggestionSelected,
    this.loading = false,
    this.searchIcon,
    this.clearIcon,
    this.controller,
    this.focusNode,
  });

  @override
  State<CnSearch> createState() => _CnSearchState();
}

class _CnSearchState extends State<CnSearch> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  bool _showSuggestions = false;
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_handleFocusChange);
  }

  void _handleFocusChange() {
    if (_focusNode.hasFocus && widget.suggestions != null && widget.suggestions!.isNotEmpty) {
      _showSuggestionsOverlay();
    } else {
      _hideSuggestionsOverlay();
    }
  }

  void _showSuggestionsOverlay() {
    if (_overlayEntry != null) return;
    _overlayEntry = _createOverlayEntry();
    Overlay.of(context).insert(_overlayEntry!);
  }

  void _hideSuggestionsOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  OverlayEntry _createOverlayEntry() {
    return OverlayEntry(
      builder: (context) => Positioned(
        width: 300,
        child: CompositedTransformFollower(
          link: _layerLink,
          showWhenUnlinked: false,
          offset: const Offset(0, 48),
          child: Material(
            color: Colors.transparent,
            child: Container(
              constraints: const BoxConstraints(maxHeight: 240),
              decoration: BoxDecoration(
                color: CronixColors.surface,
                borderRadius: CronixRadius.radiusMD,
                border: Border.all(color: CronixColors.border),
              ),
              child: ListView.builder(
                shrinkWrap: true,
                padding: const EdgeInsets.symmetric(vertical: 4),
                itemCount: widget.suggestions?.length ?? 0,
                itemBuilder: (context, index) {
                  final suggestion = widget.suggestions![index];
                  return InkWell(
                    onTap: () {
                      widget.onSuggestionSelected?.call(suggestion);
                      _controller.text = suggestion;
                      _hideSuggestionsOverlay();
                    },
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      child: Text(
                        suggestion,
                        style: const TextStyle(color: CronixColors.text),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _focusNode.removeListener(_handleFocusChange);
    if (widget.controller == null) _controller.dispose();
    if (widget.focusNode == null) _focusNode.dispose();
    _hideSuggestionsOverlay();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: TextField(
        controller: _controller,
        focusNode: _focusNode,
        onChanged: widget.onChanged,
        onSubmitted: widget.onSubmitted,
        style: const TextStyle(color: CronixColors.text),
        decoration: InputDecoration(
          hintText: widget.placeholder ?? 'Search...',
          hintStyle: const TextStyle(color: CronixColors.textMuted),
          filled: true,
          fillColor: CronixColors.surface,
          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          border: OutlineInputBorder(
            borderRadius: CronixRadius.radiusMD,
            borderSide: const BorderSide(color: CronixColors.border),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: CronixRadius.radiusMD,
            borderSide: const BorderSide(color: CronixColors.border),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: CronixRadius.radiusMD,
            borderSide: const BorderSide(color: CronixColors.accent, width: 2),
          ),
          prefixIcon: widget.loading
              ? const Padding(
                  padding: EdgeInsets.all(12),
                  child: SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
                )
              : Icon(
                  widget.searchIcon ?? Icons.search,
                  color: CronixColors.textSecondary,
                  size: 20,
                ),
          suffixIcon: _controller.text.isNotEmpty
              ? IconButton(
                  icon: Icon(
                    widget.clearIcon ?? Icons.clear,
                    color: CronixColors.textSecondary,
                    size: 18,
                  ),
                  onPressed: () {
                    _controller.clear();
                    widget.onChanged?.call('');
                  },
                )
              : null,
        ),
      ),
    );
  }
}
