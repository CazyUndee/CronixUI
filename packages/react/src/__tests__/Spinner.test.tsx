import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../components/Spinner';

describe('Spinner', () => {
  it('renders', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.cn-spinner')).toBeInTheDocument();
  });

  it('applies size', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('.cn-spinner-lg')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Spinner className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
