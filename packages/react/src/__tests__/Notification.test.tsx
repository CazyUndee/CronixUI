import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from '../components/Notification';

describe('Notification', () => {
  it('renders title and message when isOpen', () => {
    render(<Notification isOpen={true} onClose={jest.fn()} title="Alert" message="Something happened" />);
    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Notification isOpen={false} onClose={jest.fn()} title="Alert" message="Hidden" />);
    expect(screen.queryByText('Alert')).not.toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<Notification isOpen={true} onClose={jest.fn()} message="Test" />);
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<Notification isOpen={true} onClose={onClose} message="Test" />);
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  it('applies variant class', () => {
    const { container } = render(
      <Notification isOpen={true} onClose={jest.fn()} variant="success" message="Done" />
    );
    expect(container.querySelector('.cn-notification-success')).toBeInTheDocument();
  });

  it('renders message without title', () => {
    render(<Notification isOpen={true} onClose={jest.fn()} message="Just message" />);
    expect(screen.getByText('Just message')).toBeInTheDocument();
  });
});
