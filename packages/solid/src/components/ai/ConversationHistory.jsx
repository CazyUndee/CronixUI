import { createSignal } from 'solid-js';

export function ConversationHistory(props) {
  const [editingId, setEditingId] = createSignal(null);
  const [editTitle, setEditTitle] = createSignal('');

  const handleStartRename = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleFinishRename = () => {
    if (editingId() && editTitle().trim()) {
      props.onRename?.(editingId(), editTitle().trim());
    }
    setEditingId(null);
  };

  // Group conversations by date
  const grouped = () => {
    const groups = {};
    (props.conversations || []).forEach(conv => {
      const date = new Date(conv.timestamp).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(conv);
    });
    return groups;
  };

  return (
    <div class={props.className ? `cn-conversation-history ${props.className}` : 'cn-conversation-history'}>
      <div class="cn-conversation-header">
        <h3 class="cn-conversation-title">History</h3>
        {props.onNewChat && (
          <button class="cn-conversation-new" onClick={() => props.onNewChat()} aria-label="New chat">
            + New
          </button>
        )}
      </div>

      <div class="cn-conversation-list">
        {Object.entries(grouped()).map(([date, convs]) => (
          <div class="cn-conversation-group">
            <div class="cn-conversation-date">{date}</div>
            {convs.map(conv => (
              <div
                class={conv.id === props.activeId ? 'cn-conversation-item cn-conversation-item-active' : 'cn-conversation-item'}
                onClick={() => props.onSelect?.(conv.id)}
              >
                <div class="cn-conversation-item-content">
                  {editingId() === conv.id ? (
                    <input
                      class="cn-conversation-edit"
                      value={editTitle()}
                      onInput={(e) => setEditTitle(e.target.value)}
                      onBlur={handleFinishRename}
                      onkeydown={(e) => e.key === 'Enter' && handleFinishRename()}
                      ref={el => el?.focus()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <>
                      <div class="cn-conversation-item-title" title={conv.title}>
                        {conv.title}
                      </div>
                      <div class="cn-conversation-item-preview" title={conv.lastMessage}>
                        {conv.lastMessage}
                      </div>
                    </>
                  )}
                </div>
                <div class="cn-conversation-item-meta">
                  <span class="cn-conversation-item-count">{conv.messageCount} msgs</span>
                  <div class="cn-conversation-item-actions">
                    <button
                      class="cn-conversation-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRename(conv.id, conv.title);
                      }}
                      aria-label="Rename"
                    >
                      ✏️
                    </button>
                    <button
                      class="cn-conversation-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onDelete?.(conv.id);
                      }}
                      aria-label="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
