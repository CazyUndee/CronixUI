import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface Reference {
  id: string;
  title: string;
  source: string;
  snippet: string;
  url?: string;
  score?: number;
}

export interface RAGReferenceProps {
  references: Reference[];
  expandable?: boolean;
  className?: string;
}

export const RAGReference: React.FC<RAGReferenceProps> = ({
  references,
  expandable = true,
  className,
}) => {
  const [expanded, setExpanded] = useState(!expandable);

  if (references.length === 0) return null;

  return (
    <div className={cn('cn-rag-reference', className)}>
      {expandable && (
        <button
          className="cn-rag-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          📚 Sources ({references.length})
          <span className="cn-rag-chevron">{expanded ? '▲' : '▼'}</span>
        </button>
      )}

      {expanded && (
        <div className="cn-rag-list">
          {references.map((ref) => (
            <div key={ref.id} className="cn-rag-item">
              <div className="cn-rag-item-header">
                <span className="cn-rag-item-title">{ref.title}</span>
                <span className="cn-rag-item-source">{ref.source}</span>
                {ref.score !== undefined && (
                  <span className="cn-rag-item-score">
                    {Math.round(ref.score * 100)}% match
                  </span>
                )}
              </div>
              <div className="cn-rag-item-snippet">{ref.snippet}</div>
              {ref.url && (
                <a
                  className="cn-rag-item-link"
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
