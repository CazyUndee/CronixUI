import { mergeProps, createSignal } from 'solid-js';

export function FileUpload(props) {
  const merged = mergeProps({ accept: '', multiple: false, onFiles: () => {} }, props);
  const [isDragging, setDragging] = createSignal(false);
  let inputRef;

  return (
    <div
      class="cn-fileupload"
      classList={{ 'cn-fileupload-dragging': isDragging() }}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); merged.onFiles(Array.from(e.dataTransfer.files)); }}
      onClick={() => inputRef?.click()}
    >
      <div class="cn-fileupload-content">
        <div class="cn-fileupload-icon">📁</div>
        <div class="cn-fileupload-text">Drag & drop files here or click to browse</div>
      </div>
      <input ref={inputRef} type="file" accept={merged.accept} multiple={merged.multiple} class="cn-fileupload-input"
        onChange={(e) => merged.onFiles(Array.from(e.target.files))} />
    </div>
  );
}
