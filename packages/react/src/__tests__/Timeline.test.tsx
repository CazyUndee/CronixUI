import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline } from '../components/Timeline';

describe('Timeline Component', () => {
  const items = [
    { title: 'Created', description: 'Issue was created', timestamp: '2h ago' },
    { title: 'In Progress', variant: 'warning' as const },
    { title: 'Completed', variant: 'success' as const },
  ];

  test('renders all items', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('renders descriptions and timestamps', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Issue was created')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  test('applies variant class', () => {
    const { container } = render(<Timeline items={items} />);
    const timelineItems = container.querySelectorAll('.cn-timeline-item');
    expect(timelineItems[0]).toHaveClass('default');
    expect(timelineItems[1]).toHaveClass('warning');
    expect(timelineItems[2]).toHaveClass('success');
  });
});
