import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnInput extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? initialValue;
  final TextEditingController? controller;
  final bool obscureText;
  final bool enabled;
  final int maxLines;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final VoidCallback? onSuffixTap;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final FocusNode? focusNode;

  const CnInput({
    super.key,
    this.label,
    this.placeholder,
    this.initialValue,
    this.controller,
    this.obscureText = false,
    this.enabled = true,
    this.maxLines = 1,
    this.prefixIcon,
    this.suffixIcon,
    this.onSuffixTap,
    this.onChanged,
    this.onSubmitted,
    this.validator,
    this.keyboardType,
    this.focusNode,
  });

  @override
  State<CnInput> createState() => _CnInputState();
}

class _CnInputState extends State<CnInput> {
  late TextEditingController _controller;
  String? _errorText;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? 
        TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: const TextStyle(
              color: CronixColors.text,
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 8),
        ],
        TextFormField(
          controller: _controller,
          obscureText: widget.obscureText,
          enabled: widget.enabled,
          maxLines: widget.maxLines,
          keyboardType: widget.keyboardType,
          focusNode: widget.focusNode,
          onChanged: widget.onChanged,
          onFieldSubmitted: widget.onSubmitted,
          validator: (value) {
            if (widget.validator != null) {
              final error = widget.validator!(value);
              setState(() => _errorText = error);
              return error;
            }
            return null;
          },
          style: const TextStyle(color: CronixColors.text),
          decoration: InputDecoration(
            hintText: widget.placeholder,
            hintStyle: const TextStyle(color: CronixColors.textMuted),
            filled: true,
            fillColor: widget.enabled ? CronixColors.surface : CronixColors.surfaceLight,
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            border: OutlineInputBorder(
              borderRadius: CronixRadius.radiusMD,
              borderSide: const BorderSide(color: CronixColors.border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: CronixRadius.radiusMD,
              borderSide: const BorderSide(color: CronixColors.border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: CronixRadius.radiusMD,
              borderSide: const BorderSide(color: CronixColors.accent, width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: CronixRadius.radiusMD,
              borderSide: const BorderSide(color: CronixColors.error),
            ),
            prefixIcon: widget.prefixIcon != null
                ? Icon(widget.prefixIcon, color: CronixColors.textSecondary, size: 20)
                : null,
            suffixIcon: widget.suffixIcon != null
                ? IconButton(
                    icon: Icon(widget.suffixIcon, color: CronixColors.textSecondary, size: 20),
                    onPressed: widget.onSuffixTap,
                  )
                : null,
          ),
        ),
        if (_errorText != null) ...[
          const SizedBox(height: 4),
          Text(
            _errorText!,
            style: const TextStyle(color: CronixColors.error, fontSize: 12),
          ),
        ],
      ],
    );
  }
}
