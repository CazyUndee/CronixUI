import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chip } from '../components/Chip';

describe('Chip Component', () => {
  test('renders with text', () => {
    render(<Chip>Label</Chip>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  test('applies variant class', () => {
    const { container } = render(<Chip variant="success">Active</Chip>);
    expect(container.firstChild).toHaveClass('cn-chip-success');
  });

  test('applies size class', () => {
    const { container } = render(<Chip size="sm">Small</Chip>);
    expect(container.firstChild).toHaveClass('cn-chip-sm');
  });

  test('shows selected state', () => {
    const { container } = render(<Chip selected>Selected</Chip>);
    expect(container.firstChild).toHaveClass('cn-chip-selected');
  });
});
