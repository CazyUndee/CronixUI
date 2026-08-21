import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from '../components/Nav';

describe('Nav', () => {
  it('renders all items', () => {
    render(
      <Nav>
        <Nav.Item id="home">Home</Nav.Item>
        <Nav.Item id="about">About</Nav.Item>
        <Nav.Item id="contact">Contact</Nav.Item>
      </Nav>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <Nav className="custom">
        <Nav.Item id="home">Home</Nav.Item>
      </Nav>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('highlights active item', () => {
    render(
      <Nav defaultActive="about">
        <Nav.Item id="home">Home</Nav.Item>
        <Nav.Item id="about">About</Nav.Item>
      </Nav>
    );
    expect(screen.getByText('About').closest('.cn-nav-item')).toHaveClass('cn-nav-active');
  });

  it('calls onChange when clicking an item', () => {
    const onChange = jest.fn();
    render(
      <Nav onChange={onChange}>
        <Nav.Item id="home">Home</Nav.Item>
        <Nav.Item id="about">About</Nav.Item>
      </Nav>
    );
    fireEvent.click(screen.getByText('About'));
    expect(onChange).toHaveBeenCalledWith('about');
  });
});
