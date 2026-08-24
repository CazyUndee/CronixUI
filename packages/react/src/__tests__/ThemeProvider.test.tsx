import { render, act, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../components/ThemeProvider';

function TestConsumer() {
  const { resolvedTheme, mode, setMode, toggle } = useTheme();
  return (
    <div>
      <span data-testid="resolved">{resolvedTheme}</span>
      <span data-testid="mode">{mode}</span>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('system')}>System</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('sets data-theme on document element', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('switches to light theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText('Light').click();
    });
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles between themes', () => {
    render(
      <ThemeProvider defaultMode="dark">
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');

    act(() => {
      screen.getByText('Toggle').click();
    });
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');

    act(() => {
      screen.getByText('Toggle').click();
    });
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('persists mode to localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText('Light').click();
    });
    expect(localStorage.getItem('cronixui-theme')).toBe('light');
  });

  it('reads persisted mode from localStorage', () => {
    localStorage.setItem('cronixui-theme', 'light');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });

  it('accepts custom storage key', () => {
    render(
      <ThemeProvider storageKey="my-app-theme">
        <TestConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText('Light').click();
    });
    expect(localStorage.getItem('my-app-theme')).toBe('light');
  });

  it('throws when useTheme is used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used within a <ThemeProvider>'
    );
    spy.mockRestore();
  });
});
