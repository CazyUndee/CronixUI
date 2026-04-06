import { forwardRef } from 'react';

const Input = forwardRef(function Input({ 
  type = 'text',
  size = 'md',
  error = false,
  className = '',
  ...props 
}, ref) {
  const sizeClass = size !== 'md' ? `fl-input-${size}` : '';

  return (
    <input 
      ref={ref}
      type={type}
      className={`fl-input ${sizeClass} ${error ? 'fl-input-error' : ''} ${className}`}
      {...props}
    />
  );
});

export default Input;
