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
            className="p-2 rounded-full hover:bg-white/60 text-gray-600 transition-colors"
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
        <span className="text-xl font-semibold text-gray-700">Gemini</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white text-accent text-sm font-medium hover:bg-blue-50 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
          </svg>
          升级到 Google AI Plus
        </button>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
          嘉
        </div>
      </div>
    </header>
  );
}
