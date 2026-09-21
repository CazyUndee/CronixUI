import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error in CronixUI app:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleNavigate = (path: string) => {
    this.setState({ hasError: false, error: null });
    window.location.hash = path;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--cn-bg)',
            color: 'var(--cn-text)',
            padding: '40px 24px',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '36px',
              border: '1px solid var(--cn-error-text)',
              boxShadow: 'var(--cn-shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                aria-hidden="true"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--cn-error)',
                  color: 'var(--cn-error-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '18px',
                }}
              >
                !
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
                Application Error Recovered
              </h1>
            </div>

            <p style={{ color: 'var(--cn-text-muted)', fontSize: '15px', marginBottom: '20px', lineHeight: 1.6 }}>
              CronixUI caught an unexpected runtime error. You can recover immediately without reloading the page.
            </p>

            {this.state.error && (
              <div
                style={{
                  background: 'var(--cn-surface-2)',
                  border: '1px solid var(--cn-border)',
                  borderRadius: 'var(--cn-radius-sm)',
                  padding: '12px 16px',
                  fontFamily: 'var(--cn-font-mono)',
                  fontSize: '13px',
                  color: 'var(--cn-error-text)',
                  marginBottom: '24px',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message || 'An unknown error occurred.'}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReset}
                className="btn btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => this.handleNavigate('#/')}
                className="btn"
                style={{ cursor: 'pointer' }}
              >
                Go to Home
              </button>
              <button
                type="button"
                onClick={() => this.handleNavigate('#/components')}
                className="btn"
                style={{ cursor: 'pointer' }}
              >
                Components
              </button>
              <button
                type="button"
                onClick={() => this.handleNavigate('#/demo')}
                className="btn"
                style={{ cursor: 'pointer' }}
              >
                Live Demo
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
