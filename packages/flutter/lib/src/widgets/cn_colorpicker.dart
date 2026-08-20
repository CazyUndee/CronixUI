import 'package:flutter/material.dart';

class CnColorPicker extends StatelessWidget {
  final Color selectedColor;
  final ValueChanged<Color> onColorChanged;
  final List<Color> presets;

  const CnColorPicker({
    super.key,
    this.selectedColor = const Color(0xFF6B2323),
    required this.onColorChanged,
    this.presets = const [
      Color(0xFF6B2323), Color(0xFF8B3A3A), Color(0xFFC97A7A),
      Color(0xFF1A1A1A), Color(0xFF2A2A2A), Color(0xFFFFFFFF),
      Color(0xFF2A6B23), Color(0xFF6B5A23), Color(0xFF23356B),
    ],
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 48,
          decoration: BoxDecoration(
            color: selectedColor,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.grey.shade800),
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 4,
          runSpacing: 4,
          children: presets.map((color) {
            final isSelected = color.value == selectedColor.value;
            return GestureDetector(
              onTap: () => onColorChanged(color),
              child: Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(
                    color: isSelected ? const Color(0xFF6B2323) : Colors.transparent,
                    width: 2,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
