import 'package:flutter/material.dart';

class CnNotification extends StatelessWidget {
  final String message;
  final String? title;
  final String variant;
  final VoidCallback? onClose;

  const CnNotification({super.key, required this.message, this.title, this.variant = 'info', this.onClose});

  @override
  Widget build(BuildContext context) {
    final colors = {'info': const Color(0xFF23356B), 'success': const Color(0xFF2A6B23), 'warning': const Color(0xFF6B5A23), 'error': const Color(0xFF6B2323)};
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(8),
        border: Border(left: BorderSide(color: colors[variant] ?? colors['info']!, width: 3)),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 20)],
      ),
      child: Row(
        children: [
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            if (title != null) Text(title!, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
            Text(message, style: TextStyle(color: Colors.grey.shade500, fontSize: 13)),
          ])),
          if (onClose != null) IconButton(icon: const Icon(Icons.close, size: 16, color: Colors.grey), onPressed: onClose),
        ],
      ),
    );
  }
}
