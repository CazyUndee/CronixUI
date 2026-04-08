import * as React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  brand,
  nav,
  actions,
  children,
  className = '',
  ...props
}) => {
  return (
    <header className={`cn-header ${className}`.trim()} {...props}>
      {brand && <div className="cn-header-brand">{brand}</div>}
      {nav && <div className="cn-header-nav">{nav}</div>}
      {actions && <div className="cn-header-actions">{actions}</div>}
      {children}
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
