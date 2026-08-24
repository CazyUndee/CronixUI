import 'package:flutter/material.dart';

/// A dropdown selector for AI models.
///
/// ```dart
/// CnModelSelector(
///   models: [
///     CnAIModel(id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI'),
///   ],
///   selected: models[0],
///   onChanged: (model) => setState(() => selected = model),
/// )
/// ```
class CnModelSelector extends StatefulWidget {
  final List<CnAIModel> models;
  final CnAIModel? selected;
  final ValueChanged<CnAIModel>? onChanged;
  final String? labelText;

  const CnModelSelector({
    super.key,
    required this.models,
    this.selected,
    this.onChanged,
    this.labelText,
  });

  @override
  State<CnModelSelector> createState() => _CnModelSelectorState();
}

class _CnModelSelectorState extends State<CnModelSelector> {
  CnAIModel? _selected;

  @override
  void initState() {
    super.initState();
    _selected = widget.selected ?? (widget.models.isNotEmpty ? widget.models[0] : null);
  }

  @override
  void didUpdateWidget(CnModelSelector oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.selected != oldWidget.selected) {
      _selected = widget.selected;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Select AI model',
      child: DropdownButtonFormField<CnAIModel>(
        value: _selected,
        decoration: InputDecoration(
          labelText: widget.labelText ?? 'Model',
          border: const OutlineInputBorder(),
          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        ),
        items: widget.models.map((model) {
          return DropdownMenuItem<CnAIModel>(
            value: model,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(model.name),
                Text(
                  model.provider,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
              ],
            ),
          );
        }).toList(),
        onChanged: (model) {
          if (model != null) {
            setState(() => _selected = model);
            widget.onChanged?.call(model);
          }
        },
      ),
    );
  }
}

/// Represents an AI model.
class CnAIModel {
  final String id;
  final String name;
  final String provider;
  final int? maxTokens;

  const CnAIModel({
    required this.id,
    required this.name,
    required this.provider,
    this.maxTokens,
  });
}

/// Token usage counter with progress bar.
class CnTokenCounter extends StatelessWidget {
  final int count;
  final int? maxTokens;

  const CnTokenCounter({
    super.key,
    required this.count,
    this.maxTokens,
  });

  String _formatCount(int n) {
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(1)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(1)}k';
    return n.toString();
  }

  @override
  Widget build(BuildContext context) {
    final percentage = maxTokens != null ? (count / maxTokens!).clamp(0.0, 1.0) : 0.0;
    final isWarning = percentage >= 0.7;
    final isDanger = percentage >= 0.9;

    return Semantics(
      label: '${_formatCount(count)} tokens used',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Text(
                'Tokens',
                style: Theme.of(context).textTheme.labelMedium,
              ),
              const SizedBox(width: 8),
              Text(
                _formatCount(count),
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      color: isDanger
                          ? Theme.of(context).colorScheme.error
                          : isWarning
                              ? Colors.orange
                              : Theme.of(context).colorScheme.primary,
                    ),
              ),
              if (maxTokens != null) ...[
                Text(
                  '/ ${_formatCount(maxTokens!)}',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
              ],
            ],
          ),
          if (maxTokens != null) ...[
            const SizedBox(height: 4),
            LinearProgressIndicator(
              value: percentage,
              backgroundColor: Theme.of(context).colorScheme.surfaceVariant,
              color: isDanger
                  ? Theme.of(context).colorScheme.error
                  : isWarning
                      ? Colors.orange
                      : Theme.of(context).colorScheme.primary,
            ),
          ],
        ],
      ),
    );
  }
}
