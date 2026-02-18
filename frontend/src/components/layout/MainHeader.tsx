import { RiMenuLine, RiStarFill } from "@remixicon/react";
import { useChatStore } from "@/stores/chat-store";

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
            <RiMenuLine size={20} />
          </button>
        )}
        <span className="text-xl font-semibold text-gray-700">Gemini</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white text-accent text-sm font-medium hover:bg-blue-50 transition-colors">
          <RiStarFill size={16} />
          升级到 Google AI Plus
        </button>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
          嘉
        </div>
      </div>
    </header>
  );
}
