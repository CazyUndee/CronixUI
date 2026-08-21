import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination total={5} current={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onChange when clicking a page', () => {
    const onChange = jest.fn();
    render(<Pagination total={5} current={1} onChange={onChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('applies className', () => {
    const { container } = render(<Pagination total={5} current={1} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('shows current page as active', () => {
    render(<Pagination total={5} current={2} />);
    expect(screen.getByText('2').closest('.cn-pagination-item')).toHaveClass('cn-pagination-active');
  });

  it('disables previous button on first page', () => {
    render(<Pagination total={5} current={1} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination total={5} current={5} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });
});
