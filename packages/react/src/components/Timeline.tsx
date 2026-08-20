import * as React from 'react';

export interface TimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = '',
  ...props
}) => {
  return (
    <div className={`cn-timeline ${className}`.trim()} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`cn-timeline-item ${item.variant || 'default'}`}
        >
          <div className="cn-timeline-connector">
            <div className="cn-timeline-dot">
              {item.icon || <span className="cn-timeline-dot-inner" />}
            </div>
            {index < items.length - 1 && <div className="cn-timeline-line" />}
          </div>
          <div className="cn-timeline-content">
            <div className="cn-timeline-header">
              <span className="cn-timeline-title">{item.title}</span>
              {item.timestamp && (
                <span className="cn-timeline-timestamp">{item.timestamp}</span>
              )}
            </div>
            {item.description && (
              <div className="cn-timeline-description">{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Timeline.displayName = 'Timeline';
export default Timeline;
