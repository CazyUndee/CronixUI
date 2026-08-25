<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';

  /** @type {string} */
  export let text = '';
  /** @type {number} */
  export let speed = 20;
  /** @type {boolean} */
  export let showCursor = true;

  const dispatch = createEventDispatcher();

  let displayedText = '';
  let isComplete = false;
  let index = 0;
  let prevText = '';

  afterUpdate(() => {
    if (text.length < prevText.length) {
      index = 0;
      displayedText = '';
      isComplete = false;
    }
    prevText = text;
  });

  $: {
    if (text.length > 0 && index < text.length) {
      isComplete = false;
      const chunkSize = Math.max(1, Math.floor(speed / 10));
      const interval = setInterval(() => {
        if (index < text.length) {
          const newIndex = Math.min(index + chunkSize, text.length);
          displayedText = text.slice(0, newIndex);
          index = newIndex;
        } else {
          clearInterval(interval);
          isComplete = true;
          dispatch('complete');
        }
      }, speed);
    } else if (index >= text.length && text.length > 0 && !isComplete) {
      isComplete = true;
      dispatch('complete');
    }
  }
</script>

<div class="cn-streaming-text">
  <span class="cn-streaming-content">{displayedText}</span>
  {#if showCursor && !isComplete}
    <span class="cn-cursor-blink">|</span>
  {/if}
</div>

<style>
  .cn-streaming-text { line-height: 1.6; }
  .cn-streaming-content { white-space: pre-wrap; }
  .cn-cursor-blink { animation: cn-blink 1s step-end infinite; font-weight: 300; }
  @keyframes cn-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</style>
