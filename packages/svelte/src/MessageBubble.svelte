<script>
  /** @type {'user'|'assistant'|'system'} */
  export let role = 'assistant';
  /** @type {string} */
  export let content = '';
  /** @type {Date|null} */
  export let timestamp = null;

  $: isUser = role === 'user';
  $: timeStr = timestamp ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
</script>

<div class="cn-message-bubble cn-message-{role}" class:cn-message-user={isUser} role="article" aria-label="{role} message">
  <div class="cn-message-content-wrapper">
    <div class="cn-message-bubble-inner">
      <div class="cn-message-role">{role}</div>
      <div class="cn-message-content">{content}</div>
    </div>
    {#if timeStr}
      <div class="cn-message-meta">
        <span class="cn-message-time">{timeStr}</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .cn-message-bubble {
    display: flex;
    gap: 12px;
    padding: 12px 0;
  }
  .cn-message-bubble-inner {
    background: var(--cn-surface);
    border-radius: var(--cn-radius-lg);
    padding: 12px 16px;
    max-width: 80%;
  }
  .cn-message-user .cn-message-content-wrapper {
    margin-left: auto;
    text-align: right;
  }
  .cn-message-user .cn-message-bubble-inner {
    background: var(--cn-primary);
    color: var(--cn-on-primary, #fff);
  }
  .cn-message-role {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
    margin-bottom: 4px;
  }
  .cn-message-content {
    line-height: 1.6;
    word-break: break-word;
  }
  .cn-message-meta {
    margin-top: 4px;
    font-size: 12px;
    opacity: 0.6;
  }
</style>
