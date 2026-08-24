import { createSignal, onMount, onCleanup, createEffect, Show } from 'solid-js';
import CopyButton from './CopyButton';

export default function StreamingText(props) {
  const [displayText, setDisplayText] = createSignal('');
  const [isStreaming, setIsStreaming] = createSignal(false);
  let cursorRef;

  createEffect(() => {
    if (props.text !== undefined && !isStreaming()) {
      setDisplayText(props.text);
    }
  });

  onMount(() => {
    if (props.stream && props.text) {
      startStreaming(props.text);
    }
  });

  const startStreaming = (fullText) => {
    setIsStreaming(true);
    setDisplayText('');
    
    let index = 0;
    const speed = props.speed || 20;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        props.onStreamEnd?.();
      }
    }, speed);

    onCleanup(() => clearInterval(interval));
  };

  return (
    <div 
      class="cn-streaming-text"
      role="status"
      aria-live="polite"
      aria-label={isStreaming() ? 'Text is streaming' : 'Text display'}
    >
      <div class="cn-streaming-content">
        <span class="cn-streaming-text">{displayText()}</span>
        <Show when={isStreaming()}>
          <span ref={cursorRef} class="cn-streaming-cursor" aria-hidden="true">|</span>
        </Show>
      </div>

      <Show when={!isStreaming() && displayText()}>
        <div class="cn-streaming-actions">
          <CopyButton text={displayText()} />
        </div>
      </Show>

      <style>{`
        .cn-streaming-text {
          position: relative;
        }

        .cn-streaming-content {
          display: inline;
        }

        .cn-streaming-text {
          font-size: 14px;
          line-height: 1.6;
          color: var(--cn-text-primary);
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .cn-streaming-cursor {
          display: inline-block;
          font-weight: 300;
          animation: cn-blink 1s step-end infinite;
          margin-left: 1px;
        }

        @keyframes cn-blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .cn-streaming-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
          opacity: 0;
          transition: opacity 200ms ease;
        }

        .cn-streaming-text:hover .cn-streaming-actions {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
