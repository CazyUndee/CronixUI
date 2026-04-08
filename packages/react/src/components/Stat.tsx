import * as React from 'react';

export type StatDeltaType = 'up' | 'down';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label?: string;
  delta?: string;
  deltaType?: StatDeltaType;
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  delta,
  deltaType = 'up',
  className = '',
  ...props
}) => {
  return (
    <div className={`cn-stat ${className}`.trim()} {...props}>
      <div className="cn-stat-value">{value}</div>
      {label && <div className="cn-stat-label">{label}</div>}
      {delta && (
        <div className={`cn-stat-delta cn-stat-delta-${deltaType}`.trim()}>
          {deltaType === 'up' ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  );
};

Stat.displayName = 'Stat';

export default Stat;
