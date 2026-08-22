import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../components/Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <Tooltip content="Help" className="custom"><button>Test</button></Tooltip>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders tooltip content', () => {
    render(<Tooltip content="Tooltip text"><button>Hover</button></Tooltip>);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('has tooltip role', () => {
    render(<Tooltip content="Tip"><button>Test</button></Tooltip>);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip');
  });

  it('applies position class', () => {
    const { container } = render(
      <Tooltip content="Tip" position="bottom"><button>Test</button></Tooltip>
    );
    expect(container.querySelector('.cn-tooltip-bottom')).toBeInTheDocument();
  });

  it('links trigger to tooltip via aria-describedby', () => {
    const { container } = render(
      <Tooltip content="Help"><button>Hover</button></Tooltip>
    );
    const tooltip = screen.getByRole('tooltip');
    const tooltipId = tooltip.getAttribute('id');
    expect(tooltipId).toBeTruthy();
    const triggerWrapper = container.querySelector(`[aria-describedby="${tooltipId}"]`);
    expect(triggerWrapper).toBeInTheDocument();
  });
});
