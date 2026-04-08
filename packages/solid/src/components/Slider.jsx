import { mergeProps } from 'solid-js';

export function Slider(props) {
  const merged = mergeProps({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    disabled: false,
    onInput: () => {}
  }, props);

  const percentage = () => {
    return ((merged.value - merged.min) / (merged.max - merged.min)) * 100;
  };

  return (
    <div class={`cn-slider ${merged.disabled ? 'cn-slider-disabled' : ''}`}>
      <input
        type="range"
        class="cn-slider-input"
        min={merged.min}
        max={merged.max}
        value={merged.value}
        step={merged.step}
        disabled={merged.disabled}
        onInput={(e) => merged.onInput?.(parseFloat(e.target.value))}
      />
      <div class="cn-slider-track">
        <div class="cn-slider-fill" style={`width: ${percentage()}%`} />
      </div>
    </div>
  );
}
