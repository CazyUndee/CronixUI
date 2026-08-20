import * as React from 'react';
import { createPortal } from 'react-dom';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  size = 'md',
}) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (drawerRef.current) {
          const focusable = drawerRef.current.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          focusable?.focus();
        }
      });
    }
    return () => {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="cn-drawer-overlay" onClick={onClose}>
      <div
        ref={drawerRef}
        className={`cn-drawer cn-drawer-${side} cn-drawer-${size}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Drawer'}
        onKeyDown={handleKeyDown}
      >
        {title && (
          <div className="cn-drawer-header">
            <h3 className="cn-drawer-title">{title}</h3>
            <button className="cn-drawer-close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        <div className="cn-drawer-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

Drawer.displayName = 'Drawer';
export default Drawer;
