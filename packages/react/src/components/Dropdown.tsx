import * as React from 'react';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> & {
  Item: React.FC<DropdownItemProps>;
  Divider: React.FC;
} = Object.assign(
  ({ trigger, children, className = '', ...props }: DropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          close();
        }
      };

      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div
        ref={dropdownRef}
        className={`cn-dropdown ${isOpen ? 'cn-dropdown-open' : ''} ${className}`.trim()}
        {...props}
      >
        <div className="cn-dropdown-trigger" onClick={toggle}>
          {trigger}
        </div>
        <div className="cn-dropdown-menu" onClick={close}>
          {children}
        </div>
      </div>
    );
  },
  {
    Item: ({ children, onClick, className = '', ...props }: DropdownItemProps) => (
      <div className={`cn-dropdown-item ${className}`.trim()} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    Divider: () => <div className="cn-dropdown-divider" />,
  }
);

Dropdown.displayName = 'Dropdown';
Dropdown.Item.displayName = 'Dropdown.Item';
Dropdown.Divider.displayName = 'Dropdown.Divider';

export default Dropdown;
