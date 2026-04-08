import { mergeProps, For } from 'solid-js';

export function Tabs(props) {
  const merged = mergeProps({
    tabs: [],
    activeIndex: 0,
    onChange: () => {}
  }, props);

  const handleTabClick = (index) => {
    merged.onChange(index);
  };

  const activeTab = () => {
    return merged.tabs[merged.activeIndex];
  };

  return (
    <div class="cn-tabs">
      <div class="cn-tabs-list">
        <For each={merged.tabs}>{(tab, index) => (
          <button
            type="button"
            class={`cn-tabs-tab ${index() === merged.activeIndex ? 'cn-tabs-tab-active' : ''}`}
            onClick={() => handleTabClick(index())}
          >
            {tab.label || tab}
          </button>
        )}</For>
      </div>
      <div class="cn-tabs-panel">
        {activeTab()?.content || merged.children}
      </div>
    </div>
  );
}
