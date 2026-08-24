import { useEffect, useCallback } from 'react';

/**
 * React hook that fires a callback when Escape is pressed.
 * Commonly used to close modals, dropdowns, and popovers.
 *
 * @param handler - Callback fired on Escape press
 * @param enabled - Whether the listener is active. Defaults to true.
 *
 * @example
 * ```tsx
 * function Modal({ onClose }) {
 *   useEscapeKey(onClose);
 *   return <div>Modal content</div>;
 * }
 * ```
 */
export function useEscapeKey(handler: () => void, enabled = true): void {
  const stableHandler = useCallback(handler, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        stableHandler();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [stableHandler, enabled]);
}
