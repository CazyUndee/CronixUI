import { useState, useEffect, useRef } from 'react';

export default function Dropdown({ 
  trigger,
  children,
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
    <div ref={dropdownRef} className={`fl-dropdown ${isOpen ? 'fl-dropdown-open' : ''} ${className}`}>
      <div className="fl-dropdown-trigger" onClick={toggle}>
        {trigger}
      </div>
      <div className="fl-dropdown-menu" onClick={close}>
        {children}
      </div>
    </div>
  );
}

export function DropdownItem({ children, onClick, className = '', ...props }) {
  return (
    <div className={`fl-dropdown-item ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
