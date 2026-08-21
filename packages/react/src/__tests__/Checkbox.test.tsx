import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../components/Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Accept" onChange={onChange} />);
    fireEvent.click(screen.getByText('Accept'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies className', () => {
    const { container } = render(<Checkbox label="Test" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('can be rendered checked', () => {
    render(<Checkbox label="Checked" checked />);
    expect(screen.getByText('Checked')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });
});
