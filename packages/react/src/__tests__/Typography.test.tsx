import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { H1, H2, H3, H4, H5, H6, Text, Label } from '../components/Typography';

describe('Typography', () => {
  it('renders H1', () => {
    render(<H1>Heading 1</H1>);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
  });

  it('renders H2', () => {
    render(<H2>Heading 2</H2>);
    expect(screen.getByText('Heading 2')).toBeInTheDocument();
  });

  it('renders H3', () => {
    render(<H3>Heading 3</H3>);
    expect(screen.getByText('Heading 3')).toBeInTheDocument();
  });

  it('renders H4', () => {
    render(<H4>Heading 4</H4>);
    expect(screen.getByText('Heading 4')).toBeInTheDocument();
  });

  it('renders H5', () => {
    render(<H5>Heading 5</H5>);
    expect(screen.getByText('Heading 5')).toBeInTheDocument();
  });

  it('renders H6', () => {
    render(<H6>Heading 6</H6>);
    expect(screen.getByText('Heading 6')).toBeInTheDocument();
  });

  it('renders Text', () => {
    render(<Text>Body text</Text>);
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders Label', () => {
    render(<Label>Form label</Label>);
    expect(screen.getByText('Form label')).toBeInTheDocument();
  });

  it('applies className to H1', () => {
    const { container } = render(<H1 className="custom">Test</H1>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies className to Text', () => {
    const { container } = render(<Text className="custom">Test</Text>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
