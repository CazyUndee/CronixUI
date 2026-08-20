import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

class CnFileUpload extends StatelessWidget {
  final ValueChanged<List<PlatformFile>>? onFiles;
  final bool multiple;

  const CnFileUpload({super.key, this.onFiles, this.multiple = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        final result = await FilePicker.platform.pickFiles(allowMultiple: multiple);
        if (result != null && onFiles != null) onFiles!(result.files);
      },
      child: Container(
        padding: const EdgeInsets.all(32),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade800, width: 2, style: BorderStyle.solid),
          borderRadius: BorderRadius.circular(8),
        ),
        child: const Column(mainAxisSize: MainAxisSize.min, children: [
          Text('📁', style: TextStyle(fontSize: 32)),
          SizedBox(height: 8),
          Text('Drag & drop files here or click to browse', style: TextStyle(color: Colors.grey, fontSize: 13)),
        ]),
      ),
    );
  }
}
