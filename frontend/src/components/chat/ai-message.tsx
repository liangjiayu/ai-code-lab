import {
  RiCheckLine,
  RiFileCopyLine,
  RiLoopLeftLine,
  RiThumbDownLine,
  RiThumbUpLine,
} from '@remixicon/react';
import { useState } from 'react';
import Markdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { cn, copyToClipboard } from '@/lib/utils';
import { useRetryMessage } from '@/queries/use-messages';

const aiProseClass =
  'prose prose-sm prose-headings:my-3 prose-ol:my-2 prose-p:my-2 prose-pre:my-2 prose-ul:my-2 min-w-0 max-w-none prose-code:rounded prose-pre:rounded-lg prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-pre:p-4 prose-code:px-1 prose-code:py-0.5 pt-1 prose-code:text-sm prose-pre:text-gray-100 text-base text-gray-800 leading-relaxed';

interface AiMessageProps {
  message: API.MessageOut;
}

export function AiMessage({ message }: AiMessageProps) {
  const [copied, setCopied] = useState(false);
  const retryMessage = useRetryMessage();

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content ?? '');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetry = () => {
    retryMessage.mutate({
      conversation_id: message.conversation_id,
      message_id: message.id,
    });
  };

  return (
    <div className="group/ai-msg">
      <div className={aiProseClass}>
        <Markdown>{message.content}</Markdown>
      </div>
      <div
        className={cn(
          'mt-1 flex gap-1 opacity-0 transition-opacity group-hover/ai-msg:opacity-100',
        )}
      >
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? (
            <RiCheckLine className="text-green-500" />
          ) : (
            <RiFileCopyLine />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRetry}>
          <RiLoopLeftLine />
        </Button>
        <Button variant="ghost" size="icon">
          <RiThumbUpLine />
        </Button>
        <Button variant="ghost" size="icon">
          <RiThumbDownLine />
        </Button>
      </div>
    </div>
  );
}

interface StreamingMessageProps {
  content: string;
  isStreaming: boolean;
}

export function StreamingMessage({
  content,
  isStreaming,
}: StreamingMessageProps) {
  return (
    <div>
      <div className={aiProseClass}>
        <Markdown>{content}</Markdown>
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-purple-500" />
        )}
      </div>
    </div>
  );
}
