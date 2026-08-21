import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stat from '../components/Stat';

describe('Stat', () => {
  it('renders value and label', () => {
    render(<Stat value="1,234" label="Users" />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders delta with arrow', () => {
    render(<Stat value="100" label="Revenue" delta="12%" deltaType="up" />);
    expect(screen.getByText(/12%/)).toBeInTheDocument();
  });

  it('renders negative delta', () => {
    render(<Stat value="50" label="Errors" delta="5%" deltaType="down" />);
    expect(screen.getByText(/5%/)).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Stat value="0" label="Test" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders without label', () => {
    render(<Stat value="42" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
