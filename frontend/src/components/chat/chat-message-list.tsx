import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { useChatStore } from '@/stores/chat-store';

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
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-6">
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

function UserMessage({ message }: { message: API.MessageOut }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl bg-blue-50 px-4 py-3 text-base text-gray-800 leading-relaxed">
        {message.content}
      </div>
    </div>
  );
}

function AiMessage({ message }: { message: API.MessageOut }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-medium text-purple-600 text-sm">
        AI
      </div>
      <div className="prose prose-sm prose-headings:my-3 prose-ol:my-2 prose-p:my-2 prose-pre:my-2 prose-ul:my-2 min-w-0 max-w-none flex-1 prose-code:rounded prose-pre:rounded-lg prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-pre:p-4 prose-code:px-1 prose-code:py-0.5 pt-1 prose-code:text-sm prose-pre:text-gray-100 text-base text-gray-800 leading-relaxed">
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
}

function StreamingMessage({
  content,
  isStreaming,
}: {
  content: string;
  isStreaming: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-medium text-purple-600 text-sm">
        AI
      </div>
      <div className="prose prose-sm prose-headings:my-3 prose-ol:my-2 prose-p:my-2 prose-pre:my-2 prose-ul:my-2 min-w-0 max-w-none flex-1 prose-code:rounded prose-pre:rounded-lg prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-pre:p-4 prose-code:px-1 prose-code:py-0.5 pt-1 prose-code:text-sm prose-pre:text-gray-100 text-base text-gray-800 leading-relaxed">
        <Markdown>{content}</Markdown>
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-purple-500" />
        )}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-medium text-purple-600 text-sm">
        AI
      </div>
      <div className="flex items-center gap-1.5 pt-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
