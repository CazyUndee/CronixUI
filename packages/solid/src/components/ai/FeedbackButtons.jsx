import { createSignal, Show } from 'solid-js';

export default function FeedbackButtons(props) {
  const [selected, setSelected] = createSignal(null);
  const [showComment, setShowComment] = createSignal(false);
  const [comment, setComment] = createSignal('');

  const handleVote = (vote) => {
    if (selected() === vote) {
      setSelected(null);
      props.onVote?.(null);
    } else {
      setSelected(vote);
      props.onVote?.(vote);
    }
  };

  const handleSubmitComment = () => {
    if (comment().trim()) {
      props.onComment?.({
        vote: selected(),
        comment: comment().trim()
      });
      setShowComment(false);
      setComment('');
    }
  };

  return (
    <div class="cn-feedback-buttons" role="group" aria-label="Feedback">
      <div class="cn-feedback-vote">
        <button
          class={`cn-feedback-btn ${selected() === 'up' ? 'cn-feedback-active' : ''}`}
          onClick={() => handleVote('up')}
          aria-label="Helpful"
          aria-pressed={selected() === 'up'}
        >
          👍
        </button>
        <button
          class={`cn-feedback-btn ${selected() === 'down' ? 'cn-feedback-active' : ''}`}
          onClick={() => handleVote('down')}
          aria-label="Not helpful"
          aria-pressed={selected() === 'down'}
        >
          👎
        </button>
        <Show when={selected()}>
          <button
            class="cn-feedback-comment-btn"
            onClick={() => setShowComment(!showComment())}
            aria-label="Add comment"
          >
            💬
          </button>
        </Show>
      </div>

      <Show when={showComment()}>
        <div class="cn-feedback-comment">
          <textarea
            class="cn-feedback-textarea"
            value={comment()}
            onInput={(e) => setComment(e.target.value)}
            placeholder="Add a comment (optional)..."
            rows={3}
          />
          <div class="cn-feedback-actions">
            <button
              class="cn-feedback-cancel"
              onClick={() => {
                setShowComment(false);
                setComment('');
              }}
            >
              Cancel
            </button>
            <button
              class="cn-feedback-submit"
              onClick={handleSubmitComment}
              disabled={!comment().trim()}
            >
              Submit
            </button>
          </div>
        </div>
      </Show>

      <style>{`
        .cn-feedback-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cn-feedback-vote {
          display: flex;
          gap: 4px;
        }

        .cn-feedback-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--cn-bg-secondary);
          border: 1px solid var(--cn-border-default);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
        }

        .cn-feedback-btn:hover {
          background: var(--cn-bg-hover);
          border-color: var(--cn-primary);
        }

        .cn-feedback-active {
          background: var(--cn-primary-subtle);
          border-color: var(--cn-primary);
        }

        .cn-feedback-comment-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--cn-bg-secondary);
          border: 1px solid var(--cn-border-default);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 4px;
        }

        .cn-feedback-comment-btn:hover {
          background: var(--cn-bg-hover);
        }

        .cn-feedback-comment {
          padding: 12px;
          background: var(--cn-bg-secondary);
          border: 1px solid var(--cn-border-default);
          border-radius: 8px;
        }

        .cn-feedback-textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--cn-border-default);
          border-radius: 6px;
          background: var(--cn-bg-primary);
          color: var(--cn-text-primary);
          font-size: 13px;
          resize: vertical;
          font-family: inherit;
        }

        .cn-feedback-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 8px;
        }

        .cn-feedback-cancel {
          padding: 6px 12px;
          border: 1px solid var(--cn-border-default);
          border-radius: 6px;
          background: var(--cn-bg-primary);
          color: var(--cn-text-primary);
          cursor: pointer;
        }

        .cn-feedback-submit {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          background: var(--cn-primary);
          color: white;
          cursor: pointer;
        }

        .cn-feedback-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
