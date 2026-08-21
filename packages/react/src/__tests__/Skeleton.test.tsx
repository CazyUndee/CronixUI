import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from '../components/Skeleton';

describe('Skeleton', () => {
  it('renders a skeleton element', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('.cn-skeleton')).toBeInTheDocument();
  });

  it('renders title variant', () => {
    const { container } = render(<Skeleton variant="title" />);
    expect(container.querySelector('.cn-skeleton-title')).toBeInTheDocument();
  });

  it('renders avatar variant', () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.querySelector('.cn-skeleton-avatar')).toBeInTheDocument();
  });

  it('renders rect variant', () => {
    const { container } = render(<Skeleton variant="rect" />);
    expect(container.querySelector('.cn-skeleton-rect')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Skeleton className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width="200px" height="100px" />);
    expect(container.querySelector('.cn-skeleton')).toBeInTheDocument();
  });
});
