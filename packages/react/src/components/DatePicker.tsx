import * as React from 'react';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onChange,
  minDate,
  maxDate,
  format = 'YYYY-MM-DD',
  className = '',
  ...props
}) => {
  return (
    <div className={`cn-datepicker ${className}`.trim()}>
      <input
        type="date"
        className="cn-datepicker-input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        min={minDate}
        max={maxDate}
        {...props}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
export default DatePicker;
