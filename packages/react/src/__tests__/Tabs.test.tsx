import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../components/Tabs';

describe('Tabs Component', () => {
  test('renders tabs with correct ARIA roles', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    // Active panel is visible, hidden panels are excluded by getAllByRole
    expect(screen.getAllByRole('tabpanel').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  test('first tab is selected by default', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  test('clicking tab switches panel', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
      </Tabs>
    );
    // Initially Panel 1 is visible
    expect(screen.getByText('Panel 1')).toHaveClass('cn-tab-panel-active');
    fireEvent.click(screen.getByText('Tab 2'));
    // After clicking Tab 2, Panel 2 is now active
    expect(screen.getByText('Panel 2')).toHaveClass('cn-tab-panel-active');
  });

  test('arrow right navigates to next tab', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
        <Tabs.Panel>Panel 3</Tabs.Panel>
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel 2')).toHaveClass('cn-tab-panel-active');
  });

  test('arrow left navigates to previous tab', () => {
    render(
      <Tabs defaultIndex={1}>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  test('Home key goes to first tab', () => {
    render(
      <Tabs defaultIndex={2}>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
        <Tabs.Panel>Panel 3</Tabs.Panel>
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[2], { key: 'Home' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  test('End key goes to last tab', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
        <Tabs.Panel>Panel 3</Tabs.Panel>
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  test('tab panels have aria-labelledby', () => {
    render(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
      </Tabs>
    );
    const panel = screen.getByRole('tabpanel');
    const tab = screen.getByRole('tab');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  test('calls onChange when tab clicked', () => {
    const onChange = jest.fn();
    render(
      <Tabs onChange={onChange}>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Panel>Panel 1</Tabs.Panel>
        <Tabs.Panel>Panel 2</Tabs.Panel>
      </Tabs>
    );
    fireEvent.click(screen.getByText('Tab 2'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
