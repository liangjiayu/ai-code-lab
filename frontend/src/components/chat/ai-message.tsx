import {
  RiCheckLine,
  RiFileCopyLine,
  RiLoopLeftLine,
  RiThumbDownLine,
  RiThumbUpLine,
} from '@remixicon/react';
import { useState } from 'react';
import 'highlight.js/styles/github.css';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, copyToClipboard } from '@/lib/utils';
import { useRetryMessage } from '@/queries/use-messages';

interface AiMessageProps {
  message: API.MessageOut;
  isLast?: boolean;
}

export function AiMessage({ message, isLast }: AiMessageProps) {
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
      <div className="ai-markdown">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {message.content}
        </Markdown>
      </div>
      <div
        className={cn(
          'mt-1 flex gap-1 opacity-0 transition-opacity group-hover/ai-msg:opacity-100',
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? (
                <RiCheckLine className="text-green-500" />
              ) : (
                <RiFileCopyLine />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>复制</TooltipContent>
        </Tooltip>
        {isLast && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleRetry}>
                <RiLoopLeftLine />
              </Button>
            </TooltipTrigger>
            <TooltipContent>重新生成</TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <RiThumbUpLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent>赞同</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <RiThumbDownLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent>反对</TooltipContent>
        </Tooltip>
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
      <div className="ai-markdown">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </Markdown>
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-purple-500" />
        )}
      </div>
    </div>
  );
}
