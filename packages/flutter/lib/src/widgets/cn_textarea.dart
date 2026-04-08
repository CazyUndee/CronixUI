import 'package:flutter/material.dart';
import '../tokens/colors.dart';
import '../tokens/spacing.dart';

class CnTextarea extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? initialValue;
  final TextEditingController? controller;
  final bool enabled;
  final int minLines;
  final int maxLines;
  final int? maxLength;
  final ValueChanged<String>? onChanged;
  final String? Function(String?)? validator;

  const CnTextarea({
    super.key,
    this.label,
    this.placeholder,
    this.initialValue,
    this.controller,
    this.enabled = true,
    this.minLines = 3,
    this.maxLines = 5,
    this.maxLength,
    this.onChanged,
    this.validator,
  });

  @override
  State<CnTextarea> createState() => _CnTextareaState();
}

class _CnTextareaState extends State<CnTextarea> {
  late TextEditingController _controller;
  String? _errorText;
  int _currentLength = 0;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? 
        TextEditingController(text: widget.initialValue);
    _currentLength = _controller.text.length;
    _controller.addListener(_updateLength);
  }

  void _updateLength() {
    setState(() => _currentLength = _controller.text.length);
  }

  @override
  void dispose() {
    _controller.removeListener(_updateLength);
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
          enabled: widget.enabled,
          minLines: widget.minLines,
          maxLines: widget.maxLines,
          maxLength: widget.maxLength,
          onChanged: widget.onChanged,
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
            contentPadding: const EdgeInsets.all(12),
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
            counterText: '',
          ),
        ),
        if (widget.maxLength != null)
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              '$_currentLength/${widget.maxLength}',
              style: TextStyle(
                color: _currentLength >= widget.maxLength! 
                    ? CronixColors.error 
                    : CronixColors.textMuted,
                fontSize: 12,
              ),
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
