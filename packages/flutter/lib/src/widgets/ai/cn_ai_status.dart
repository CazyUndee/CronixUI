import 'package:flutter/material.dart';

/// Status indicator for AI connection state.
///
/// ```dart
/// CnAIStatus(
///   status: CnAIStatusType.connected,
///   latency: 120,
///   model: 'GPT-4',
/// )
/// ```
enum CnAIStatusType {
  connected,
  disconnected,
  connecting,
  error,
  rateLimited,
  idle,
}

class CnAIStatus extends StatelessWidget {
  final CnAIStatusType status;
  final int? latency;
  final String? model;

  const CnAIStatus({
    super.key,
    this.status = CnAIStatusType.idle,
    this.latency,
    this.model,
  });

  @override
  Widget build(BuildContext context) {
    final config = _getStatusConfig(context);

    return Semantics(
      label: 'AI status: ${config.label}',
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surfaceVariant,
          border: Border.all(color: Theme.of(context).dividerColor),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              config.icon,
              size: 12,
              color: config.color,
            ),
            const SizedBox(width: 8),
            Text(
              config.label,
              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
            ),
            if (latency != null) ...[
              const SizedBox(width: 8),
              Text(
                '${latency}ms',
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
            ],
            if (model != null) ...[
              const SizedBox(width: 8),
              Container(
                width: 1,
                height: 14,
                color: Theme.of(context).dividerColor,
              ),
              const SizedBox(width: 8),
              Text(
                model!,
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  _StatusConfig _getStatusConfig(BuildContext context) {
    switch (status) {
      case CnAIStatusType.connected:
        return _StatusConfig(
          label: 'Connected',
          color: Colors.green,
          icon: Icons.circle,
        );
      case CnAIStatusType.disconnected:
        return _StatusConfig(
          label: 'Disconnected',
          color: Theme.of(context).colorScheme.error,
          icon: Icons.circle_outlined,
        );
      case CnAIStatusType.connecting:
        return _StatusConfig(
          label: 'Connecting...',
          color: Colors.orange,
          icon: Icons.sync,
        );
      case CnAIStatusType.error:
        return _StatusConfig(
          label: 'Error',
          color: Theme.of(context).colorScheme.error,
          icon: Icons.error_outline,
        );
      case CnAIStatusType.rateLimited:
        return _StatusConfig(
          label: 'Rate limited',
          color: Colors.orange,
          icon: Icons.timer_outlined,
        );
      case CnAIStatusType.idle:
        return _StatusConfig(
          label: 'Idle',
          color: Theme.of(context).colorScheme.onSurfaceVariant,
          icon: Icons.circle,
        );
    }
  }
}

class _StatusConfig {
  final String label;
  final Color color;
  final IconData icon;

  const _StatusConfig({
    required this.label,
    required this.color,
    required this.icon,
  });
}
