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
    <div className="relative flex-1 overflow-hidden">
      <div ref={scrollRef} className="h-full overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pt-1 pb-10">
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage
                key={message.id}
                message={message}
                onEdit={(content) => console.log('edit message:', content)}
              />
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
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
