import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnTableColumn<T> {
  final String label;
  final double? width;
  final bool sortable;
  final String? Function(T item)? valueBuilder;
  final Widget Function(T item)? cellBuilder;
  final TextAlign alignment;

  const CnTableColumn({
    required this.label,
    this.width,
    this.sortable = false,
    this.valueBuilder,
    this.cellBuilder,
    this.alignment = TextAlign.left,
  });
}

class CnTable<T> extends StatefulWidget {
  final List<CnTableColumn<T>> columns;
  final List<T> data;
  final void Function(T item)? onRowTap;
  final bool striped;
  final bool bordered;
  final String? emptyMessage;
  final Widget? emptyWidget;

  const CnTable({
    super.key,
    required this.columns,
    required this.data,
    this.onRowTap,
    this.striped = false,
    this.bordered = false,
    this.emptyMessage,
    this.emptyWidget,
  });

  @override
  State<CnTable<T>> createState() => _CnTableState<T>();
}

class _CnTableState<T> extends State<CnTable<T>> {
  int? _sortColumnIndex;
  bool _sortAscending = true;

  void _sort(int columnIndex) {
    setState(() {
      if (_sortColumnIndex == columnIndex) {
        _sortAscending = !_sortAscending;
      } else {
        _sortColumnIndex = columnIndex;
        _sortAscending = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.data.isEmpty) {
      return widget.emptyWidget ??
          Center(
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Text(
                widget.emptyMessage ?? 'No data available',
                style: const TextStyle(color: CronixColors.textMuted),
              ),
            ),
          );
    }

    return Container(
      decoration: BoxDecoration(
        border: widget.bordered
            ? Border.all(color: CronixColors.border)
            : null,
        borderRadius: CronixRadius.radiusMD,
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: WidgetStateProperty.all(CronixColors.surfaceLight),
          dataRowColor: WidgetStateProperty.resolveWith((states) {
            if (widget.striped) {
              final index = states.contains(WidgetState.selected) ? -1 : 0;
              return index % 2 == 0
                  ? CronixColors.surface
                  : CronixColors.surfaceLight;
            }
            return Colors.transparent;
          }),
          dividerThickness: widget.bordered ? 1 : 0,
          columns: widget.columns.map((col) {
            return DataColumn(
              label: Text(
                col.label,
                style: const TextStyle(
                  color: CronixColors.text,
                  fontWeight: FontWeight.w600,
                ),
              ),
              onSort: col.sortable ? (_) => _sort(widget.columns.indexOf(col)) : null,
            );
          }).toList(),
          rows: widget.data.map((item) {
            return DataRow(
              onSelectChanged: widget.onRowTap != null
                  ? (_) => widget.onRowTap!(item)
                  : null,
              cells: widget.columns.map((col) {
                Widget cell;
                if (col.cellBuilder != null) {
                  cell = col.cellBuilder!(item);
                } else if (col.valueBuilder != null) {
                  cell = Text(
                    col.valueBuilder!(item) ?? '',
                    style: const TextStyle(color: CronixColors.text),
                    textAlign: col.alignment,
                  );
                } else {
                  cell = const SizedBox.shrink();
                }
                return DataCell(cell);
              }).toList(),
            );
          }).toList(),
        ),
      ),
    );
  }
}
