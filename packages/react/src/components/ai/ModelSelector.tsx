import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ModelOption {
  id: string;
  name: string;
  provider?: string;
  description?: string;
  contextLength?: number;
  costPer1k?: number;
}

export interface ModelSelectorProps {
  models: ModelOption[];
  value: string;
  onChange: (modelId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  value,
  onChange,
  placeholder = 'Select model',
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedModel = models.find((m) => m.id === value);

  const filteredModels = models.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }
  };

  return (
    <div className={cn('cn-model-selector', disabled && 'cn-disabled', className)} ref={ref}>
      <button
        className="cn-model-selector-trigger"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={selectedModel?.name || placeholder}
      >
        <span className="cn-model-name">{selectedModel?.name || placeholder}</span>
        <span className="cn-model-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="cn-model-dropdown" role="listbox">
          <div className="cn-model-search">
            <input
              ref={inputRef}
              type="text"
              className="cn-model-search-input"
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search models"
            />
          </div>
          <div className="cn-model-list">
            {filteredModels.map((model) => (
              <button
                key={model.id}
                className={cn('cn-model-option', model.id === value && 'cn-model-option-selected')}
                onClick={() => {
                  onChange(model.id);
                  setIsOpen(false);
                  setSearch('');
                }}
                role="option"
                aria-selected={model.id === value}
              >
                <div className="cn-model-option-header">
                  <span className="cn-model-option-name">{model.name}</span>
                  {model.provider && (
                    <span className="cn-model-option-provider">{model.provider}</span>
                  )}
                </div>
                {model.description && (
                  <div className="cn-model-option-desc">{model.description}</div>
                )}
                {model.contextLength && (
                  <div className="cn-model-option-meta">
                    {model.contextLength.toLocaleString()} tokens context
                    {model.costPer1k && ` · $${model.costPer1k}/1k tokens`}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
