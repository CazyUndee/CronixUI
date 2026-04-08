import * as React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClass = size !== 'md' ? `cn-avatar-${size}` : '';

  return (
    <div className={`cn-avatar ${sizeClass} ${className}`.trim()} {...props}>
      {src ? (
        <img src={src} alt={alt} />
      ) : initials ? (
        initials
      ) : null}
    </div>
  );
};

Avatar.displayName = 'Avatar';

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, max, className = '', ...props }) => {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const remaining = max ? items.length - max : 0;

  return (
    <div className={`cn-avatar-group ${className}`.trim()} {...props}>
      {visible}
      {remaining > 0 && <div className="cn-avatar">+{remaining}</div>}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
