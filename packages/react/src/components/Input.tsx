import * as React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  error?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', error = false, icon, action, className = '', ...props }, ref) => {
    const sizeClass = size !== 'md' ? `cn-input-${size}` : '';

    if (icon) {
      return (
        <div className="cn-input-icon-wrapper">
          <div className="cn-input-icon">{icon}</div>
          <input
            ref={ref}
            className={`cn-input ${sizeClass} ${error ? 'cn-input-error' : ''} ${className}`.trim()}
            {...props}
          />
        </div>
      );
    }

    if (action) {
      return (
        <div className="cn-input-action-wrapper">
          <input
            ref={ref}
            className={`cn-input ${sizeClass} ${error ? 'cn-input-error' : ''} ${className}`.trim()}
            {...props}
          />
          <div className="cn-input-action">{action}</div>
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={`cn-input ${sizeClass} ${error ? 'cn-input-error' : ''} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
