interface UserMessageProps {
  message: API.MessageOut;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl bg-blue-50 px-4 py-3 text-base text-gray-800 leading-relaxed">
        {message.content}
      </div>
    </div>
  );
}
