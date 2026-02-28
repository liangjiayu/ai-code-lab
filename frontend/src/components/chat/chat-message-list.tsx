import { useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chat-store';
import { AiMessage, StreamingMessage } from './ai-message';
import { LoadingIndicator } from './loading-indicator';
import { UserMessage } from './user-message';

interface ChatMessageListProps {
  messages: API.MessageOut[];
  isAiLoading?: boolean;
}

export function ChatMessageList({
  messages,
  isAiLoading,
}: ChatMessageListProps) {
  const streamingContent = useChatStore((s) => s.streamingContent);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamingContent || isAiLoading) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
      });
    }
  }, [streamingContent, isAiLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        暂无消息
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl space-y-6 px-4 pt-1 pb-10">
        {messages.map((message) =>
          message.role === 'user' ? (
            <UserMessage key={message.id} message={message} />
          ) : (
            <AiMessage key={message.id} message={message} />
          ),
        )}
        {isAiLoading && !streamingContent && <LoadingIndicator />}
        {streamingContent && (
          <StreamingMessage
            content={streamingContent}
            isStreaming={isStreaming}
          />
        )}
      </div>
    </div>
  );
}
