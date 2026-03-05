import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MarkdownRender } from '@/components/markdown';
import { useChatStore } from '@/stores/chat-store';
import { AiMessage } from './ai-message';
import { LoadingIndicator } from './loading-indicator';
import { UserMessage } from './user-message';

const SCROLL_THRESHOLD = 100;

type ChatMessageListProps = {
  messages: API.MessageOut[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const streamingContent = useChatStore((s) => s.streamingContent);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD;
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  const handleScroll = useCallback(() => {
    isUserScrollingRef.current = !isNearBottom();
  }, [isNearBottom]);

  // 消息更新或流式内容变化时自动滚动到底部
  const messageCount = messages.length;
  const contentLength = streamingContent.length;
  useEffect(() => {
    if (messageCount + contentLength > 0 && !isUserScrollingRef.current) {
      scrollToBottom();
    }
  }, [messageCount, contentLength, scrollToBottom]);

  // 流式输出开始时重置滚动状态
  useEffect(() => {
    if (isStreaming) {
      isUserScrollingRef.current = false;
    }
  }, [isStreaming]);

  const lastUserMessageId = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'user')?.id,
    [messages],
  );
  const lastAiMessageId = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'assistant')?.id,
    [messages],
  );

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        暂无消息
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="mx-auto max-w-3xl px-4 pt-1 pb-10">
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage
                key={message.id}
                message={message}
                isLast={message.id === lastUserMessageId}
              />
            ) : (
              <AiMessage
                key={message.id}
                message={message}
                isLast={message.id === lastAiMessageId}
              />
            ),
          )}
          {streamingContent && <MarkdownRender content={streamingContent} />}
          {isStreaming && <LoadingIndicator />}
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
