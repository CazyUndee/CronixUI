import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from '../components/Stepper';

describe('Stepper Component', () => {
  const steps = [
    { label: 'Step 1', description: 'First step' },
    { label: 'Step 2', description: 'Second step' },
    { label: 'Step 3' },
  ];

  test('renders all steps', () => {
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  test('shows descriptions when provided', () => {
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
  });

  test('applies correct step classes', () => {
    const { container } = render(<Stepper steps={steps} currentStep={1} />);
    const stepEls = container.querySelectorAll('.cn-stepper-step');
    expect(stepEls[0]).toHaveClass('completed');
    expect(stepEls[1]).toHaveClass('active');
    expect(stepEls[2]).toHaveClass('pending');
  });

  test('renders checkmark for completed steps', () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBeGreaterThanOrEqual(1);
  });

  test('has list role for accessibility', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    expect(container.querySelector('[role="list"]')).toBeInTheDocument();
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items).toHaveLength(3);
  });

  test('sets aria-current on active step', () => {
    const { container } = render(<Stepper steps={steps} currentStep={1} />);
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  test('supports keyboard navigation when clickable', () => {
    const onStepClick = jest.fn();
    const { container } = render(<Stepper steps={steps} currentStep={0} onStepClick={onStepClick} />);
    const items = container.querySelectorAll('[role="listitem"]');
    fireEvent.keyDown(items[1], { key: 'Enter' });
    expect(onStepClick).toHaveBeenCalledWith(1);
  });
});
