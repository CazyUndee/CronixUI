import { mergeProps, createSignal, Show } from 'solid-js';

export function FileInput(props) {
  const merged = mergeProps({
    accept: '',
    multiple: false,
    disabled: false,
    onChange: () => {}
  }, props);

  const [dragOver, setDragOver] = createSignal(false);
  let inputRef;

  const handleFileSelect = (files) => {
    const fileList = Array.from(files);
    if (!merged.multiple && fileList.length > 0) {
      merged.onChange(fileList[0]);
    } else {
      merged.onChange(fileList);
    }
  };

  const handleChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div
      class={`cn-file-input ${dragOver() ? 'cn-file-input-dragover' : ''} ${merged.disabled ? 'cn-file-input-disabled' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        class="cn-file-input-native"
        accept={merged.accept}
        multiple={merged.multiple}
        disabled={merged.disabled}
        onChange={handleChange}
      />
      <div class="cn-file-input-content">
        <span class="cn-file-input-icon">📁</span>
        <span class="cn-file-input-text">
          Drop files here or <span class="cn-file-input-browse">browse</span>
        </span>
        <Show when={merged.accept}>
          <span class="cn-file-input-hint">Accepted: {merged.accept}</span>
        </Show>
      </div>
    </div>
  );
}
