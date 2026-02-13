import { useChatStore } from "~/stores/chat-store";

export function MainHeader() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="展开侧边栏"
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
        )}
        <span className="text-lg font-semibold text-gray-700">Gemini</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
        U
      </div>
    </header>
  );
}
