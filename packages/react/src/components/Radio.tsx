import * as React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  value: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked = false, onChange, disabled = false, children, name, className = '', ...props }, ref) => {
    return (
      <label className={`cn-radio ${disabled ? 'disabled' : ''} ${className}`.trim()}>
        <input
          ref={ref}
          type="radio"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          name={name}
          {...props}
        />
        <span className="cn-radio-box" />
        {children && <span className="cn-radio-label">{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  name,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: () => onChange?.(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default Radio;
