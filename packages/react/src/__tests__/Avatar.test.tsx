import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from '../components/Avatar';

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(<Avatar initials="AB" size="lg" />);
    expect(container.firstChild).toHaveClass('cn-avatar');
  });

  it('applies className', () => {
    const { container } = render(<Avatar initials="AB" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders with default size', () => {
    const { container } = render(<Avatar initials="X" />);
    expect(container.firstChild).toHaveClass('cn-avatar');
  });
});
