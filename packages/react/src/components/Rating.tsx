import * as React from 'react';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  max?: number;
  size?: RatingSize;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value = 0, max = 5, size = 'md', disabled = false, onChange, className = '', ...props }, ref) => {
    const stars = Array.from({ length: Math.max(1, max) }, (_, i) => i + 1);

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        className={`cn-rating cn-rating-${size} ${disabled ? 'cn-rating-disabled' : ''} ${className}`.trim()}
        {...props}
      >
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star <= value}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={`cn-rating-star ${star <= value ? 'cn-rating-star-active' : ''}`}
            disabled={disabled}
            onClick={() => onChange?.(star)}
          >
            ★
          </button>
        ))}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
