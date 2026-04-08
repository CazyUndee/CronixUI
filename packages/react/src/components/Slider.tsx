import * as React from 'react';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value = 0, min = 0, max = 100, step = 1, onChange, disabled = false, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        className={`cn-slider ${className}`.trim()}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.(Number(e.target.value))}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
