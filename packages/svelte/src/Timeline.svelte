<script>
  export let items = [];
</script>

<div class="cn-timeline">
  {#each items as item, index}
    <div class="cn-timeline-item {item.variant || 'default'}">
      <div class="cn-timeline-connector">
        <div class="cn-timeline-dot">
          {#if item.icon}{item.icon}{:else}<span class="cn-timeline-dot-inner"></span>{/if}
        </div>
        {#if index < items.length - 1}
          <div class="cn-timeline-line"></div>
        {/if}
      </div>
      <div class="cn-timeline-content">
        <div class="cn-timeline-header">
          <span class="cn-timeline-title">{item.title}</span>
          {#if item.timestamp}
            <span class="cn-timeline-timestamp">{item.timestamp}</span>
          {/if}
        </div>
        {#if item.description}
          <div class="cn-timeline-description">{item.description}</div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .cn-timeline { display: flex; flex-direction: column; gap: 0; }
  .cn-timeline-item { display: flex; gap: 12px; position: relative; padding-bottom: 24px; }
  .cn-timeline-connector { display: flex; flex-direction: column; align-items: center; width: 24px; flex-shrink: 0; }
  .cn-timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #2a2a2a; border: 2px solid #6b2323; z-index: 1; display: flex; align-items: center; justify-content: center; }
  .cn-timeline-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: #6b2323; }
  .cn-timeline-line { width: 2px; flex: 1; background: #2a2a2a; margin-top: 4px; }
  .cn-timeline-item.success .cn-timeline-dot { border-color: #2a6b23; }
  .cn-timeline-item.success .cn-timeline-dot-inner { background: #2a6b23; }
  .cn-timeline-item.warning .cn-timeline-dot { border-color: #6b5a23; }
  .cn-timeline-item.warning .cn-timeline-dot-inner { background: #6b5a23; }
  .cn-timeline-item.error .cn-timeline-dot { border-color: #6b2323; }
  .cn-timeline-item.error .cn-timeline-dot-inner { background: #6b2323; }
  .cn-timeline-item.info .cn-timeline-dot { border-color: #23356b; }
  .cn-timeline-item.info .cn-timeline-dot-inner { background: #23356b; }
  .cn-timeline-content { flex: 1; }
  .cn-timeline-header { display: flex; align-items: baseline; gap: 8px; }
  .cn-timeline-title { font-size: 14px; font-weight: 600; color: #ccc; }
  .cn-timeline-timestamp { font-size: 12px; color: #666; }
  .cn-timeline-description { font-size: 13px; color: #888; margin-top: 4px; }
</style>
