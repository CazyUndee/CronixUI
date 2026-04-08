import * as React from 'react';

export interface NavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  defaultActive?: string;
  active?: string;
  onChange?: (id: string) => void;
}

export interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  active?: boolean;
}

export const Nav: React.FC<NavProps> & {
  Item: React.FC<NavItemProps>;
} = Object.assign(
  ({ defaultActive, active: controlledActive, onChange, children, className = '', ...props }: NavProps) => {
    const [internalActive, setInternalActive] = React.useState(defaultActive);
    const activeItem = controlledActive !== undefined ? controlledActive : internalActive;

    const handleClick = (id: string) => {
      if (onChange) {
        onChange(id);
      } else {
        setInternalActive(id);
      }
    };

    return (
      <nav className={`cn-nav ${className}`.trim()} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<NavItemProps>(child)) {
            const isActive = child.props.active !== undefined ? child.props.active : child.props.id === activeItem;
            return React.cloneElement(child, {
              active: isActive,
              onClick: () => handleClick(child.props.id),
            } as Partial<NavItemProps>);
          }
          return child;
        })}
      </nav>
    );
  },
  {
    Item: ({ children, active = false, onClick, className = '', ...props }: NavItemProps) => (
      <div
        className={`cn-nav-item ${active ? 'cn-nav-active' : ''} ${className}`.trim()}
        onClick={onClick}
        role="tab"
        aria-selected={active}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    ),
  }
);

Nav.displayName = 'Nav';
(Nav.Item as React.FC<NavItemProps> & { displayName?: string }).displayName = 'NavItem';

export default Nav;
