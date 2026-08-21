import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../components/Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles value change', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('applies className', () => {
    const { container } = render(<Input className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('renders with error state', () => {
    const { container } = render(<Input error />);
    expect(container.querySelector('.cn-input-error')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { container } = render(<Input size="lg" placeholder="Large" />);
    expect(container.firstChild).toHaveClass('cn-input-lg');
  });
});
