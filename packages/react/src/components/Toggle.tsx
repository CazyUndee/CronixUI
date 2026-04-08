import * as React from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  on?: boolean;
  onChange?: (on: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  label?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({
  on: controlledOn,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = '',
  ...props
}) => {
  const [internalOn, setInternalOn] = React.useState(false);
  const isOn = controlledOn !== undefined ? controlledOn : internalOn;

  const handleToggle = () => {
    if (disabled) return;
    if (onChange) {
      onChange(!controlledOn);
    } else {
      setInternalOn(!internalOn);
    }
  };

  const sizeClass = size === 'sm' ? 'cn-toggle-sm' : size === 'lg' ? 'cn-toggle-lg' : '';

  return (
    <label className={`cn-toggle-wrapper ${className}`.trim()} {...props}>
      <div
        className={`cn-toggle ${isOn ? 'on' : ''} ${sizeClass} ${disabled ? 'disabled' : ''}`.trim()}
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      />
      {label && <span className="cn-toggle-label">{label}</span>}
    </label>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;
