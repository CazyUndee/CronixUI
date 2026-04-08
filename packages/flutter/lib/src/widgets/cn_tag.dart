import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnTag extends StatelessWidget {
  final String label;
  final IconData? icon;
  final VoidCallback? onRemove;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  final Color? textColor;
  final double fontSize;
  final bool outlined;

  const CnTag({
    super.key,
    required this.label,
    this.icon,
    this.onRemove,
    this.onTap,
    this.backgroundColor,
    this.textColor,
    this.fontSize = 12,
    this.outlined = false,
  });

  @override
  Widget build(BuildContext context) {
    Widget content = Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: outlined ? null : (backgroundColor ?? CronixColors.surfaceLight),
        borderRadius: CronixRadius.radiusFull,
        border: outlined
            ? Border.all(color: backgroundColor ?? CronixColors.border)
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: fontSize, color: textColor ?? CronixColors.text),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: TextStyle(
              color: textColor ?? CronixColors.text,
              fontSize: fontSize,
              fontWeight: FontWeight.w500,
            ),
          ),
          if (onRemove != null) ...[
            const SizedBox(width: 6),
            GestureDetector(
              onTap: onRemove,
              child: Icon(
                Icons.close,
                size: fontSize + 2,
                color: textColor ?? CronixColors.textSecondary,
              ),
            ),
          ],
        ],
      ),
    );

    if (onTap != null) {
      return InkWell(
        onTap: onTap,
        borderRadius: CronixRadius.radiusFull,
        child: content,
      );
    }

    return content;
  }
}

class CnTagGroup extends StatelessWidget {
  final List<CnTag> tags;
  final WrapAlignment alignment;
  final double spacing;
  final double runSpacing;

  const CnTagGroup({
    super.key,
    required this.tags,
    this.alignment = WrapAlignment.start,
    this.spacing = 8,
    this.runSpacing = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: alignment,
      spacing: spacing,
      runSpacing: runSpacing,
      children: tags,
    );
  }
}

class CnTagInput extends StatefulWidget {
  final List<String> initialTags;
  final ValueChanged<List<String>>? onChanged;
  final String? placeholder;
  final int? maxTags;

  const CnTagInput({
    super.key,
    this.initialTags = const [],
    this.onChanged,
    this.placeholder,
    this.maxTags,
  });

  @override
  State<CnTagInput> createState() => _CnTagInputState();
}

class _CnTagInputState extends State<CnTagInput> {
  late List<String> _tags;
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tags = List.from(widget.initialTags);
  }

  void _addTag(String tag) {
    if (tag.isEmpty || _tags.contains(tag)) return;
    if (widget.maxTags != null && _tags.length >= widget.maxTags!) return;
    
    setState(() => _tags.add(tag));
    _controller.clear();
    widget.onChanged?.call(_tags);
  }

  void _removeTag(String tag) {
    setState(() => _tags.remove(tag));
    widget.onChanged?.call(_tags);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: CronixColors.surface,
        borderRadius: CronixRadius.radiusMD,
        border: Border.all(color: CronixColors.border),
      ),
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: [
          ..._tags.map((tag) => CnTag(
                label: tag,
                onRemove: () => _removeTag(tag),
              )),
          if (widget.maxTags == null || _tags.length < widget.maxTags!)
            SizedBox(
              width: 120,
              height: 28,
              child: TextField(
                controller: _controller,
                onSubmitted: _addTag,
                style: const TextStyle(color: CronixColors.text, fontSize: 12),
                decoration: InputDecoration(
                  hintText: widget.placeholder ?? 'Add tag...',
                  hintStyle: const TextStyle(color: CronixColors.textMuted),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                  isDense: true,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
