import { useChatStore } from "@/stores/chat-store";
import { SidebarHeader } from "./SidebarHeader";
import { ConversationList } from "./ConversationList";
import { SidebarFooter } from "./SidebarFooter";

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
