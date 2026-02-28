import { useChatStore } from '@/stores/chat-store';
import { ConversationList } from './conversation-list';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';

export function Sidebar() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);

  return (
    <aside
      className={`flex flex-col overflow-hidden bg-sidebar-bg transition-all duration-300 ${
        isSidebarOpen ? 'w-72' : 'w-16'
      }`}
    >
      <div
        className={`flex h-full shrink-0 flex-col ${isSidebarOpen ? 'w-72' : 'w-16'}`}
      >
        <SidebarHeader />
        {isSidebarOpen ? <ConversationList /> : <div className="flex-1" />}
        <SidebarFooter />
      </div>
    </aside>
  );
}
