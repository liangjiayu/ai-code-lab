import { Sidebar } from "./Sidebar";
import { MainHeader } from "./MainHeader";
import { WelcomeArea } from "./WelcomeArea";
import { ChatInput } from "./ChatInput";

export function ChatLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <MainHeader />
        <main className="flex flex-1 flex-col overflow-hidden">
          <WelcomeArea />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
