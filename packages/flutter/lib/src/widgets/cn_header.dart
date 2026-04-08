import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnHeader extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final List<Widget>? actions;
  final Widget? leading;
  final bool showBackButton;
  final double height;
  final Color? backgroundColor;
  final bool borderless;
  final Widget? flexibleSpace;

  const CnHeader({
    super.key,
    this.title,
    this.actions,
    this.leading,
    this.showBackButton = false,
    this.height = 56,
    this.backgroundColor,
    this.borderless = false,
    this.flexibleSpace,
  });

  @override
  Size get preferredSize => Size.fromHeight(height);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor ?? CronixColors.background,
        border: borderless ? null : const Border(
          bottom: BorderSide(color: CronixColors.border),
        ),
      ),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        automaticallyImplyLeading: false,
        leading: showBackButton
            ? IconButton(
                icon: const Icon(Icons.arrow_back, color: CronixColors.text),
                onPressed: () => Navigator.of(context).pop(),
              )
            : leading,
        title: title != null
            ? Text(
                title!,
                style: const TextStyle(
                  color: CronixColors.text,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              )
            : null,
        actions: actions?.map((action) => Padding(
              padding: const EdgeInsets.only(right: 8),
              child: action,
            )).toList(),
        flexibleSpace: flexibleSpace,
      ),
    );
  }
}

class CnHeaderWithSearch extends StatefulWidget implements PreferredSizeWidget {
  final String title;
  final ValueChanged<String>? onSearch;
  final String? searchPlaceholder;
  final List<Widget>? actions;
  final double height;

  const CnHeaderWithSearch({
    super.key,
    required this.title,
    this.onSearch,
    this.searchPlaceholder,
    this.actions,
    this.height = 56,
  });

  @override
  Size get preferredSize => Size.fromHeight(height * 2);

  @override
  State<CnHeaderWithSearch> createState() => _CnHeaderWithSearchState();
}

class _CnHeaderWithSearchState extends State<CnHeaderWithSearch> {
  bool _isSearching = false;
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: CronixColors.background,
        border: Border(
          bottom: BorderSide(color: CronixColors.border),
        ),
      ),
      child: Column(
        children: [
          SizedBox(
            height: widget.height,
            child: Row(
              children: [
                Expanded(
                  child: _isSearching
                      ? TextField(
                          controller: _searchController,
                          autofocus: true,
                          onChanged: widget.onSearch,
                          style: const TextStyle(color: CronixColors.text),
                          decoration: InputDecoration(
                            hintText: widget.searchPlaceholder ?? 'Search...',
                            hintStyle: const TextStyle(color: CronixColors.textMuted),
                            filled: true,
                            fillColor: CronixColors.surface,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                            border: OutlineInputBorder(
                              borderRadius: CronixRadius.radiusMD,
                              borderSide: BorderSide.none,
                            ),
                            prefixIcon: const Icon(Icons.search, color: CronixColors.textSecondary),
                          ),
                        )
                      : Padding(
                          padding: const EdgeInsets.only(left: 16),
                          child: Text(
                            widget.title,
                            style: const TextStyle(
                              color: CronixColors.text,
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                ),
                IconButton(
                  icon: Icon(
                    _isSearching ? Icons.close : Icons.search,
                    color: CronixColors.text,
                  ),
                  onPressed: () {
                    setState(() {
                      _isSearching = !_isSearching;
                      if (!_isSearching) {
                        _searchController.clear();
                        widget.onSearch?.call('');
                      }
                    });
                  },
                ),
                if (widget.actions != null) ...widget.actions!,
              ],
            ),
          ),
        ],
      ),
    );
  }
}
