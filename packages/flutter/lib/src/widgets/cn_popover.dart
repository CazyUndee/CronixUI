import 'package:flutter/material.dart';

class CnPopover extends StatelessWidget {
  final Widget trigger;
  final Widget content;
  final bool isOpen;

  const CnPopover({
    super.key,
    required this.trigger,
    required this.content,
    this.isOpen = false,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        trigger,
        if (isOpen)
          Positioned(
            top: 100,
            left: 0,
            child: Material(
              color: Colors.transparent,
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.grey.shade800),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                constraints: const BoxConstraints(minWidth: 200),
                child: content,
              ),
            ),
          ),
      ],
    );
  }
}
