import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from '../components/Drawer';

describe('Drawer Component', () => {
  test('renders when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={jest.fn()}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('has aria-modal and aria-label', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()} title="Settings">
        <p>Content</p>
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Settings');
  });

  test('closes on Escape key', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Drawer">
        <p>Content</p>
      </Drawer>
    );
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('close button has aria-label', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()} title="Drawer">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  test('applies side and size classes', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()} side="left" size="lg">
        <p>Content</p>
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('cn-drawer-left');
    expect(dialog).toHaveClass('cn-drawer-lg');
  });

  test('falls back to default aria-label when no title', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Drawer');
  });
});
