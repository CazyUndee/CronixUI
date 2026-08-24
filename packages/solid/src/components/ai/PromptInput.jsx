import { createSignal, Show, onMount } from 'solid-js';

export default function PromptInput(props) {
  const [value, setValue] = createSignal(props.defaultValue || '');
  const [isComposing, setIsComposing] = createSignal(false);
  let textareaRef;

  const handleSubmit = () => {
    const trimmed = value().trim();
    if (!trimmed || props.disabled) return;
    props.onSend?.(trimmed);
    if (!props.multiline) {
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !props.multiline) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  };

  const adjustHeight = () => {
    if (!textareaRef) return;
    textareaRef.style.height = 'auto';
    textareaRef.style.height = `${Math.min(textareaRef.scrollHeight, props.maxHeight || 200)}px`;
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  onMount(() => {
    if (props.autoFocus) {
      textareaRef?.focus();
    }
  });

  return (
    <div class="cn-prompt-input" role="form" aria-label="Message input">
      <div class="cn-prompt-input-wrapper">
        {props.showAvatar && (
          <div class="cn-prompt-avatar">
            {props.avatar || '👤'}
          </div>
        )}

        <textarea
          ref={textareaRef}
          class="cn-prompt-textarea"
          value={value()}
          onInput={(e) => { handleInput(e); adjustHeight(); }}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={props.placeholder || 'Type a message...'}
          disabled={props.disabled}
          rows={props.rows || 1}
          maxLength={props.maxLength}
          aria-label={props.placeholder || 'Message input'}
          aria-describedby={props.helperText ? 'prompt-helper' : undefined}
        />

        <Show when={props.showActions !== false}>
          <div class="cn-prompt-actions">
            <Show when={props.maxLength}>
              <span class="cn-prompt-char-count">
                {value().length}/{props.maxLength}
              </span>
            </Show>
            <button
              class="cn-prompt-send"
              onClick={handleSubmit}
              disabled={!value().trim() || props.disabled}
              aria-label="Send message"
            >
              {props.sendIcon || '↑'}
            </button>
          </div>
        </Show>
      </div>

      <Show when={props.helperText}>
        <div id="prompt-helper" class="cn-prompt-helper">
          {props.helperText}
        </div>
      </Show>

      <style>{`
        .cn-prompt-input {
          width: 100%;
        }

        .cn-prompt-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 12px;
          background: var(--cn-bg-primary);
          border: 1px solid var(--cn-border-default);
          border-radius: 12px;
          transition: border-color 200ms ease;
        }

        .cn-prompt-input-wrapper:focus-within {
          border-color: var(--cn-primary);
          box-shadow: 0 0 0 3px var(--cn-primary-subtle);
        }

        .cn-prompt-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cn-bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cn-prompt-textarea {
          flex: 1;
          resize: none;
          border: none;
          background: transparent;
          font-size: 14px;
          line-height: 1.5;
          color: var(--cn-text-primary);
          outline: none;
          min-height: 24px;
          max-height: 200px;
          font-family: inherit;
        }

        .cn-prompt-textarea::placeholder {
          color: var(--cn-text-tertiary);
        }

        .cn-prompt-textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cn-prompt-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .cn-prompt-char-count {
          font-size: 12px;
          color: var(--cn-text-tertiary);
        }

        .cn-prompt-send {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cn-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          transition: background-color 200ms ease, transform 100ms ease;
        }

        .cn-prompt-send:hover:not(:disabled) {
          background: var(--cn-primary-hover);
          transform: scale(1.05);
        }

        .cn-prompt-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cn-prompt-helper {
          margin-top: 4px;
          font-size: 12px;
          color: var(--cn-text-tertiary);
          padding: 0 12px;
        }
      `}</style>
    </div>
  );
}
