export function AvatarGroup(props) {
  const max = props.max || 3;
  const children = props.children || [];

  return (
    <div class={`cn-avatar-group ${props.className || ''}`}>
      {children.slice(0, max).map((child, i) => (
        <div class="cn-avatar-group-item" style={{ 'margin-left': i > 0 ? '-8px' : '0' }}>
          {child}
        </div>
      ))}
      {children.length > max && (
        <div class="cn-avatar-group-overflow" style={{ 'margin-left': '-8px' }}>
          +{children.length - max}
        </div>
      )}
    </div>
  );
}
