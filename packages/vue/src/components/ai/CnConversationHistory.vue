<template>
  <div :class="['cn-conversation-history', className]">
    <div class="cn-conversation-header">
      <h3 class="cn-conversation-title">History</h3>
      <button
        v-if="onNewChat"
        class="cn-conversation-new"
        @click="onNewChat"
        aria-label="New chat"
      >
        + New
      </button>
    </div>

    <div class="cn-conversation-list">
      <div v-for="(convs, date) in grouped" :key="date" class="cn-conversation-group">
        <div class="cn-conversation-date">{{ date }}</div>
        <div
          v-for="conv in convs"
          :key="conv.id"
          :class="['cn-conversation-item', conv.id === activeId && 'cn-conversation-item-active']"
          @click="$emit('select', conv.id)"
        >
          <div class="cn-conversation-item-content">
            <input
              v-if="editingId === conv.id"
              class="cn-conversation-edit"
              v-model="editTitle"
              @blur="finishRename"
              @keydown.enter="finishRename"
              ref="editInput"
            />
            <template v-else>
              <div class="cn-conversation-item-title" :title="conv.title">
                {{ conv.title }}
              </div>
              <div class="cn-conversation-item-preview" :title="conv.lastMessage">
                {{ conv.lastMessage }}
              </div>
            </template>
          </div>
          <div class="cn-conversation-item-meta">
            <span class="cn-conversation-item-count">{{ conv.messageCount }} msgs</span>
            <div class="cn-conversation-item-actions">
              <button
                class="cn-conversation-action"
                @click.stop="startRename(conv.id, conv.title)"
                aria-label="Rename"
              >
                ✏️
              </button>
              <button
                class="cn-conversation-action"
                @click.stop="$emit('delete', conv.id)"
                aria-label="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CnConversationHistory',
  props: {
    conversations: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: null
    },
    onNewChat: {
      type: Function,
      default: null
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['select', 'delete', 'rename'],
  data() {
    return {
      editingId: null,
      editTitle: ''
    };
  },
  computed: {
    grouped() {
      const groups = {};
      this.conversations.forEach(conv => {
        const date = new Date(conv.timestamp).toLocaleDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(conv);
      });
      return groups;
    }
  },
  methods: {
    startRename(id, title) {
      this.editingId = id;
      this.editTitle = title;
      this.$nextTick(() => {
        if (this.$refs.editInput && this.$refs.editInput[0]) {
          this.$refs.editInput[0].focus();
        }
      });
    },
    finishRename() {
      if (this.editingId && this.editTitle.trim()) {
        this.$emit('rename', this.editingId, this.editTitle.trim());
      }
      this.editingId = null;
    }
  }
};
</script>
