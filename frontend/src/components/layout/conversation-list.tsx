import { useConversations } from '@/queries/use-conversations';
import { ConversationItem } from './conversation-item';

export function ConversationList() {
  const { data, isLoading } = useConversations();
  const conversations = data?.list ?? [];

  return (
    <div className="flex-1 overflow-y-auto px-2">
      <h3 className="px-3 py-2 font-medium text-xs">对话</h3>
      {isLoading ? (
        <p className="px-3 py-2 text-gray-400 text-sm">加载中...</p>
      ) : (
        conversations.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))
      )}
    </div>
  );
}
