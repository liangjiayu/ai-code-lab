import { useChatStore } from "@/stores/chat-store";
import { SidebarHeader } from "./sidebar-header";
import { ConversationList } from "./conversation-list";
import { SidebarFooter } from "./sidebar-footer";

export function Sidebar() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);

  return (
    <aside
      className={`flex flex-col bg-sidebar-bg transition-all duration-300 ${
        isSidebarOpen ? "w-72" : "w-0"
      } overflow-hidden`}
    >
      <div className="flex flex-col h-full w-72">
        <SidebarHeader />
        <ConversationList />
        <SidebarFooter />
      </div>
    </aside>
  );
}
