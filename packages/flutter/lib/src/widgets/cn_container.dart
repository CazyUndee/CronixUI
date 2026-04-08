import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnContainer extends StatelessWidget {
  final Widget? child;
  final double? maxWidth;
  final double? minWidth;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final Color? backgroundColor;
  final bool centered;
  final double? width;
  final double? height;

  const CnContainer({
    super.key,
    this.child,
    this.maxWidth,
    this.minWidth,
    this.padding,
    this.margin,
    this.backgroundColor,
    this.centered = false,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    Widget content = Container(
      width: width,
      height: height,
      constraints: BoxConstraints(
        maxWidth: maxWidth ?? 1200,
        minWidth: minWidth ?? 0,
      ),
      padding: padding,
      decoration: backgroundColor != null
          ? BoxDecoration(color: backgroundColor)
          : null,
      child: child,
    );

    if (centered) {
      content = Center(child: content);
    }

    if (margin != null) {
      content = Padding(padding: margin!, child: content);
    }

    return content;
  }
}

class CnResponsiveContainer extends StatelessWidget {
  final Widget child;
  final double xsMaxWidth;
  final double smMaxWidth;
  final double mdMaxWidth;
  final double lgMaxWidth;
  final double xlMaxWidth;
  final EdgeInsetsGeometry? padding;

  const CnResponsiveContainer({
    super.key,
    required this.child,
    this.xsMaxWidth = 640,
    this.smMaxWidth = 768,
    this.mdMaxWidth = 1024,
    this.lgMaxWidth = 1280,
    this.xlMaxWidth = 1536,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double maxWidth;
        if (constraints.maxWidth < 640) {
          maxWidth = xsMaxWidth;
        } else if (constraints.maxWidth < 768) {
          maxWidth = smMaxWidth;
        } else if (constraints.maxWidth < 1024) {
          maxWidth = mdMaxWidth;
        } else if (constraints.maxWidth < 1280) {
          maxWidth = lgMaxWidth;
        } else {
          maxWidth = xlMaxWidth;
        }

        return Container(
          width: double.infinity,
          constraints: BoxConstraints(maxWidth: maxWidth),
          padding: padding ?? EdgeInsets.symmetric(
            horizontal: constraints.maxWidth < 640 ? 16 : 24,
          ),
          child: child,
        );
      },
    );
  }
}

class CnSection extends StatelessWidget {
  final Widget? child;
  final String? title;
  final String? subtitle;
  final EdgeInsetsGeometry? padding;
  final double minHeight;

  const CnSection({
    super.key,
    this.child,
    this.title,
    this.subtitle,
    this.padding,
    this.minHeight = 0,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(minHeight: minHeight),
      padding: padding ?? const EdgeInsets.symmetric(vertical: 48),
      child: child,
    );
  }
}
