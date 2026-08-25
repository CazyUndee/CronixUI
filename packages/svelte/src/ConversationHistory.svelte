<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {Array<{id: string, title: string, lastMessage: string, timestamp: Date, messageCount: number}>} */
  export let conversations = [];
  /** @type {string} */
  export let activeId = '';

  const dispatch = createEventDispatcher();

  let editingId = null;
  let editTitle = '';

  function handleSelect(id) {
    dispatch('select', { id });
  }

  function handleDelete(id) {
    dispatch('delete', { id });
  }

  function handleStartRename(id, title) {
    editingId = id;
    editTitle = title;
  }

  function handleFinishRename() {
    if (editingId && editTitle.trim()) {
      dispatch('rename', { id: editingId, title: editTitle.trim() });
    }
    editingId = null;
  }

  function handleNewChat() {
    dispatch('newchat');
  }

  function formatDate(ts) {
    const d = new Date(ts);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString();
  }

  $: grouped = conversations.reduce((acc, conv) => {
    const date = formatDate(conv.timestamp);
    if (!acc[date]) acc[date] = [];
    acc[date].push(conv);
    return acc;
  }, {});
</script>

<div class="cn-conversation-history">
  <div class="cn-conversation-header">
    <h3 class="cn-conversation-title">History</h3>
    <button class="cn-conversation-new" on:click={handleNewChat} aria-label="New chat">+ New</button>
  </div>

  <div class="cn-conversation-list">
    {#each Object.entries(grouped) as [date, convs]}
      <div class="cn-conversation-group">
        <div class="cn-conversation-date">{date}</div>
        {#each convs as conv}
          <div
            class="cn-conversation-item"
            class:cn-conversation-item-active={conv.id === activeId}
            on:click={() => handleSelect(conv.id)}
            on:keydown={(e) => e.key === 'Enter' && handleSelect(conv.id)}
            role="button"
            tabindex="0"
          >
            <div class="cn-conversation-item-content">
              {#if editingId === conv.id}
                <input
                  class="cn-conversation-edit"
                  bind:value={editTitle}
                  on:blur={handleFinishRename}
                  on:keydown={(e) => e.key === 'Enter' && handleFinishRename()}
                  autofocus
                  on:click|stopPropagation
                />
              {:else}
                <div class="cn-conversation-item-title" title={conv.title}>{conv.title}</div>
                <div class="cn-conversation-item-preview" title={conv.lastMessage}>{conv.lastMessage}</div>
              {/if}
            </div>
            <div class="cn-conversation-item-meta">
              <span class="cn-conversation-item-count">{conv.messageCount} msgs</span>
              <div class="cn-conversation-item-actions">
                <button
                  class="cn-conversation-action"
                  on:click|stopPropagation={() => handleStartRename(conv.id, conv.title)}
                  aria-label="Rename"
                >✏️</button>
                <button
                  class="cn-conversation-action"
                  on:click|stopPropagation={() => handleDelete(conv.id)}
                  aria-label="Delete"
                >🗑️</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .cn-conversation-history { display: flex; flex-direction: column; height: 100%; background: var(--cn-surface); border: 1px solid var(--cn-border); border-radius: var(--cn-radius); }
  .cn-conversation-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--cn-border); }
  .cn-conversation-title { margin: 0; font-size: 14px; }
  .cn-conversation-new { background: var(--cn-primary); color: var(--cn-on-primary, #fff); border: none; padding: 6px 12px; border-radius: var(--cn-radius); cursor: pointer; font-size: 13px; }
  .cn-conversation-list { flex: 1; overflow-y: auto; }
  .cn-conversation-group { }
  .cn-conversation-date { padding: 8px 16px; font-size: 11px; color: var(--cn-text-muted); text-transform: uppercase; }
  .cn-conversation-item { padding: 10px 16px; cursor: pointer; transition: background 0.15s ease; }
  .cn-conversation-item:hover { background: var(--cn-surface-2); }
  .cn-conversation-item-active { background: var(--cn-primary-subtle); border-left: 3px solid var(--cn-primary); }
  .cn-conversation-item-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cn-conversation-item-preview { font-size: 12px; color: var(--cn-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
  .cn-conversation-item-meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
  .cn-conversation-item-count { font-size: 11px; color: var(--cn-text-muted); }
  .cn-conversation-item-actions { display: flex; gap: 4px; margin-left: auto; }
  .cn-conversation-action { background: none; border: none; cursor: pointer; padding: 2px 4px; font-size: 12px; }
  .cn-conversation-action:hover { background: var(--cn-surface-3); border-radius: var(--cn-radius); }
  .cn-conversation-edit { width: 100%; padding: 4px 8px; background: var(--cn-surface-2); border: 1px solid var(--cn-border); border-radius: var(--cn-radius); font-size: 13px; }
</style>
