import { NavLink } from "react-router";
import type { Conversation } from "~/types/chat";

interface ConversationItemProps {
  conversation: Conversation;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  return (
    <NavLink
      to={`/${conversation.id}`}
      className={({ isActive }) =>
        `block w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${
          isActive
            ? "bg-sidebar-active text-sidebar-text font-medium"
            : "text-sidebar-text hover:bg-sidebar-hover"
        }`
      }
    >
      {conversation.title}
    </NavLink>
  );
}
