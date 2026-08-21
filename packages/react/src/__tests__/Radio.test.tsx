import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Radio, { RadioGroup } from '../components/Radio';

describe('RadioGroup', () => {
  it('renders all options', () => {
    render(
      <RadioGroup name="size" value="medium">
        <Radio value="small">Small</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="large">Large</Radio>
      </RadioGroup>
    );
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('calls onChange when selecting', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup name="size" value="small" onChange={onChange}>
        <Radio value="small">Small</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="large">Large</Radio>
      </RadioGroup>
    );
    fireEvent.click(screen.getByText('Medium'));
    expect(onChange).toHaveBeenCalledWith('medium');
  });

  it('applies className', () => {
    const { container } = render(
      <RadioGroup name="size" value="small" className="custom">
        <Radio value="small">Small</Radio>
      </RadioGroup>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports disabled state on individual radios', () => {
    render(
      <RadioGroup name="size" value="small">
        <Radio value="small" disabled>Small</Radio>
        <Radio value="medium">Medium</Radio>
      </RadioGroup>
    );
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('marks the selected radio', () => {
    render(
      <RadioGroup name="size" value="medium">
        <Radio value="small">Small</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="large">Large</Radio>
      </RadioGroup>
    );
    expect(screen.getByText('Medium').closest('.cn-radio')).toBeInTheDocument();
  });
});
