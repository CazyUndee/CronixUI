import * as React from 'react';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  solid?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  solid = false,
  className = '',
  ...props
}) => {
  const variantClass = variant !== 'default' ? `cn-badge-${variant}` : '';
  const solidClass = solid ? 'cn-badge-solid' : '';

  return (
    <span
      className={`cn-badge ${variantClass} ${solidClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
