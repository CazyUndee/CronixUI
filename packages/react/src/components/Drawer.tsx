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
  if (!isOpen) return null;

  return createPortal(
    <div className="cn-drawer-overlay" onClick={onClose}>
      <div
        className={`cn-drawer cn-drawer-${side} cn-drawer-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="cn-drawer-header">
            <h3 className="cn-drawer-title">{title}</h3>
            <button className="cn-drawer-close" onClick={onClose}>×</button>
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
