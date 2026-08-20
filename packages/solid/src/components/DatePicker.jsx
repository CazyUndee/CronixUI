import { mergeProps } from 'solid-js';

export function DatePicker(props) {
  const merged = mergeProps({ value: '', minDate: '', maxDate: '', disabled: false, onChange: () => {} }, props);

  return (
    <div class="cn-datepicker">
      <input
        type="date"
        class="cn-datepicker-input"
        value={merged.value}
        min={merged.minDate}
        max={merged.maxDate}
        disabled={merged.disabled}
        onChange={(e) => merged.onChange(e.target.value)}
      />
    </div>
  );
}
