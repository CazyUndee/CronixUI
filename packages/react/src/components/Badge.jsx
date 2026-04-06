export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) {
  const variantClass = variant !== 'default' ? `fl-badge-${variant}` : '';
  const sizeClass = size !== 'md' ? `fl-badge-${size}` : '';

  return (
    <span className={`fl-badge ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </span>
  );
}
