import * as React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  onRemove,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`cn-chip cn-chip-${variant} cn-chip-${size} ${selected ? 'cn-chip-selected' : ''} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          className="cn-chip-remove"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};

Chip.displayName = 'Chip';
export default Chip;
