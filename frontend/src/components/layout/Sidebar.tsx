import { useChatStore } from '@/stores/chat-store';
import { ConversationList } from './conversation-list';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';

export function Sidebar() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);

  return (
    <aside
      className={`flex flex-col bg-sidebar-bg transition-all duration-300 overflow-hidden ${
        isSidebarOpen ? 'w-72' : 'w-16'
      }`}
    >
      <div
        className={`flex flex-col h-full shrink-0 ${isSidebarOpen ? 'w-72' : 'w-16'}`}
      >
        <SidebarHeader />
        {isSidebarOpen ? <ConversationList /> : <div className="flex-1" />}
        <SidebarFooter />
      </div>
    </aside>
  );
}
