import * as React from 'react';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  icon?: React.ReactNode;
  divider?: boolean;
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
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };

      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    return (
      <div
        ref={dropdownRef}
        className={`cn-dropdown ${isOpen ? 'cn-dropdown-open' : ''} ${className}`.trim()}
        {...props}
      >
        <div
          className="cn-dropdown-trigger"
          onClick={toggle}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
        >
          {trigger}
        </div>
        <div
          className="cn-dropdown-menu"
          role="menu"
          onClick={close}
          onKeyDown={(e) => {
            const items = Array.from(dropdownRef.current?.querySelectorAll<HTMLElement>('[role=menuitem]') || []);
            const currentIdx = items.indexOf(document.activeElement as HTMLElement);
            let nextIdx = currentIdx;

            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault();
                nextIdx = (currentIdx + 1) % items.length;
                break;
              case 'ArrowUp':
                e.preventDefault();
                nextIdx = (currentIdx - 1 + items.length) % items.length;
                break;
              case 'Home':
                e.preventDefault();
                nextIdx = 0;
                break;
              case 'End':
                e.preventDefault();
                nextIdx = items.length - 1;
                break;
              default:
                return;
            }
            items[nextIdx]?.focus();
          }}
        >
          {children}
        </div>
      </div>
    );
  },
  {
    Item: ({ children, icon, onClick, className = '', ...props }: DropdownItemProps) => (
      <div
        className={`cn-dropdown-item ${className}`.trim()}
        onClick={onClick}
        role="menuitem"
        tabIndex={0}
        {...props}
      >
        {icon && <span className="cn-dropdown-item-icon">{icon}</span>}
        {children}
      </div>
    ),
    Divider: () => <div className="cn-dropdown-divider" role="separator" />,
  }
);

Dropdown.displayName = 'Dropdown';
Dropdown.Item.displayName = 'Dropdown.Item';
Dropdown.Divider.displayName = 'Dropdown.Divider';

export default Dropdown;
