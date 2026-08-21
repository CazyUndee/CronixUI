import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stack, { HStack, Divider } from '../components/Stack';

describe('Stack', () => {
  it('renders children', () => {
    const { container } = render(
      <Stack><div>Child 1</div><div>Child 2</div></Stack>
    );
    expect(container.querySelector('.cn-stack')).toBeInTheDocument();
  });

  it('applies spacing class', () => {
    const { container } = render(<Stack spacing="2"><div>Child</div></Stack>);
    expect(container.querySelector('.cn-stack-2')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Stack className="custom"><div>Test</div></Stack>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

describe('HStack', () => {
  it('renders horizontal layout', () => {
    const { container } = render(<HStack><div>A</div><div>B</div></HStack>);
    expect(container.querySelector('.cn-hstack')).toBeInTheDocument();
  });
});

describe('Divider', () => {
  it('renders a separator', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('.cn-divider')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Divider className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
