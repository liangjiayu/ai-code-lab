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
      <div className="flex-1 flex items-center justify-center text-gray-400">
        暂无消息
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
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
      <div className="max-w-[80%] rounded-2xl bg-blue-50 px-4 py-3 text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
        {message.content}
      </div>
    </div>
  );
}

function AiMessage({ message }: { message: API.MessageOut }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium shrink-0">
        AI
      </div>
      <div className="flex-1 min-w-0 pt-1 text-gray-800 text-base leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-pre:my-2 prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4">
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
      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium shrink-0">
        AI
      </div>
      <div className="flex-1 min-w-0 pt-1 text-gray-800 text-base leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-pre:my-2 prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4">
        <Markdown>{content}</Markdown>
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-0.5 bg-purple-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium shrink-0">
        AI
      </div>
      <div className="flex items-center gap-1.5 pt-3">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
