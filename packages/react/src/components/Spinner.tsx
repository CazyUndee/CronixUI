import * as React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', ...props }) => {
  const sizeClass = size !== 'md' ? `cn-spinner-${size}` : '';

  return (
    <div
      className={`cn-spinner ${sizeClass} ${className}`.trim()}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
