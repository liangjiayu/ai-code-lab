import { Outlet, useLocation } from "react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainHeader } from "@/components/layout/MainHeader";
import { ChatInput } from "@/components/layout/ChatInput";

export default function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex flex-1 flex-col min-w-0 ${isHome ? "bg-main-bg" : "bg-white"}`}
      >
        <MainHeader />
        <main
          className={`flex flex-1 flex-col overflow-hidden ${isHome ? "justify-center" : ""}`}
        >
          <Outlet />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
