<template>
  <div class="cn-feedback-buttons" role="group" aria-label="Feedback">
    <div class="cn-feedback-vote">
      <button
        :class="['cn-feedback-btn', { 'cn-feedback-active': selected === 'up' }]"
        @click="handleVote('up')"
        aria-label="Helpful"
        :aria-pressed="selected === 'up'"
      >
        👍
      </button>
      <button
        :class="['cn-feedback-btn', { 'cn-feedback-active': selected === 'down' }]"
        @click="handleVote('down')"
        aria-label="Not helpful"
        :aria-pressed="selected === 'down'"
      >
        👎
      </button>
      <button
        v-if="selected"
        class="cn-feedback-comment-btn"
        @click="showComment = !showComment"
        aria-label="Add comment"
      >
        💬
      </button>
    </div>

    <div v-if="showComment" class="cn-feedback-comment">
      <textarea
        v-model="comment"
        class="cn-feedback-textarea"
        placeholder="Add a comment (optional)..."
        rows="3"
      />
      <div class="cn-feedback-actions">
        <button
          class="cn-feedback-cancel"
          @click="showComment = false; comment = ''"
        >
          Cancel
        </button>
        <button
          class="cn-feedback-submit"
          @click="handleSubmitComment"
          :disabled="!comment.trim()"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['vote', 'comment']);

const selected = ref(null);
const showComment = ref(false);
const comment = ref('');

const handleVote = (vote) => {
  if (selected.value === vote) {
    selected.value = null;
    emit('vote', null);
  } else {
    selected.value = vote;
    emit('vote', vote);
  }
};

const handleSubmitComment = () => {
  if (comment.value.trim()) {
    emit('comment', {
      vote: selected.value,
      comment: comment.value.trim()
    });
    showComment.value = false;
    comment.value = '';
  }
};
</script>

<style scoped>
.cn-feedback-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cn-feedback-vote {
  display: flex;
  gap: 4px;
}

.cn-feedback-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
}

.cn-feedback-btn:hover {
  background: var(--cn-bg-hover);
  border-color: var(--cn-primary);
}

.cn-feedback-active {
  background: var(--cn-primary-subtle);
  border-color: var(--cn-primary);
}

.cn-feedback-comment-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.cn-feedback-comment-btn:hover {
  background: var(--cn-bg-hover);
}

.cn-feedback-comment {
  padding: 12px;
  background: var(--cn-bg-secondary);
  border: 1px solid var(--cn-border-default);
  border-radius: 8px;
}

.cn-feedback-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--cn-border-default);
  border-radius: 6px;
  background: var(--cn-bg-primary);
  color: var(--cn-text-primary);
  font-size: 13px;
  resize: vertical;
  font-family: inherit;
}

.cn-feedback-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.cn-feedback-cancel {
  padding: 6px 12px;
  border: 1px solid var(--cn-border-default);
  border-radius: 6px;
  background: var(--cn-bg-primary);
  color: var(--cn-text-primary);
  cursor: pointer;
}

.cn-feedback-submit {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: var(--cn-primary);
  color: white;
  cursor: pointer;
}

.cn-feedback-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
