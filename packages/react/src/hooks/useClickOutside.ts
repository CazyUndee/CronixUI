import { useEffect, type RefObject } from 'react';

/**
 * React hook that detects clicks outside a referenced element.
 * Useful for Dropdowns, Popovers, Modals, and other overlay components.
 *
 * @param ref - React ref attached to the target element
 * @param handler - Callback fired when a click occurs outside the element
 * @param options - Optional configuration
 *
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [open, setOpen] = useState(false);
 *   const ref = useRef<HTMLDivElement>(null);
 *
 *   useClickOutside(ref, () => setOpen(false));
 *
 *   return (
 *     <div ref={ref}>
 *       {open && <DropdownMenu />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  options?: {
    /** Event types to listen for. Defaults to ['mousedown', 'touchstart'] */
    events?: Array<'mousedown' | 'touchstart' | 'pointerdown'>;
    /** Elements to ignore (e.g., the trigger button) */
    ignoreRefs?: Array<RefObject<HTMLElement>>;
  }
): void {
  const events = options?.events ?? ['mousedown', 'touchstart'];
  const ignoreRefs = options?.ignoreRefs ?? [];

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Skip if clicking inside the target element
      if (ref.current?.contains(target)) return;

      // Skip if clicking inside any ignored element
      for (const ignoreRef of ignoreRefs) {
        if (ignoreRef.current?.contains(target)) return;
      }

      handler(event);
    };

    for (const eventType of events) {
      document.addEventListener(eventType, listener, true);
    }

    return () => {
      for (const eventType of events) {
        document.removeEventListener(eventType, listener, true);
      }
    };
  }, [ref, handler, events, ignoreRefs]);
}
