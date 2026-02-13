import { useChatStore } from "~/stores/chat-store";
import type { Conversation } from "~/types/chat";

interface ConversationItemProps {
  conversation: Conversation;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);
  const isActive = activeConversationId === conversation.id;

  return (
    <button
      onClick={() => setActiveConversation(conversation.id)}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${
        isActive
          ? "bg-sidebar-active text-sidebar-text font-medium"
          : "text-sidebar-text hover:bg-sidebar-hover"
      }`}
    >
      {conversation.title}
    </button>
  );
}
