import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../components/Dropdown';

describe('Dropdown', () => {
  it('renders trigger button', () => {
    render(
      <Dropdown trigger={<button>Menu</button>}>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown>
    );
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('shows items on trigger click', () => {
    render(
      <Dropdown trigger={<button>Menu</button>}>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls item onClick', () => {
    const onClick = jest.fn();
    render(
      <Dropdown trigger={<button>Menu</button>}>
        <Dropdown.Item onClick={onClick}>Edit</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies className', () => {
    const { container } = render(
      <Dropdown trigger={<button>Menu</button>} className="custom">
        <Dropdown.Item>Item</Dropdown.Item>
      </Dropdown>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders divider', () => {
    render(
      <Dropdown trigger={<button>Menu</button>}>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
