import { useConversations } from "~/queries/use-conversations";
import { ConversationItem } from "./ConversationItem";

export function ConversationList() {
  const { data, isLoading } = useConversations();
  const conversations = data?.list ?? [];

  return (
    <div className="flex-1 overflow-y-auto px-2">
      <h3 className="px-3 py-2 text-sm text-sidebar-text font-medium">
        对话
      </h3>
      {isLoading ? (
        <p className="px-3 py-2 text-sm text-gray-400">加载中...</p>
      ) : (
        conversations.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))
      )}
    </div>
  );
}
