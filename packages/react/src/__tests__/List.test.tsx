import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import List, { ListItem } from '../components/List';

describe('List', () => {
  it('renders list items', () => {
    render(
      <List>
        <ListItem title="First item" subtitle="Description 1" />
        <ListItem title="Second item" subtitle="Description 2" />
        <ListItem title="Third item" />
      </List>
    );
    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
    expect(screen.getByText('Third item')).toBeInTheDocument();
  });

  it('renders subtitles', () => {
    render(
      <List>
        <ListItem title="Item" subtitle="Description" />
      </List>
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('calls onClick when a clickable item is clicked', () => {
    const onClick = jest.fn();
    render(
      <List>
        <ListItem title="Clickable" clickable onClick={onClick} />
      </List>
    );
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies className', () => {
    const { container } = render(
      <List className="custom">
        <ListItem title="Item" />
      </List>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
