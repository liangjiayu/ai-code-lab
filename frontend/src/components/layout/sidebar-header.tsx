import { RiMenuLine, RiEditBoxLine, RiSearchLine } from "@remixicon/react";
import { useNavigate } from "react-router";
import { useChatStore } from "@/stores/chat-store";
import { cn } from "@/lib/utils";

const btnBase =
  "flex items-center rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors";

export function SidebarHeader() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  return (
    <div className="px-2 pt-3 pb-1">
      <div className="flex items-center justify-between px-1 mb-2">
        <button
          onClick={toggleSidebar}
          className={cn(btnBase, "size-10 justify-center")}
          aria-label={isSidebarOpen ? "折叠侧边栏" : "展开侧边栏"}
        >
          <RiMenuLine size={20} />
        </button>
        {isSidebarOpen && (
          <button
            className={cn(btnBase, "size-10 justify-center")}
            aria-label="搜索"
          >
            <RiSearchLine size={20} />
          </button>
        )}
      </div>

      <button
        onClick={handleNewChat}
        className={cn(
          btnBase,
          "gap-3 text-sm",
          isSidebarOpen ? "w-full px-3 py-2.5" : "size-10 justify-center mx-auto",
        )}
      >
        <RiEditBoxLine size={18} className="shrink-0" />
        {isSidebarOpen && <span>发起新对话</span>}
      </button>
    </div>
  );
}
