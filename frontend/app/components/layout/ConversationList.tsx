import { useChatStore } from "~/stores/chat-store";
import { ConversationItem } from "./ConversationItem";

export function ConversationList() {
  const conversations = useChatStore((s) => s.conversations);

  return (
    <div className="flex-1 overflow-y-auto px-2">
      <h3 className="px-3 py-2 text-sm text-sidebar-text font-medium">
        对话
      </h3>
      {conversations.map((conv) => (
        <ConversationItem key={conv.id} conversation={conv} />
      ))}
    </div>
  );
}
