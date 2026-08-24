import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  model?: string;
  messageCount: number;
}

export interface ConversationHistoryProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, title: string) => void;
  onNewChat?: () => void;
  className?: string;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onRename,
  onNewChat,
  className,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartRename = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleFinishRename = () => {
    if (editingId && editTitle.trim()) {
      onRename?.(editingId, editTitle.trim());
    }
    setEditingId(null);
  };

  // Group conversations by date
  const grouped = conversations.reduce<Record<string, Conversation[]>>((acc, conv) => {
    const date = new Date(conv.timestamp).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(conv);
    return acc;
  }, {});

  return (
    <div className={cn('cn-conversation-history', className)}>
      <div className="cn-conversation-header">
        <h3 className="cn-conversation-title">History</h3>
        {onNewChat && (
          <button className="cn-conversation-new" onClick={onNewChat} aria-label="New chat">
            + New
          </button>
        )}
      </div>

      <div className="cn-conversation-list">
        {Object.entries(grouped).map(([date, convs]) => (
          <div key={date} className="cn-conversation-group">
            <div className="cn-conversation-date">{date}</div>
            {convs.map((conv) => (
              <div
                key={conv.id}
                className={cn('cn-conversation-item', conv.id === activeId && 'cn-conversation-item-active')}
                onClick={() => onSelect?.(conv.id)}
              >
                <div className="cn-conversation-item-content">
                  {editingId === conv.id ? (
                    <input
                      className="cn-conversation-edit"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={handleFinishRename}
                      onKeyDown={(e) => e.key === 'Enter' && handleFinishRename()}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <>
                      <div className="cn-conversation-item-title" title={conv.title}>
                        {conv.title}
                      </div>
                      <div className="cn-conversation-item-preview" title={conv.lastMessage}>
                        {conv.lastMessage}
                      </div>
                    </>
                  )}
                </div>
                <div className="cn-conversation-item-meta">
                  <span className="cn-conversation-item-count">{conv.messageCount} msgs</span>
                  <div className="cn-conversation-item-actions">
                    <button
                      className="cn-conversation-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRename(conv.id, conv.title);
                      }}
                      aria-label="Rename"
                    >
                      ✏️
                    </button>
                    <button
                      className="cn-conversation-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(conv.id);
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
};
