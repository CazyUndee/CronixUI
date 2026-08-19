import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from '../components/Rating';

describe('Rating Component', () => {
  test('renders 5 stars by default', () => {
    render(<Rating />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
  });

  test('renders with custom max', () => {
    render(<Rating max={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  test('marks stars up to value as active', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveClass('cn-rating-star-active');
    expect(stars[2]).toHaveClass('cn-rating-star-active');
    expect(stars[3]).not.toHaveClass('cn-rating-star-active');
  });

  test('calls onChange with star value on click', () => {
    const onChange = jest.fn();
    render(<Rating onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    fireEvent.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  test('does not fire onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Rating disabled onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
