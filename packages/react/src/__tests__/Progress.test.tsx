import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Progress from '../components/Progress';

describe('Progress', () => {
  it('renders with a value', () => {
    const { container } = render(<Progress value={50} />);
    expect(container.querySelector('.cn-progress')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Progress value={50} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders different variants', () => {
    const { container } = render(<Progress value={50} variant="success" />);
    expect(container.querySelector('.cn-progress-success')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { container } = render(<Progress value={50} size="lg" />);
    expect(container.querySelector('.cn-progress-lg')).toBeInTheDocument();
  });
});
