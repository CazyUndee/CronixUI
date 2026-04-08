import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options = [], value, onChange, placeholder = 'Select...', disabled = false, className = '', ...props }, ref) => {
    return (
      <div className={`cn-select-wrapper ${className}`.trim()}>
        <select
          ref={ref}
          className="cn-select"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
