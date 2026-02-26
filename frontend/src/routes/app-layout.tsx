import { Outlet, useLocation } from 'react-router';
import { ChatInput } from '@/components/chat/chat-input';
import { MainHeader } from '@/components/layout/main-header';
import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex flex-1 flex-col min-w-0 ${isHome ? 'bg-main-bg' : 'bg-white'}`}
      >
        <MainHeader />
        <main
          className={`flex flex-1 flex-col overflow-hidden ${isHome ? 'justify-center' : ''}`}
        >
          <Outlet />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
