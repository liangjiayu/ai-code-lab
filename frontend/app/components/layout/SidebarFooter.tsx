export function SidebarFooter() {
  return (
    <div className="p-3 border-t border-sidebar-hover">
      <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-sidebar-text hover:bg-sidebar-hover transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        设置
      </button>
    </div>
  );
}
