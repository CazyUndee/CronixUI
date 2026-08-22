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

  const handleKeydown = (e, index) => {
    let nextIndex = index;
    const len = merged.tabs.length;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % len;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + len) % len;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = len - 1;
        break;
      default:
        return;
    }
    handleTabClick(nextIndex);
  };

  return (
    <div class="cn-tabs">
      <div class="cn-tabs-list" role="tablist">
        <For each={merged.tabs}>{(tab, index) => (
          <button
            type="button"
            class={`cn-tabs-tab ${index() === merged.activeIndex ? 'cn-tabs-tab-active' : ''}`}
            onClick={() => handleTabClick(index())}
            onKeyDown={(e) => handleKeydown(e, index())}
            role="tab"
            aria-selected={index() === merged.activeIndex}
            aria-controls={`cn-tabpanel-${index()}`}
            id={`cn-tab-${index()}`}
            tabindex={index() === merged.activeIndex ? 0 : -1}
          >
            {tab.label || tab}
          </button>
        )}</For>
      </div>
      <div
        class="cn-tabs-panel"
        role="tabpanel"
        id={`cn-tabpanel-${merged.activeIndex}`}
        aria-labelledby={`cn-tab-${merged.activeIndex}`}
        tabindex={0}
      >
        {activeTab()?.content || merged.children}
      </div>
    </div>
  );
}
