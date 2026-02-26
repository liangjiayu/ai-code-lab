import { useParams } from 'react-router';
import { ChatMessageList } from '@/components/chat/chat-message-list';
import { useMessages, useSendMessage } from '@/queries/use-messages';

export default function Chat() {
  const { id } = useParams();
  const { data, isLoading } = useMessages(id as string);
  const sendMessage = useSendMessage();
  const messages = data ?? [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        加载中...
      </div>
    );
  }

  return (
    <ChatMessageList messages={messages} isAiLoading={sendMessage.isPending} />
  );
}
