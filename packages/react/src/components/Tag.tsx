import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  children,
  onRemove,
  className = '',
  ...props
}) => {
  return (
    <div className={`cn-tag ${className}`.trim()} {...props}>
      <span>{children}</span>
      {onRemove && (
        <button className="cn-tag-remove" onClick={onRemove} aria-label="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

Tag.displayName = 'Tag';

export default Tag;
