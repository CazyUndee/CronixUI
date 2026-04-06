export default function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) {
  const variantClass = variant !== 'default' ? `fl-btn-${variant}` : '';
  const sizeClass = size !== 'md' ? `fl-btn-${size}` : '';

  return (
    <button 
      className={`fl-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
