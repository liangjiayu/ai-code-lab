interface ChatMessageListProps {
  messages: API.MessageOut[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        暂无消息
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {message.role === "user" ? "你" : "AI"}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {message.role === "user" ? "你" : "Gemini"}
                </p>
                <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
