import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/border_radius.dart';

/// A group of buttons joined together horizontally.
class CnButtonGroup extends StatelessWidget {
  final List<Widget> children;
  final Axis direction;
  final bool fullWidth;

  const CnButtonGroup({
    super.key,
    required this.children,
    this.direction = Axis.horizontal,
    this.fullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    if (direction == Axis.vertical) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: _buildVerticalButtons(),
      );
    }

    return Row(
      mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
      children: _buildHorizontalButtons(),
    );
  }

  List<Widget> _buildHorizontalButtons() {
    final buttons = <Widget>[];
    for (int i = 0; i < children.length; i++) {
      final isFirst = i == 0;
      final isLast = i == children.length - 1;

      buttons.add(
        Expanded(
          flex: fullWidth ? 1 : 0,
          child: ClipRRect(
            borderRadius: BorderRadius.horizontal(
              left: isFirst ? Radius.circular(CronixBorderRadius.sm) : Radius.zero,
              right: isLast ? Radius.circular(CronixBorderRadius.sm) : Radius.zero,
            ),
            child: children[i],
          ),
        ),
      );

      // Add border between buttons
      if (!isLast) {
        buttons.add(
          Container(
            width: 1,
            color: CronixColors.border,
          ),
        );
      }
    }
    return buttons;
  }

  List<Widget> _buildVerticalButtons() {
    final buttons = <Widget>[];
    for (int i = 0; i < children.length; i++) {
      final isFirst = i == 0;
      final isLast = i == children.length - 1;

      buttons.add(
        ClipRRect(
          borderRadius: BorderRadius.vertical(
            top: isFirst ? Radius.circular(CronixBorderRadius.sm) : Radius.zero,
            bottom: isLast ? Radius.circular(CronixBorderRadius.sm) : Radius.zero,
          ),
          child: children[i],
        ),
      );

      // Add border between buttons
      if (!isLast) {
        buttons.add(
          Container(
            height: 1,
            color: CronixColors.border,
          ),
        );
      }
    }
    return buttons;
  }
}
