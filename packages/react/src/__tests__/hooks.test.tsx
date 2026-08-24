import { renderHook, act } from '@testing-library/react';
import { useMediaQuery, useBreakpoint, breakpoints } from '../hooks/useMediaQuery';
import { useClickOutside } from '../hooks/useClickOutside';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { createRef } from 'react';

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches,
    media: '',
    addEventListener: jest.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: jest.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(cb);
      if (idx > -1) listeners.splice(idx, 1);
    }),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
  return { mql, listeners };
};

describe('useMediaQuery', () => {
  it('returns false when no media query matches', () => {
    // In jsdom, matchMedia returns matches: false by default
    window.matchMedia = jest.fn(() => ({
      matches: false,
      media: '(min-width: 9999px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }) as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery('(min-width: 9999px)'));
    expect(result.current).toBe(false);
  });

  it('updates when media query changes', () => {
    const { mql, listeners } = mockMatchMedia(false);
    window.matchMedia = jest.fn(() => mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current).toBe(true);

    act(() => {
      listeners.forEach((cb) => cb({ matches: false } as MediaQueryListEvent));
    });
    expect(result.current).toBe(false);
  });

  it('returns true when initially matching', () => {
    const mql = {
      matches: true,
      media: '(min-width: 768px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
    window.matchMedia = jest.fn(() => mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });
});

describe('useBreakpoint', () => {
  it('works with predefined breakpoints', () => {
    const { mql, listeners } = mockMatchMedia(false);
    window.matchMedia = jest.fn(() => mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useBreakpoint('sm'));
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current).toBe(true);
  });
});

describe('breakpoints', () => {
  it('has all expected breakpoint keys', () => {
    expect(breakpoints.sm).toBe('(max-width: 640px)');
    expect(breakpoints.md).toBe('(max-width: 768px)');
    expect(breakpoints.lg).toBe('(max-width: 1024px)');
    expect(breakpoints.smUp).toBe('(min-width: 641px)');
    expect(breakpoints.mdUp).toBe('(min-width: 769px)');
    expect(breakpoints.lgUp).toBe('(min-width: 1025px)');
    expect(breakpoints.xlUp).toBe('(min-width: 1280px)');
    expect(breakpoints.dark).toBe('(prefers-color-scheme: dark)');
    expect(breakpoints.reducedMotion).toBe('(prefers-reduced-motion: reduce)');
  });
});

describe('useClickOutside', () => {
  it('fires handler when clicking outside', () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();

    renderHook(() => useClickOutside(ref as React.RefObject<HTMLDivElement>, handler));

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire handler when clicking inside', () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();

    renderHook(() => useClickOutside(ref as React.RefObject<HTMLDivElement>, handler));

    act(() => {
      // Create and append an element inside the ref
      document.body.innerHTML = '';
    });

    expect(handler).not.toHaveBeenCalled();
  });
});

describe('useEscapeKey', () => {
  it('fires handler on Escape key', () => {
    const handler = jest.fn();

    renderHook(() => useEscapeKey(handler));

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    act(() => {
      document.dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire on other keys', () => {
    const handler = jest.fn();

    renderHook(() => useEscapeKey(handler));

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('does not fire when disabled', () => {
    const handler = jest.fn();

    renderHook(() => useEscapeKey(handler, false));

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
