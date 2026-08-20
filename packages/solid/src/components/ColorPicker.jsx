import { mergeProps, For, createSignal } from 'solid-js';

const DEFAULT_PRESETS = ['#6B2323', '#8B3A3A', '#C97A7A', '#1A1A1A', '#2A2A2A', '#FFFFFF', '#2A6B23', '#6B5A23', '#23356B'];

export function ColorPicker(props) {
  const merged = mergeProps({ value: '#6B2323', presets: DEFAULT_PRESETS, onChange: () => {} }, props);
  const [color, setColor] = createSignal(merged.value);

  return (
    <div class="cn-colorpicker">
      <div class="cn-colorpicker-preview" style={{ 'background-color': color() }} />
      <div class="cn-colorpicker-presets">
        <For each={merged.presets}>
          {(preset) => (
            <button
              class="cn-colorpicker-swatch"
              classList={{ 'cn-colorpicker-swatch-active': preset === color() }}
              style={{ 'background-color': preset }}
              onClick={() => { setColor(preset); merged.onChange(preset); }}
              aria-label={`Color ${preset}`}
            />
          )}
        </For>
      </div>
      <input
        type="color"
        class="cn-colorpicker-input"
        value={color()}
        onInput={(e) => { setColor(e.target.value); merged.onChange(e.target.value); }}
      />
    </div>
  );
}
