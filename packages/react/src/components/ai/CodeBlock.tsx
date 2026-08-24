import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  showLineNumbers = false,
  maxHeight = 400,
  filename,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn('cn-code-block', className)}>
      <div className="cn-code-header">
        <div className="cn-code-lang">
          {filename && <span className="cn-code-filename">{filename}</span>}
          <span className="cn-code-language">{language}</span>
        </div>
        <button
          className="cn-code-copy"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre className="cn-code-pre" style={{ maxHeight }}>
        <code className="cn-code-content">
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className="cn-code-line">
                  <span className="cn-code-line-number">{i + 1}</span>
                  <span className="cn-code-line-text">{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
};
