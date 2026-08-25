<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {boolean} */
  export let showComment = true;

  const dispatch = createEventDispatcher();

  let selected = null;
  let comment = '';
  let showCommentField = false;

  function handleFeedback(feedback) {
    const newValue = selected === feedback ? null : feedback;
    selected = newValue;
    showCommentField = newValue === 'negative';
    if (!showCommentField) comment = '';
    dispatch('feedback', { feedback: newValue, comment: '' });
  }

  function handleSubmitComment() {
    dispatch('feedback', { feedback: selected, comment });
  }
</script>

<div class="cn-feedback-buttons">
  <div class="cn-feedback-actions">
    <button
      class="cn-feedback-btn"
      class:cn-feedback-btn-active={selected === 'positive'}
      on:click={() => handleFeedback('positive')}
      aria-label="Good response"
      aria-pressed={selected === 'positive'}
    >👍</button>
    <button
      class="cn-feedback-btn"
      class:cn-feedback-btn-active={selected === 'negative'}
      on:click={() => handleFeedback('negative')}
      aria-label="Bad response"
      aria-pressed={selected === 'negative'}
    >👎</button>
  </div>

  {#if showComment && showCommentField && selected === 'negative'}
    <div class="cn-feedback-comment">
      <textarea
        class="cn-feedback-textarea"
        placeholder="Tell us how we can improve..."
        bind:value={comment}
        rows="2"
        aria-label="Feedback comment"
      />
      <button
        class="cn-feedback-submit"
        on:click={handleSubmitComment}
        disabled={!comment.trim()}
      >Submit</button>
    </div>
  {/if}
</div>

<style>
  .cn-feedback-buttons { display: flex; flex-direction: column; gap: 8px; }
  .cn-feedback-actions { display: flex; gap: 4px; }
  .cn-feedback-btn {
    padding: 8px 12px;
    background: var(--cn-surface);
    border: 1px solid var(--cn-border);
    border-radius: var(--cn-radius);
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s ease;
  }
  .cn-feedback-btn:hover { background: var(--cn-surface-2); }
  .cn-feedback-btn-active { background: var(--cn-primary-subtle); border-color: var(--cn-primary); }
  .cn-feedback-comment { display: flex; flex-direction: column; gap: 8px; }
  .cn-feedback-textarea {
    width: 100%;
    padding: 8px;
    background: var(--cn-surface-2);
    border: 1px solid var(--cn-border);
    border-radius: var(--cn-radius);
    font-family: inherit;
    font-size: 13px;
    resize: vertical;
  }
  .cn-feedback-submit {
    align-self: flex-end;
    padding: 6px 12px;
    background: var(--cn-primary);
    color: var(--cn-on-primary, #fff);
    border: none;
    border-radius: var(--cn-radius);
    cursor: pointer;
    font-size: 13px;
  }
  .cn-feedback-submit:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
