import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnPagination extends StatelessWidget {
  final int currentPage;
  final int totalPages;
  final ValueChanged<int>? onPageChanged;
  final bool showPageNumbers;
  final int maxVisiblePages;
  final String? previousLabel;
  final String? nextLabel;

  const CnPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    this.onPageChanged,
    this.showPageNumbers = true,
    this.maxVisiblePages = 5,
    this.previousLabel,
    this.nextLabel,
  });

  List<int> get _visiblePages {
    if (totalPages <= maxVisiblePages) {
      return List.generate(totalPages, (i) => i + 1);
    }

    int start = currentPage - (maxVisiblePages ~/ 2);
    int end = currentPage + (maxVisiblePages ~/ 2);

    if (start < 1) {
      end += (1 - start);
      start = 1;
    }
    if (end > totalPages) {
      start -= (end - totalPages);
      end = totalPages;
    }

    return List.generate(end - start + 1, (i) => start + i);
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _PageButton(
          icon: Icons.chevron_left,
          label: previousLabel,
          enabled: currentPage > 1,
          onPressed: () => onPageChanged?.call(currentPage - 1),
        ),
        if (showPageNumbers) ...[
          if (_visiblePages.first > 1) ...[
            _PageNumber(
              page: 1,
              isSelected: currentPage == 1,
              onPressed: () => onPageChanged?.call(1),
            ),
            if (_visiblePages.first > 2)
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 4),
                child: Text('...', style: TextStyle(color: CronixColors.textMuted)),
              ),
          ],
          ..._visiblePages.map((page) => Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: _PageNumber(
              page: page,
              isSelected: currentPage == page,
              onPressed: () => onPageChanged?.call(page),
            ),
          )),
          if (_visiblePages.last < totalPages) ...[
            if (_visiblePages.last < totalPages - 1)
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 4),
                child: Text('...', style: TextStyle(color: CronixColors.textMuted)),
              ),
            _PageNumber(
              page: totalPages,
              isSelected: currentPage == totalPages,
              onPressed: () => onPageChanged?.call(totalPages),
            ),
          ],
        ],
        _PageButton(
          icon: Icons.chevron_right,
          label: nextLabel,
          enabled: currentPage < totalPages,
          onPressed: () => onPageChanged?.call(currentPage + 1),
        ),
      ],
    );
  }
}

class _PageButton extends StatelessWidget {
  final IconData icon;
  final String? label;
  final bool enabled;
  final VoidCallback? onPressed;

  const _PageButton({
    required this.icon,
    this.label,
    required this.enabled,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: enabled ? onPressed : null,
        borderRadius: CronixRadius.radiusSM,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: CronixColors.surface,
            borderRadius: CronixRadius.radiusSM,
            border: Border.all(color: CronixColors.border),
          ),
          child: Row(
            children: [
              Icon(
                icon,
                size: 16,
                color: enabled ? CronixColors.text : CronixColors.textMuted,
              ),
              if (label != null) ...[
                const SizedBox(width: 4),
                Text(
                  label!,
                  style: TextStyle(
                    color: enabled ? CronixColors.text : CronixColors.textMuted,
                    fontSize: 13,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _PageNumber extends StatelessWidget {
  final int page;
  final bool isSelected;
  final VoidCallback? onPressed;

  const _PageNumber({
    required this.page,
    required this.isSelected,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        borderRadius: CronixRadius.radiusSM,
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: isSelected ? CronixColors.accent : CronixColors.surface,
            borderRadius: CronixRadius.radiusSM,
            border: isSelected ? null : Border.all(color: CronixColors.border),
          ),
          child: Center(
            child: Text(
              page.toString(),
              style: TextStyle(
                color: isSelected ? CronixColors.text : CronixColors.text,
                fontSize: 13,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
