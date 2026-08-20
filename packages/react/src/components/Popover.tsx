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

  return (
    <div className={`cn-popover-wrapper cn-popover-${placement}`}>
      <div className="cn-popover-trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <div className="cn-popover-content">
          {children}
        </div>
      )}
    </div>
  );
};

Popover.displayName = 'Popover';
export default Popover;
