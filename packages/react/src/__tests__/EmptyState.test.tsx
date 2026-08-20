import { render, screen } from '@testing-library/react';
import { EmptyState } from '../components/EmptyState';

describe('EmptyState Component', () => {
  test('renders title', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  test('renders description when provided', () => {
    render(<EmptyState title="Empty" description="Create something new" />);
    expect(screen.getByText('Create something new')).toBeInTheDocument();
  });
});
