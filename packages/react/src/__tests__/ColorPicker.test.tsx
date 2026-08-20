import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from '../components/ColorPicker';

describe('ColorPicker Component', () => {
  test('renders preset swatches', () => {
    render(<ColorPicker />);
    const swatches = screen.getAllByRole('radio');
    expect(swatches.length).toBeGreaterThanOrEqual(5);
  });

  test('calls onChange when swatch clicked', () => {
    const onChange = jest.fn();
    render(<ColorPicker presets={['#ff0000', '#00ff00']} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Color #ff0000'));
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  test('marks selected swatch as checked', () => {
    render(<ColorPicker presets={['#ff0000', '#00ff00']} value="#ff0000" />);
    expect(screen.getByLabelText('Color #ff0000')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByLabelText('Color #00ff00')).toHaveAttribute('aria-checked', 'false');
  });

  test('renders color input by default', () => {
    render(<ColorPicker />);
    expect(document.querySelector('input[type="color"]')).toBeInTheDocument();
  });

  test('hides input when showInput is false', () => {
    render(<ColorPicker showInput={false} />);
    expect(document.querySelector('input[type="color"]')).not.toBeInTheDocument();
  });
});
