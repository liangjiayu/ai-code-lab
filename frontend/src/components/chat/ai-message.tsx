import Markdown from 'react-markdown';

const aiProseClass =
  'prose prose-sm prose-headings:my-3 prose-ol:my-2 prose-p:my-2 prose-pre:my-2 prose-ul:my-2 min-w-0 max-w-none prose-code:rounded prose-pre:rounded-lg prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-pre:p-4 prose-code:px-1 prose-code:py-0.5 pt-1 prose-code:text-sm prose-pre:text-gray-100 text-base text-gray-800 leading-relaxed';

interface AiMessageProps {
  message: API.MessageOut;
}

export function AiMessage({ message }: AiMessageProps) {
  return (
    <div>
      <div className={aiProseClass}>
        <Markdown>{message.content}</Markdown>
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
