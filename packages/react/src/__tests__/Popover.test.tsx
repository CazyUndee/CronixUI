import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from '../components/Popover';

describe('Popover Component', () => {
  test('renders trigger and hides content by default', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  test('shows content when trigger clicked', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  test('trigger has correct ARIA attributes', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Content</p>
      </Popover>
    );
    const trigger = screen.getByText('Open').closest('[role="button"]')!;
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('trigger aria-expanded updates when open', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Content</p>
      </Popover>
    );
    const trigger = screen.getByText('Open').closest('[role="button"]')!;
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('content has role dialog', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Content</p>
      </Popover>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('closes on Escape key', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Content</p>
      </Popover>
    );
    fireEvent.click(screen.getByText('Open'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('applies placement class', () => {
    const { rerender } = render(
      <Popover trigger={<button>Open</button>} placement="top">
        <p>Content</p>
      </Popover>
    );
    expect(screen.getByText('Open').closest('.cn-popover-wrapper')).toHaveClass('cn-popover-top');

    rerender(
      <Popover trigger={<button>Open</button>} placement="left">
        <p>Content</p>
      </Popover>
    );
    expect(screen.getByText('Open').closest('.cn-popover-wrapper')).toHaveClass('cn-popover-left');
  });

  test('controlled mode works', () => {
    const onToggle = jest.fn();
    render(
      <Popover trigger={<button>Open</button>} isOpen={true} onToggle={onToggle}>
        <p>Content</p>
      </Popover>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
