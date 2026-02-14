import { RiMenuLine, RiSearchLine, RiEditLine, RiHomeLine, RiArrowRightSLine } from "@remixicon/react";
import { useNavigate } from "react-router";
import { useChatStore } from "~/stores/chat-store";

export function SidebarHeader() {
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
          className="p-2 rounded-full hover:bg-sidebar-hover text-sidebar-text transition-colors"
          aria-label="折叠侧边栏"
        >
          <RiMenuLine size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-sidebar-hover text-sidebar-text transition-colors"
          aria-label="搜索"
        >
          <RiSearchLine size={20} />
        </button>
      </div>

      <button
        onClick={handleNewChat}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm"
      >
        <RiEditLine size={18} />
        发起新对话
      </button>

      <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm">
        <RiHomeLine size={18} />
        我的内容
      </button>

      <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-full text-sidebar-text hover:bg-sidebar-hover transition-colors text-sm cursor-pointer">
        <span className="font-medium">Gem</span>
        <RiArrowRightSLine size={16} />
      </div>
    </div>
  );
}
