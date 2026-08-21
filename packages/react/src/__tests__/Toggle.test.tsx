import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toggle from '../components/Toggle';

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const onChange = jest.fn();
    render(<Toggle label="Toggle" onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies className', () => {
    const { container } = render(<Toggle label="Test" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports disabled state', () => {
    render(<Toggle label="Disabled" disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders checked state', () => {
    render(<Toggle label="On" on />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders unchecked state', () => {
    render(<Toggle label="Off" on={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });
});
