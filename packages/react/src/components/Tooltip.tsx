import * as React from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children?: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className = '',
}) => {
  const positionClass = position !== 'top' ? `cn-tooltip-${position}` : '';

  return (
    <div className={`cn-tooltip ${positionClass} ${className}`.trim()}>
      {children}
      <div className="cn-tooltip-content" role="tooltip">
        {content}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
