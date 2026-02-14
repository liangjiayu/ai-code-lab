import { Outlet } from "react-router";
import { Sidebar } from "~/components/layout/Sidebar";
import { MainHeader } from "~/components/layout/MainHeader";
import { ChatInput } from "~/components/layout/ChatInput";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <MainHeader />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
