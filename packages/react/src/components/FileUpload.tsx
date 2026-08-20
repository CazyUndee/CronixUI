import * as React from 'react';

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ accept, multiple = false, onFiles, className = '', ...props }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files) onFiles?.(Array.from(files));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`cn-fileupload ${isDragging ? 'cn-fileupload-dragging' : ''} ${className}`.trim()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="File upload area"
      {...props}
    >
      <div className="cn-fileupload-content">
        <div className="cn-fileupload-icon">📁</div>
        <div className="cn-fileupload-text">Drag & drop files here or click to browse</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="cn-fileupload-input"
        onChange={(e) => handleFiles(e.target.files)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

FileUpload.displayName = 'FileUpload';
export default FileUpload;
