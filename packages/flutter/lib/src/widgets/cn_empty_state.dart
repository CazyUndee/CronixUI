import 'package:flutter/material.dart';

class CnEmptyState extends StatelessWidget {
  final String? icon;
  final String title;
  final String? description;
  final Widget? action;

  const CnEmptyState({super.key, this.icon, required this.title, this.description, this.action});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(48),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) Text(icon!, style: const TextStyle(fontSize: 48)),
            const SizedBox(height: 16),
            Text(title, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            if (description != null) ...[
              const SizedBox(height: 8),
              Text(description!, style: TextStyle(color: Colors.grey.shade500, fontSize: 13)),
            ],
            if (action != null) ...[const SizedBox(height: 16), action!],
          ],
        ),
      ),
    );
  }
}
