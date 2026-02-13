import { useChatStore } from "~/stores/chat-store";
import { groupConversationsByDate } from "~/lib/mock-data";
import { ConversationItem } from "./ConversationItem";

export function ConversationList() {
  const conversations = useChatStore((s) => s.conversations);
  const groups = groupConversationsByDate(conversations);

  return (
    <div className="flex-1 overflow-y-auto px-2">
      {groups.map((group) => (
        <div key={group.label} className="mb-3">
          <h3 className="px-3 py-2 text-xs text-sidebar-text-muted font-medium">
            {group.label}
          </h3>
          {group.conversations.map((conv) => (
            <ConversationItem key={conv.id} conversation={conv} />
          ))}
        </div>
      ))}
    </div>
  );
}
