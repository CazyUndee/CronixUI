import * as React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links?: Array<{ label: string; href: string }>;
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
  links,
  copyright,
  children,
  className = '',
  ...props
}) => {
  return (
    <footer className={`cn-footer ${className}`.trim()} {...props}>
      <div className="cn-footer-content">
        {links && (
          <div className="cn-footer-links">
            {links.map((link, idx) => (
              <a key={idx} href={link.href} className="cn-footer-link">
                {link.label}
              </a>
            ))}
          </div>
        )}
        {copyright && <div className="cn-footer-copyright">{copyright}</div>}
        {children}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
