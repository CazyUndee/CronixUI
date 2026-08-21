import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../components/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Select', () => {
  it('renders with options', () => {
    render(<Select options={options} placeholder="Choose fruit" />);
    expect(screen.getByText('Choose fruit')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Select options={options} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('can be disabled', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
