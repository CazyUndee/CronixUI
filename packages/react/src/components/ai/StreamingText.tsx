import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface StreamingTextProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const StreamingText: React.FC<StreamingTextProps> = ({
  text,
  speed = 20,
  showCursor = true,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const prevTextRef = useRef('');

  useEffect(() => {
    // Reset if text changes significantly (new prompt)
    if (text.length < prevTextRef.current.length) {
      indexRef.current = 0;
      setDisplayedText('');
      setIsComplete(false);
    }
    prevTextRef.current = text;

    if (indexRef.current >= text.length) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    setIsComplete(false);
    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        // Add a chunk at a time for faster streaming
        const chunkSize = Math.max(1, Math.floor(speed / 10));
        const newIndex = Math.min(indexRef.current + chunkSize, text.length);
        setDisplayedText(text.slice(0, newIndex));
        indexRef.current = newIndex;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete, isComplete]);

  return (
    <div className={cn('cn-streaming-text', className)}>
      <span className="cn-streaming-content">{displayedText}</span>
      {showCursor && !isComplete && <span className="cn-cursor-blink">|</span>}
    </div>
  );
};
