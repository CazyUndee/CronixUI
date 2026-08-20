import * as React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className = '', ...props }) => {
  return (
    <div className={`cn-empty-state ${className}`.trim()} {...props}>
      {icon && <div className="cn-empty-state-icon">{icon}</div>}
      <div className="cn-empty-state-title">{title}</div>
      {description && <div className="cn-empty-state-description">{description}</div>}
      {action && <div className="cn-empty-state-action">{action}</div>}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
export default EmptyState;
