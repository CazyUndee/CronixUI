import * as React from 'react';

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showInput?: boolean;
}

const DEFAULT_PRESETS = [
  '#6B2323', '#8B3A3A', '#C97A7A', '#1A1A1A', '#2A2A2A',
  '#FFFFFF', '#6B2323', '#2A6B23', '#6B5A23', '#23356B',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#6B2323',
  onChange,
  presets = DEFAULT_PRESETS,
  showInput = true,
}) => {
  const [currentColor, setCurrentColor] = React.useState(value);

  const handleChange = (color: string) => {
    setCurrentColor(color);
    onChange?.(color);
  };

  return (
    <div className="cn-colorpicker">
      <div className="cn-colorpicker-preview" style={{ backgroundColor: currentColor }} />
      <div className="cn-colorpicker-presets">
        {presets.map((preset) => (
          <button
            key={preset}
            className={`cn-colorpicker-swatch ${preset === currentColor ? 'cn-colorpicker-swatch-active' : ''}`}
            style={{ backgroundColor: preset }}
            onClick={() => handleChange(preset)}
            aria-label={`Color ${preset}`}
          />
        ))}
      </div>
      {showInput && (
        <input
          type="color"
          className="cn-colorpicker-input"
          value={currentColor}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
export default ColorPicker;
