export default function Card({ 
  children, 
  hoverable = false,
  className = '' 
}) {
  return (
    <div className={`fl-card ${hoverable ? 'fl-card-hoverable' : ''} ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`fl-card-header ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`fl-card-body ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`fl-card-footer ${className}`}>{children}</div>;
};
