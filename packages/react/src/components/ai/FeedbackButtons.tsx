import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface FeedbackButtonsProps {
  onFeedback?: (feedback: 'positive' | 'negative' | null, comment?: string) => void;
  showComment?: boolean;
  className?: string;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  onFeedback,
  showComment = true,
  className,
}) => {
  const [selected, setSelected] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentField, setShowCommentField] = useState(false);

  const handleFeedback = (feedback: 'positive' | 'negative') => {
    const newValue = selected === feedback ? null : feedback;
    setSelected(newValue);
    if (newValue === 'negative') {
      setShowCommentField(true);
    } else {
      setShowCommentField(false);
      setComment('');
    }
    onFeedback?.(newValue);
  };

  const handleSubmitComment = () => {
    onFeedback?.(selected, comment);
  };

  return (
    <div className={cn('cn-feedback-buttons', className)}>
      <div className="cn-feedback-actions">
        <button
          className={cn('cn-feedback-btn', selected === 'positive' && 'cn-feedback-btn-active')}
          onClick={() => handleFeedback('positive')}
          aria-label="Good response"
          aria-pressed={selected === 'positive'}
        >
          👍
        </button>
        <button
          className={cn('cn-feedback-btn', selected === 'negative' && 'cn-feedback-btn-active')}
          onClick={() => handleFeedback('negative')}
          aria-label="Bad response"
          aria-pressed={selected === 'negative'}
        >
          👎
        </button>
      </div>

      {showComment && showCommentField && selected === 'negative' && (
        <div className="cn-feedback-comment">
          <textarea
            className="cn-feedback-textarea"
            placeholder="Tell us how we can improve..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            aria-label="Feedback comment"
          />
          <button
            className="cn-feedback-submit"
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
