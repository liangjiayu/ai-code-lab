import { useChatStore } from "~/stores/chat-store";

export function SidebarHeader() {
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);

  const handleNewChat = () => {
    setActiveConversation(null);
  };

  return (
    <div className="flex items-center gap-2 p-3">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-sidebar-hover text-sidebar-text transition-colors"
        aria-label="折叠侧边栏"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <button
        onClick={handleNewChat}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        新建对话
      </button>
    </div>
  );
}
