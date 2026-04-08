import * as React from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'danger' | 'success' | 'default';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'default', size = 'md', disabled = false, className = '', ...props }, ref) => {
    const variantClass = variant !== 'default' ? `cn-btn-${variant}` : '';
    const sizeClass = size !== 'md' ? `cn-btn-${size}` : '';

    return (
      <button
        ref={ref}
        className={`cn-btn ${variantClass} ${sizeClass} ${className}`.trim()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
