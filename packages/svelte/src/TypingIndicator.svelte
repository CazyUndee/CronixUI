<script>
  /** @type {boolean} */
  export let show = true;
  /** @type {string} */
  export let label = 'Thinking';
</script>

{#if show}
  <div class="cn-typing-indicator" role="status" aria-label={label}>
    <div class="cn-typing-dots">
      <span class="cn-typing-dot" style="animation-delay: 0ms" />
      <span class="cn-typing-dot" style="animation-delay: 150ms" />
      <span class="cn-typing-dot" style="animation-delay: 300ms" />
    </div>
    <span class="cn-typing-label">{label}</span>
  </div>
{/if}

<style>
  .cn-typing-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
  }
  .cn-typing-dots {
    display: flex;
    gap: 4px;
  }
  .cn-typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--cn-text-muted);
    animation: cn-dot-bounce 1.4s ease-in-out infinite both;
  }
  .cn-typing-label {
    font-size: 13px;
    color: var(--cn-text-muted);
  }
  @keyframes cn-dot-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
</style>
