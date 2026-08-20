import * as React from 'react';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom',
  isOpen: controlledOpen,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onToggle ?? setInternalOpen;
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const triggerId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen]);

  return (
    <div className={`cn-popover-wrapper cn-popover-${placement}`} ref={popoverRef}>
      <div
        className="cn-popover-trigger"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? `popover-${triggerId}` : undefined}
      >
        {trigger}
      </div>
      {open && (
        <div
          className="cn-popover-content"
          id={`popover-${triggerId}`}
          role="dialog"
        >
          {children}
        </div>
      )}
    </div>
  );
};

Popover.displayName = 'Popover';
export default Popover;
