import * as React from 'react';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
}

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> & {
  Tab: React.FC<TabProps>;
  Panel: React.FC<TabPanelProps>;
} = Object.assign(
  ({ defaultIndex = 0, index: controlledIndex, onChange, children, className = '', ...props }: TabsProps) => {
    const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
    const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

    const handleTabClick = (idx: number) => {
      if (onChange) {
        onChange(idx);
      } else {
        setInternalIndex(idx);
      }
    };

    const tabs: React.ReactElement<TabProps>[] = [];
    const panels: React.ReactElement<TabPanelProps>[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if ((child.type as React.FC).displayName === 'Tab') {
          tabs.push(child as React.ReactElement<TabProps>);
        } else if ((child.type as React.FC).displayName === 'TabPanel') {
          panels.push(child as React.ReactElement<TabPanelProps>);
        }
      }
    });

    return (
      <div className={className} {...props}>
        <div className="cn-tabs">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={`cn-tab ${activeIndex === idx ? 'cn-tab-active' : ''}`.trim()}
              onClick={() => handleTabClick(idx)}
              role="tab"
              aria-selected={activeIndex === idx}
              tabIndex={0}
            >
              {tab.props.children}
            </div>
          ))}
        </div>
        {panels.map((panel, idx) => (
          <div
            key={idx}
            className={`cn-tab-panel ${activeIndex === idx ? 'cn-tab-panel-active' : ''}`.trim()}
            role="tabpanel"
            hidden={activeIndex !== idx}
          >
            {panel.props.children}
          </div>
        ))}
      </div>
    );
  },
  {
    Tab: ({ children }: TabProps) => <>{children}</>,
    Panel: ({ children }: TabPanelProps) => <>{children}</>,
  }
);

Tabs.displayName = 'Tabs';
(Tabs.Tab as React.FC<TabProps> & { displayName?: string }).displayName = 'Tab';
(Tabs.Panel as React.FC<TabPanelProps> & { displayName?: string }).displayName = 'TabPanel';

export default Tabs;
