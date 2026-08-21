import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Textarea from '../components/Textarea';

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles value change', () => {
    const onChange = jest.fn();
    render(<Textarea onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('applies className', () => {
    const { container } = render(<Textarea className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports disabled state', () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });
});
