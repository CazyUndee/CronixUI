import * as React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'fluid';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const sizeClass = size !== 'md' ? `cn-container-${size}` : '';

  return (
    <div className={`cn-container ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;
