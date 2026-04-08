import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`cn-input cn-textarea ${error ? 'cn-input-error' : ''} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
