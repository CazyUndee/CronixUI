import * as React from 'react';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
  href?: string;
  active?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: React.FC<BreadcrumbItemProps>;
} = Object.assign(
  ({ children, className = '', ...props }: BreadcrumbProps) => {
    const items = React.Children.toArray(children);

    return (
      <nav className={`cn-breadcrumb ${className}`.trim()} aria-label="Breadcrumb" {...props}>
        {items.map((child, idx) => (
          <span key={idx}>
            {child}
            {idx < items.length - 1 && (
              <span className="cn-breadcrumb-separator" aria-hidden="true">/</span>
            )}
          </span>
        ))}
      </nav>
    );
  },
  {
    Item: ({ children, href, active = false, className = '', ...props }: BreadcrumbItemProps) => {
      if (active) {
        return (
          <span className={`cn-breadcrumb-current ${className}`.trim()} aria-current="page" {...props}>
            {children}
          </span>
        );
      }
      return (
        <a href={href} className={`cn-breadcrumb-item ${className}`.trim()} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    },
  }
);

Breadcrumb.displayName = 'Breadcrumb';
(Breadcrumb.Item as React.FC<BreadcrumbItemProps> & { displayName?: string }).displayName = 'BreadcrumbItem';

export default Breadcrumb;
