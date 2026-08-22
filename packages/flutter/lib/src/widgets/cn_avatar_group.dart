import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';
import 'cn_avatar.dart';

/// A group of overlapping avatars with optional max count.
class CnAvatarGroup extends StatelessWidget {
  final List<CnAvatar> children;
  final int? max;
  final double spacing;
  final double avatarSize;

  const CnAvatarGroup({
    super.key,
    required this.children,
    this.max,
    this.spacing = -8.0,
    this.avatarSize = 40,
  });

  @override
  Widget build(BuildContext context) {
    final visible = max != null ? children.take(max!).toList() : children;
    final remaining = max != null ? children.length - max! : 0;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < visible.length; i++)
          Transform.translate(
            offset: Offset(i * spacing, 0),
            child: Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: CronixColors.bg,
                  width: 2,
                ),
              ),
              child: visible[i],
            ),
          ),
        if (remaining > 0)
          Transform.translate(
            offset: Offset(visible.length * spacing, 0),
            child: Container(
              width: avatarSize,
              height: avatarSize,
              decoration: BoxDecoration(
                color: CronixColors.surfaceLight,
                shape: BoxShape.circle,
                border: Border.all(
                  color: CronixColors.bg,
                  width: 2,
                ),
              ),
              child: Center(
                child: Text(
                  '+$remaining',
                  style: TextStyle(
                    color: CronixColors.textSecondary,
                    fontSize: avatarSize * 0.35,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}
