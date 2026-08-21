import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from '../components/Breadcrumb';

describe('Breadcrumb', () => {
  it('renders all items', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Detail')).toBeInTheDocument();
  });

  it('renders separators', () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(container.querySelector('.cn-breadcrumb-separator')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <Breadcrumb className="custom">
        <Breadcrumb.Item href="/" active>Home</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('marks last item as active/current', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Current</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });
});
