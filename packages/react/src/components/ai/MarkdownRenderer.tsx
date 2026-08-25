import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Simple markdown parser (no external deps)
function parseMarkdown(text: string): string {
  let html = text;

  // Code blocks (```...```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'text';
    return `<pre class="cn-md-code-block"><div class="cn-md-code-lang">${language}</div><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="cn-md-inline-code">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="cn-md-h3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="cn-md-h2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="cn-md-h1">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="cn-md-link" href="$2" target="_blank" rel="noopener">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="cn-md-image" src="$2" alt="$1" />');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="cn-md-blockquote">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li class="cn-md-list-item">$1</li>');
  html = html.replace(/((?:<li class="cn-md-list-item">.*<\/li>\n?)+)/g, '<ul class="cn-md-list">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="cn-md-list-item-ordered">$1</li>');
  html = html.replace(/((?:<li class="cn-md-list-item-ordered">.*<\/li>\n?)+)/g, '<ol class="cn-md-list-ordered">$1</ol>');

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, rows) => {
    const headers = header.split('|').filter(Boolean).map((h: string) => `<th class="cn-md-table-th">${h.trim()}</th>`).join('');
    const rowsHtml = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter(Boolean).map((c: string) => `<td class="cn-md-table-td">${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table class="cn-md-table"><thead><tr>${headers}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
  });

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="cn-md-hr" />');

  // Paragraphs (lines that aren't already wrapped)
  html = html.replace(/^(?!<[a-z/])((?!^$).+)$/gm, '<p class="cn-md-paragraph">$1</p>');

  // Line breaks
  html = html.replace(/\n\n/g, '\n');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className={cn('cn-markdown-renderer', className)}
      role="document"
      aria-label="Markdown content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
