import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../components/Alert';

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders with info variant by default', () => {
    const { container } = render(<Alert>Info</Alert>);
    expect(container.firstChild).toHaveClass('cn-alert');
  });

  it('renders with success variant', () => {
    const { container } = render(<Alert variant="success">Done</Alert>);
    expect(container.firstChild).toHaveClass('cn-alert-success');
  });

  it('renders with warning variant', () => {
    const { container } = render(<Alert variant="warning">Caution</Alert>);
    expect(container.firstChild).toHaveClass('cn-alert-warning');
  });

  it('renders with error variant', () => {
    const { container } = render(<Alert variant="error">Oops</Alert>);
    expect(container.firstChild).toHaveClass('cn-alert-error');
  });

  it('applies className', () => {
    const { container } = render(<Alert className="custom">Test</Alert>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
