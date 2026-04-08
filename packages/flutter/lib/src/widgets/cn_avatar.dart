import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? name;
  final double size;
  final Color? backgroundColor;
  final Color? textColor;
  final VoidCallback? onTap;
  final IconData? fallbackIcon;

  const CnAvatar({
    super.key,
    this.imageUrl,
    this.name,
    this.size = 40,
    this.backgroundColor,
    this.textColor,
    this.onTap,
    this.fallbackIcon,
  });

  String get _initials {
    if (name == null || name!.isEmpty) return '';
    final parts = name!.trim().split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    Widget content;
    
    if (imageUrl != null && imageUrl!.isNotEmpty) {
      content = ClipRRect(
        borderRadius: BorderRadius.circular(size / 2),
        child: Image.network(
          imageUrl!,
          width: size,
          height: size,
          fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => _buildFallback(),
        ),
      );
    } else if (_initials.isNotEmpty) {
      content = Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: backgroundColor ?? CronixColors.accent,
          borderRadius: BorderRadius.circular(size / 2),
        ),
        child: Center(
          child: Text(
            _initials,
            style: TextStyle(
              color: textColor ?? CronixColors.text,
              fontSize: size * 0.4,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      );
    } else {
      content = _buildFallback();
    }

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        child: content,
      );
    }

    return content;
  }

  Widget _buildFallback() {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: backgroundColor ?? CronixColors.surfaceLight,
        borderRadius: BorderRadius.circular(size / 2),
        border: Border.all(color: CronixColors.border),
      ),
      child: Icon(
        fallbackIcon ?? Icons.person,
        size: size * 0.5,
        color: CronixColors.textSecondary,
      ),
    );
  }
}
