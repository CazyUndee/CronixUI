import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tag from '../components/Tag';

describe('Tag', () => {
  it('renders text', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Tag className="custom">Test</Tag>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders remove button when onRemove is provided', () => {
    const onRemove = jest.fn();
    render(<Tag onRemove={onRemove}>Dismissable</Tag>);
    expect(screen.getByLabelText('Remove')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<Tag onRemove={onRemove}>Dismissable</Tag>);
    fireEvent.click(screen.getByLabelText('Remove'));
    expect(onRemove).toHaveBeenCalled();
  });
});
