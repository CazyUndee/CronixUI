import { useState } from 'react';

export default function Toggle({ 
  on = false, 
  onChange, 
  disabled = false, 
  size = 'md',
  className = '',
  ...props 
}) {
  const [internalOn, setInternalOn] = useState(on);
  const isOn = onChange !== undefined ? on : internalOn;

  const handleToggle = () => {
    if (disabled) return;
    if (onChange) {
      onChange(!on);
    } else {
      setInternalOn(!internalOn);
    }
  };

  const sizeClass = size === 'sm' ? 'fl-toggle-sm' : size === 'lg' ? 'fl-toggle-lg' : '';

  return (
    <div
      className={`fl-toggle ${isOn ? 'on' : ''} ${sizeClass} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleToggle}
      {...props}
    >
      <div className="fl-toggle-box"></div>
    </div>
  );
}
