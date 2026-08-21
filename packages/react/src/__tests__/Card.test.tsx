import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';

describe('Card', () => {
  it('renders content', () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText('Card body')).toBeInTheDocument();
  });

  it('renders with compound pattern', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>My Title</Card.Title>
          <Card.Subtitle>Subtitle</Card.Subtitle>
        </Card.Header>
        <Card.Body>Content</Card.Body>
      </Card>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Card className="custom">Test</Card>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders card structure', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('.cn-card')).toBeInTheDocument();
  });

  it('renders clickable card', () => {
    const { container } = render(<Card clickable>Content</Card>);
    expect(container.querySelector('.cn-card-clickable')).toBeInTheDocument();
  });

  it('renders with footer', () => {
    render(
      <Card>
        <Card.Body>Content</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
