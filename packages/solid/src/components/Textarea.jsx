import { splitProps } from 'solid-js';

export function Textarea(props) {
  const [local, others] = splitProps(props, ['class', 'size', 'error', 'rows']);

  const sizeClass = () => {
    if (local.size === 'sm') return 'cn-input-sm';
    if (local.size === 'lg') return 'cn-input-lg';
    return '';
  };

  const errorClass = () => local.error ? 'cn-input-error' : '';

  const rows = () => local.rows || 4;

  return (
    <textarea
      class={`cn-input cn-textarea ${sizeClass()} ${errorClass()} ${local.class || ''}`}
      rows={rows()}
      {...others}
    />
  );
}
