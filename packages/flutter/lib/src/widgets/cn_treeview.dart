import 'package:flutter/material.dart';

class CnTreeNode {
  final String id;
  final String label;
  final List<CnTreeNode> children;

  const CnTreeNode({required this.id, required this.label, this.children = const []});
}

class CnTreeView extends StatefulWidget {
  final List<CnTreeNode> nodes;
  final String? selectedId;
  final ValueChanged<String>? onSelect;

  const CnTreeView({super.key, required this.nodes, this.selectedId, this.onSelect});

  @override
  State<CnTreeView> createState() => _CnTreeViewState();
}

class _CnTreeViewState extends State<CnTreeView> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: widget.nodes.map((node) => _buildNode(node, 0)).toList(),
    );
  }

  Widget _buildNode(CnTreeNode node, int level) {
    final isSelected = node.id == widget.selectedId;
    final hasChildren = node.children.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        InkWell(
          onTap: () => widget.onSelect?.call(node.id),
          child: Padding(
            padding: EdgeInsets.only(left: level * 20.0, top: 4, bottom: 4, right: 8),
            child: Row(
              children: [
                if (hasChildren)
                  const Icon(Icons.expand_more, size: 16, color: Colors.grey)
                else
                  const SizedBox(width: 16),
                const SizedBox(width: 4),
                Text(
                  node.label,
                  style: TextStyle(
                    color: isSelected ? const Color(0xFFC97A7A) : Colors.grey,
                    fontSize: 14,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ],
            ),
          ),
        ),
        if (hasChildren)
          ...node.children.map((child) => _buildNode(child, level + 1)),
      ],
    );
  }
}
