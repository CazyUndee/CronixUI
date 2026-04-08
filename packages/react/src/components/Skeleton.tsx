import * as React from 'react';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rect';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClass = variant !== 'text' ? `cn-skeleton-${variant}` : 'cn-skeleton';

  const mergedStyle: React.CSSProperties = {
    width: width,
    height: height,
    ...style,
  };

  return (
    <div
      className={`${variantClass} ${className}`.trim()}
      style={mergedStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
