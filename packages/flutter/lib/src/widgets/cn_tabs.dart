import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnTabs extends StatefulWidget {
  final List<String> tabs;
  final int initialIndex;
  final ValueChanged<int>? onChanged;
  final bool fullWidth;
  final Color? indicatorColor;
  final Color? backgroundColor;

  const CnTabs({
    super.key,
    required this.tabs,
    this.initialIndex = 0,
    this.onChanged,
    this.fullWidth = false,
    this.indicatorColor,
    this.backgroundColor,
  });

  @override
  State<CnTabs> createState() => _CnTabsState();
}

class _CnTabsState extends State<CnTabs> with SingleTickerProviderStateMixin {
  late TabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TabController(
      length: widget.tabs.length,
      vsync: this,
      initialIndex: widget.initialIndex,
    );
    _controller.addListener(_handleTabChange);
  }

  void _handleTabChange() {
    if (!_controller.indexIsChanging) {
      widget.onChanged?.call(_controller.index);
    }
  }

  @override
  void didUpdateWidget(CnTabs oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.tabs.length != widget.tabs.length) {
      _controller.removeListener(_handleTabChange);
      _controller.dispose();
      _controller = TabController(
        length: widget.tabs.length,
        vsync: this,
        initialIndex: _controller.index.clamp(0, widget.tabs.length - 1),
      );
      _controller.addListener(_handleTabChange);
    }
  }

  @override
  void dispose() {
    _controller.removeListener(_handleTabChange);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.backgroundColor ?? Colors.transparent,
      child: TabBar(
        controller: _controller,
        isScrollable: !widget.fullWidth,
        indicatorSize: TabBarIndicatorSize.label,
        indicator: UnderlineTabIndicator(
          borderSide: BorderSide(
            color: widget.indicatorColor ?? CronixColors.accent,
            width: 2,
          ),
        ),
        indicatorWeight: 2,
        labelColor: CronixColors.text,
        unselectedLabelColor: CronixColors.textSecondary,
        labelStyle: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        unselectedLabelStyle: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w400,
        ),
        tabs: widget.tabs.map((tab) => Tab(text: tab)).toList(),
      ),
    );
  }
}

class CnTabView extends StatefulWidget {
  final List<Widget> children;
  final int initialIndex;

  const CnTabView({
    super.key,
    required this.children,
    this.initialIndex = 0,
  });

  @override
  State<CnTabView> createState() => _CnTabViewState();
}

class _CnTabViewState extends State<CnTabView> with SingleTickerProviderStateMixin {
  late TabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TabController(
      length: widget.children.length,
      vsync: this,
      initialIndex: widget.initialIndex,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TabBarView(
      controller: _controller,
      children: widget.children,
    );
  }
}

class CnTabsWithContent extends StatefulWidget {
  final List<TabData> tabs;
  final int initialIndex;
  final ValueChanged<int>? onChanged;

  const CnTabsWithContent({
    super.key,
    required this.tabs,
    this.initialIndex = 0,
    this.onChanged,
  });

  @override
  State<CnTabsWithContent> createState() => _CnTabsWithContentState();
}

class _CnTabsWithContentState extends State<CnTabsWithContent>
    with SingleTickerProviderStateMixin {
  late TabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TabController(
      length: widget.tabs.length,
      vsync: this,
      initialIndex: widget.initialIndex,
    );
    _controller.addListener(() {
      if (!_controller.indexIsChanging) {
        widget.onChanged?.call(_controller.index);
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: CronixColors.border),
            ),
          ),
          child: TabBar(
            controller: _controller,
            indicator: UnderlineTabIndicator(
              borderSide: BorderSide(
                color: CronixColors.accent,
                width: 2,
              ),
            ),
            labelColor: CronixColors.text,
            unselectedLabelColor: CronixColors.textSecondary,
            labelStyle: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
            tabs: widget.tabs.map((tab) => Tab(text: tab.label)).toList(),
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _controller,
            children: widget.tabs.map((tab) => tab.content).toList(),
          ),
        ),
      ],
    );
  }
}

class TabData {
  final String label;
  final Widget content;

  const TabData({
    required this.label,
    required this.content,
  });
}
