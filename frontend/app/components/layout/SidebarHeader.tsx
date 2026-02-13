import { useChatStore } from "~/stores/chat-store";

export function SidebarHeader() {
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);

  const handleNewChat = () => {
    setActiveConversation(null);
  };

  return (
    <div className="px-2 pt-3 pb-1">
      <div className="flex items-center justify-between px-1 mb-2">
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
          className="p-2 rounded-full hover:bg-sidebar-hover text-sidebar-text transition-colors"
          aria-label="搜索"
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
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleNewChat}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm"
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        发起新对话
      </button>

      <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm">
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        我的内容
      </button>

      <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm cursor-pointer">
        <span className="font-medium">Gem</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}
