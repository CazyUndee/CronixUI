import * as React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  size?: ModalSize;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
} = Object.assign(
  ({ isOpen = false, onClose, size = 'md', children, className = '', ...props }: ModalProps) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClass = size !== 'md' ? `cn-modal-${size}` : '';

    return (
      <div
        className={`cn-modal-backdrop cn-modal-open ${className}`.trim()}
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className={`cn-modal ${sizeClass}`.trim()}>
          {children}
        </div>
      </div>
    );
  },
  {
    Header: ({ children, onClose, className = '', ...props }: ModalHeaderProps) => (
      <div className={`cn-modal-header ${className}`.trim()} {...props}>
        <div className="cn-modal-title">{children}</div>
        {onClose && (
          <button className="cn-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    ),
    Body: ({ children, className = '', ...props }: ModalBodyProps) => (
      <div className={`cn-modal-body ${className}`.trim()} {...props}>{children}</div>
    ),
    Footer: ({ children, className = '', ...props }: ModalFooterProps) => (
      <div className={`cn-modal-footer ${className}`.trim()} {...props}>{children}</div>
    ),
  }
);

Modal.displayName = 'Modal';
Modal.Header.displayName = 'Modal.Header';
Modal.Body.displayName = 'Modal.Body';
Modal.Footer.displayName = 'Modal.Footer';

export default Modal;
