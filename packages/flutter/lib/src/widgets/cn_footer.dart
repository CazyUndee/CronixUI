import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnFooter extends StatelessWidget {
  final List<Widget>? leading;
  final List<Widget>? trailing;
  final String? copyright;
  final Color? backgroundColor;
  final double height;
  final bool bordered;

  const CnFooter({
    super.key,
    this.leading,
    this.trailing,
    this.copyright,
    this.backgroundColor,
    this.height = 56,
    this.bordered = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: backgroundColor ?? CronixColors.surface,
        border: bordered
            ? const Border(
                top: BorderSide(color: CronixColors.border),
              )
            : null,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          if (leading != null) ...leading!,
          const Spacer(),
          if (copyright != null)
            Text(
              copyright!,
              style: const TextStyle(
                color: CronixColors.textMuted,
                fontSize: 12,
              ),
            ),
          const Spacer(),
          if (trailing != null) ...trailing!,
        ],
      ),
    );
  }
}

class CnFooterLinks extends StatelessWidget {
  final List<FooterLink> links;
  final String? divider;

  const CnFooterLinks({
    super.key,
    required this.links,
    this.divider,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: links.asMap().entries.map((entry) {
        final index = entry.key;
        final link = entry.value;
        return Row(
          children: [
            if (index > 0 && divider != null)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text(
                  divider!,
                  style: const TextStyle(color: CronixColors.textMuted),
                ),
              ),
            InkWell(
              onTap: link.onTap,
              child: Text(
                link.label,
                style: TextStyle(
                  color: CronixColors.textSecondary,
                  fontSize: 12,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ],
        );
      }).toList(),
    );
  }
}

class FooterLink {
  final String label;
  final VoidCallback? onTap;

  const FooterLink({
    required this.label,
    this.onTap,
  });
}
