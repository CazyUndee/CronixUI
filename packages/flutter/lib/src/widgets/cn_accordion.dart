import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnAccordionItem {
  final String title;
  final Widget content;
  final IconData? leadingIcon;
  final bool initiallyExpanded;

  const CnAccordionItem({
    required this.title,
    required this.content,
    this.leadingIcon,
    this.initiallyExpanded = false,
  });
}

class CnAccordion extends StatelessWidget {
  final List<CnAccordionItem> items;
  final bool allowMultiple;
  final Color? backgroundColor;
  final Color? headerBackgroundColor;

  const CnAccordion({
    super.key,
    required this.items,
    this.allowMultiple = false,
    this.backgroundColor,
    this.headerBackgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    if (allowMultiple) {
      return Column(
        children: items.asMap().entries.map((entry) {
          return Padding(
            padding: EdgeInsets.only(
              bottom: entry.key < items.length - 1 ? 1 : 0,
            ),
            child: _CnAccordionItem(
              item: entry.value,
              backgroundColor: backgroundColor,
              headerBackgroundColor: headerBackgroundColor,
            ),
          );
        }).toList(),
      );
    }

    return _CnAccordionGroup(
      items: items,
      backgroundColor: backgroundColor,
      headerBackgroundColor: headerBackgroundColor,
    );
  }
}

class _CnAccordionGroup extends StatefulWidget {
  final List<CnAccordionItem> items;
  final Color? backgroundColor;
  final Color? headerBackgroundColor;

  const _CnAccordionGroup({
    required this.items,
    this.backgroundColor,
    this.headerBackgroundColor,
  });

  @override
  State<_CnAccordionGroup> createState() => _CnAccordionGroupState();
}

class _CnAccordionGroupState extends State<_CnAccordionGroup> {
  int? _expandedIndex;

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.items.length; i++) {
      if (widget.items[i].initiallyExpanded) {
        _expandedIndex = i;
        break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: widget.items.asMap().entries.map((entry) {
        final index = entry.key;
        final item = entry.value;
        final isExpanded = _expandedIndex == index;

        return Padding(
          padding: EdgeInsets.only(
            bottom: index < widget.items.length - 1 ? 1 : 0,
          ),
          child: Container(
            decoration: BoxDecoration(
              color: widget.backgroundColor ?? CronixColors.surface,
              border: Border.all(color: CronixColors.border),
              borderRadius: CronixRadius.radiusMD,
            ),
            child: Column(
              children: [
                InkWell(
                  onTap: () {
                    setState(() {
                      _expandedIndex = isExpanded ? null : index;
                    });
                  },
                  child: Container(
                    padding: const EdgeInsets.all(16),
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
                          child: Text(
                            item.title,
                            style: const TextStyle(
                              color: CronixColors.text,
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                        Icon(
                          isExpanded
                              ? Icons.keyboard_arrow_up
                              : Icons.keyboard_arrow_down,
                          color: CronixColors.textSecondary,
                        ),
                      ],
                    ),
                  ),
                ),
                AnimatedCrossFade(
                  firstChild: const SizedBox.shrink(),
                  secondChild: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                    child: item.content,
                  ),
                  crossFadeState: isExpanded
                      ? CrossFadeState.showSecond
                      : CrossFadeState.showFirst,
                  duration: const Duration(milliseconds: 200),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}

class _CnAccordionItem extends StatefulWidget {
  final CnAccordionItem item;
  final Color? backgroundColor;
  final Color? headerBackgroundColor;

  const _CnAccordionItem({
    required this.item,
    this.backgroundColor,
    this.headerBackgroundColor,
  });

  @override
  State<_CnAccordionItem> createState() => _CnAccordionItemState();
}

class _CnAccordionItemState extends State<_CnAccordionItem> {
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _isExpanded = widget.item.initiallyExpanded;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: widget.backgroundColor ?? CronixColors.surface,
        border: Border.all(color: CronixColors.border),
        borderRadius: CronixRadius.radiusMD,
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              setState(() => _isExpanded = !_isExpanded);
            },
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  if (widget.item.leadingIcon != null) ...[
                    Icon(
                      widget.item.leadingIcon,
                      size: 20,
                      color: CronixColors.textSecondary,
                    ),
                    const SizedBox(width: 12),
                  ],
                  Expanded(
                    child: Text(
                      widget.item.title,
                      style: const TextStyle(
                        color: CronixColors.text,
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Icon(
                    _isExpanded
                        ? Icons.keyboard_arrow_up
                        : Icons.keyboard_arrow_down,
                    color: CronixColors.textSecondary,
                  ),
                ],
              ),
            ),
          ),
          AnimatedCrossFade(
            firstChild: const SizedBox.shrink(),
            secondChild: Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: widget.item.content,
            ),
            crossFadeState: _isExpanded
                ? CrossFadeState.showSecond
                : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 200),
          ),
        ],
      ),
    );
  }
}
