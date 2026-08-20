import 'package:flutter/material.dart';

class CnTimelineItem {
  final String title;
  final String? description;
  final String? timestamp;
  final Color? dotColor;

  const CnTimelineItem({
    required this.title,
    this.description,
    this.timestamp,
    this.dotColor,
  });
}

class CnTimeline extends StatelessWidget {
  final List<CnTimelineItem> items;

  const CnTimeline({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(items.length, (index) {
        final item = items[index];
        final dotColor = item.dotColor ?? const Color(0xFF6B2323);
        final isLast = index == items.length - 1;
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              children: [
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: dotColor,
                  ),
                ),
                if (!isLast)
                  Container(
                    width: 2,
                    height: 40,
                    color: Colors.grey.shade800,
                  ),
              ],
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          item.title,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        if (item.timestamp != null) ...[
                          const SizedBox(width: 8),
                          Text(
                            item.timestamp!,
                            style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                          ),
                        ],
                      ],
                    ),
                    if (item.description != null)
                      Text(
                        item.description!,
                        style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                      ),
                  ],
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}
