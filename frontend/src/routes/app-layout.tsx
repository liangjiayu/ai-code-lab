import { Outlet, useLocation } from 'react-router';
import { ChatInput } from '@/components/chat/chat-input';
import { MainFooter } from '@/components/layout/main-footer';
import { MainHeader } from '@/components/layout/main-header';
import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex min-w-0 flex-1 flex-col ${isHome ? 'bg-main-bg' : 'bg-white'}`}
      >
        <MainHeader />
        <main
          className={`flex flex-1 flex-col overflow-hidden ${isHome ? 'justify-center' : ''}`}
        >
          <Outlet />
          <ChatInput />
        </main>

        <MainFooter />
      </div>
    </div>
  );
}
