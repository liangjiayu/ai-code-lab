import { RiSettings3Line } from "@remixicon/react";
import { useChatStore } from "@/stores/chat-store";
import { cn } from "@/lib/utils";

export function SidebarFooter() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);

  return (
    <div className="p-3">
      <button
        className={cn(
          "flex items-center rounded-full text-sm text-sidebar-text hover:bg-sidebar-hover transition-colors",
          isSidebarOpen ? "w-full gap-3 px-3 py-2.5" : "size-10 justify-center mx-auto",
        )}
      >
        <RiSettings3Line size={18} className="shrink-0" />
        {isSidebarOpen && <span>设置和帮助</span>}
      </button>
    </div>
  );
}
