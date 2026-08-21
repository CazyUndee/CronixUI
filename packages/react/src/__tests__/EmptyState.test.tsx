import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyState from '../components/EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="Empty" description="Nothing to show" />);
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<EmptyState title="Test" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
