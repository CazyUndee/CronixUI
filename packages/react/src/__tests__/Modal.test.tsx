import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../components/Modal';

describe('Modal Component', () => {
  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Content</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('has aria-modal attribute', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  test('closes on Escape key', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('closes on backdrop click', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('close button has aria-label', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Header onClose={jest.fn()}>Title</Modal.Header>
      </Modal>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  test('applies size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} size="lg">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByText('Content').closest('.cn-modal')).toHaveClass('cn-modal-lg');

    rerender(
      <Modal isOpen={true} size="xl">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByText('Content').closest('.cn-modal')).toHaveClass('cn-modal-xl');
  });
});
