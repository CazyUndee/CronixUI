<script>
  import { createEventDispatcher } from 'svelte';
  import MessageBubble from './MessageBubble.svelte';
  import TypingIndicator from './TypingIndicator.svelte';
  import PromptInput from './PromptInput.svelte';

  /** @type {Array<{id: string, role: 'user'|'assistant', content: string, timestamp: Date}>} */
  export let messages = [];
  /** @type {boolean} */
  export let loading = false;
  /** @type {string} */
  export let placeholder = 'Ask AI anything...';

  const dispatch = createEventDispatcher();

  function handleSend(event) {
    dispatch('send', event.detail);
  }
</script>

<div class="cn-chat-interface">
  <div class="cn-chat-header">
    <h2 class="cn-chat-title">Chat</h2>
    {#if loading}
      <TypingIndicator show={true} label="Thinking..." />
    {/if}
  </div>

  <div class="cn-chat-messages" role="log" aria-live="polite">
    {#each messages as msg (msg.id)}
      <MessageBubble role={msg.role} content={msg.content} timestamp={msg.timestamp} />
    {/each}
  </div>

  <div class="cn-chat-input-container">
    <PromptInput {loading} {placeholder} on:submit={handleSend} />
  </div>
</div>

<style>
  .cn-chat-interface {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--cn-border);
    border-radius: var(--cn-radius-lg);
    overflow: hidden;
  }
  .cn-chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--cn-border);
    background: var(--cn-surface);
  }
  .cn-chat-title {
    margin: 0;
    font-size: 16px;
  }
  .cn-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
  .cn-chat-input-container {
    padding: 12px;
    border-top: 1px solid var(--cn-border);
  }
</style>
