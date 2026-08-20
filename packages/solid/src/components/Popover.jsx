import { mergeProps, createSignal, Show } from 'solid-js';

export function Popover(props) {
  const merged = mergeProps({
    trigger: null,
    placement: 'bottom',
    isOpen: undefined,
    onToggle: null,
  }, props);

  const [internalOpen, setInternalOpen] = createSignal(false);
  const open = () => merged.isOpen !== undefined ? merged.isOpen : internalOpen();
  const setOpen = merged.onToggle || setInternalOpen;

  return (
    <div class={`cn-popover-wrapper cn-popover-${merged.placement}`}>
      <div class="cn-popover-trigger" onClick={() => setOpen(!open())}>
        {merged.trigger}
      </div>
      <Show when={open()}>
        <div class="cn-popover-content">
          {merged.children}
        </div>
      </Show>
    </div>
  );
}
