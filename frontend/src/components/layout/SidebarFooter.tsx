import { RiSettings3Line } from "@remixicon/react";

export function SidebarFooter() {
  return (
    <div className="p-3">
      <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-full text-sm text-sidebar-text hover:bg-sidebar-hover transition-colors">
        <RiSettings3Line size={18} />
        设置和帮助
      </button>
    </div>
  );
}
