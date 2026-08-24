import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// A syntax-highlighted code block with copy button.
///
/// ```dart
/// CnCodeBlock(
///   code: 'void main() { print("Hello"); }',
///   language: 'dart',
///   filename: 'main.dart',
/// )
/// ```
class CnCodeBlock extends StatelessWidget {
  final String code;
  final String? language;
  final String? filename;
  final bool showLineNumbers;

  const CnCodeBlock({
    super.key,
    required this.code,
    this.language,
    this.filename,
    this.showLineNumbers = true,
  });

  @override
  Widget build(BuildContext context) {
    final lines = code.split('\n');

    return Semantics(
      label: 'Code block: ${language ?? "code"}',
      child: Container(
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF404040)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildHeader(context),
            _buildCode(context, lines),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: const BoxDecoration(
        color: Color(0xFF2D2D2D),
        border: Border(bottom: BorderSide(color: Color(0xFF404040))),
      ),
      child: Row(
        children: [
          if (language != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: const Color(0xFF3D3D3D),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                language!.toUpperCase(),
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF909090),
                ),
              ),
            ),
          if (filename != null) ...[
            const SizedBox(width: 8),
            Text(
              filename!,
              style: const TextStyle(
                fontSize: 12,
                color: Color(0xFFB0B0B0),
              ),
            ),
          ],
          const Spacer(),
          _CopyButton(text: code),
        ],
      ),
    );
  }

  Widget _buildCode(BuildContext context, List<String> lines) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: showLineNumbers
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: const BoxDecoration(
                    color: Color(0xFF252526),
                    border: Border(right: BorderSide(color: Color(0xFF404040))),
                  ),
                  child: Column(
                    children: List.generate(lines.length, (i) {
                      return SizedBox(
                        width: 40,
                        child: Text(
                          '${i + 1}',
                          textAlign: TextAlign.right,
                          style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFF858585),
                          ),
                        ),
                      );
                    }),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    code,
                    style: const TextStyle(
                      fontSize: 13,
                      fontFamily: 'monospace',
                      color: Color(0xFFD4D4D4),
                      height: 1.5,
                    ),
                  ),
                ),
              ],
            )
          : Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                code,
                style: const TextStyle(
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: Color(0xFFD4D4D4),
                  height: 1.5,
                ),
              ),
            ),
    );
  }
}

class _CopyButton extends StatefulWidget {
  final String text;
  const _CopyButton({required this.text});

  @override
  State<_CopyButton> createState() => _CopyButtonState();
}

class _CopyButtonState extends State<_CopyButton> {
  bool _copied = false;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(
        _copied ? Icons.check : Icons.copy,
        size: 16,
        color: _copied ? Colors.green : Colors.grey,
      ),
      onPressed: () async {
        await Clipboard.setData(ClipboardData(text: widget.text));
        setState(() => _copied = true);
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted) setState(() => _copied = false);
        });
      },
      tooltip: _copied ? 'Copied!' : 'Copy code',
    );
  }
}
