import { RiSettings3Line } from '@remixicon/react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/stores/chat-store';

export function SidebarFooter() {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);

  return (
    <div className="p-3">
      <button
        type="button"
        className={cn(
          'flex cursor-pointer items-center rounded-full text-sidebar-text text-sm transition-colors hover:bg-sidebar-hover',
          isSidebarOpen
            ? 'w-full gap-3 px-3 py-2.5'
            : 'mx-auto size-10 justify-center',
        )}
      >
        <RiSettings3Line size={18} className="shrink-0" />
        {isSidebarOpen && <span>设置和帮助</span>}
      </button>
    </div>
  );
}
