import * as React from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  position?: TooltipPosition;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className = '',
  ...props
}) => {
  const positionClass = position !== 'top' ? `cn-tooltip-${position}` : '';

  return (
    <div className={`cn-tooltip ${positionClass} ${className}`.trim()} {...props}>
      {children}
      <div className="cn-tooltip-content" role="tooltip">
        {content}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
