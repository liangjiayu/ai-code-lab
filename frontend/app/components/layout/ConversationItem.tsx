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
          ? "bg-sidebar-hover text-sidebar-text"
          : "text-sidebar-text hover:bg-sidebar-hover/60"
      }`}
    >
      {conversation.title}
    </button>
  );
}
