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
    const starRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, star: number) => {
      if (disabled) return;
      let nextStar = star;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          nextStar = Math.min(star + 1, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          nextStar = Math.max(star - 1, 1);
          break;
        case 'Home':
          e.preventDefault();
          nextStar = 1;
          break;
        case 'End':
          e.preventDefault();
          nextStar = max;
          break;
        default:
          return;
      }
      onChange?.(nextStar);
      starRefs.current[nextStar - 1]?.focus();
    };

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
            ref={(el) => { starRefs.current[star - 1] = el; }}
            type="button"
            role="radio"
            aria-checked={star <= value}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={`cn-rating-star ${star <= value ? 'cn-rating-star-active' : ''}`}
            disabled={disabled}
            tabIndex={star === value || (value === 0 && star === 1) ? 0 : -1}
            onClick={() => onChange?.(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
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
