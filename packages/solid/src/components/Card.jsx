import { mergeProps } from 'solid-js';

export function Card(props) {
  const merged = mergeProps({ title: '', subtitle: '', clickable: false }, props);
  
  const classes = () => {
    const c = ['cn-card'];
    if (merged.clickable) c.push('cn-card-clickable');
    return c.join(' ');
  };

  return (
    <div class={classes()}>
      {(merged.title || merged.subtitle) && (
        <div class="cn-card-header">
          {merged.title && <h3 class="cn-card-title">{merged.title}</h3>}
          {merged.subtitle && <p class="cn-card-subtitle">{merged.subtitle}</p>}
        </div>
      )}
      <div class="cn-card-body">{merged.children}</div>
    </div>
  );
}
