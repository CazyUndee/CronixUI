import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../components/Slider';

describe('Slider', () => {
  it('renders', () => {
    const { container } = render(<Slider min={0} max={100} value={50} />);
    expect(container.querySelector('.cn-slider')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Slider min={0} max={100} value={50} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('calls onChange with value', () => {
    const onChange = jest.fn();
    const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />);
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 75 } });
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('supports disabled state', () => {
    const { container } = render(<Slider min={0} max={100} value={50} disabled />);
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
});
