<script>
  export let text = '';
  export let removable = false;
</script>

<span class="cn-tag">
  {text}
  {#if removable}
    <button class="cn-tag-remove" on:click>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="8" height="8">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  {/if}
  <slot />
</span>

<style>
  .cn-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 12px;
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: #f0ede8;
  }
  .cn-tag-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #222222;
    cursor: pointer;
    border: none;
    transition: background 0.15s ease;
  }
  .cn-tag-remove:hover { background: #501414; }
</style>
