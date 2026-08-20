import 'package:flutter/material.dart';

class CnDrawer extends StatelessWidget {
  final bool isOpen;
  final VoidCallback? onClose;
  final String? title;
  final Widget child;
  final double width;

  const CnDrawer({
    super.key,
    this.isOpen = false,
    this.onClose,
    this.title,
    required this.child,
    this.width = 400,
  });

  @override
  Widget build(BuildContext context) {
    if (!isOpen) return const SizedBox.shrink();
    return Stack(
      children: [
        GestureDetector(
          onTap: onClose,
          child: Container(color: Colors.black54),
        ),
        Positioned(
          right: 0,
          top: 0,
          bottom: 0,
          width: width,
          child: Material(
            color: const Color(0xFF1A1A1A),
            child: Column(
              children: [
                if (title != null)
                  Container(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          title!,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: Colors.grey),
                          onPressed: onClose,
                        ),
                      ],
                    ),
                  ),
                const Divider(height: 1, color: Color(0xFF2A2A2A)),
                Expanded(child: child),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
