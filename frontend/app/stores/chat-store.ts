import { create } from "zustand";
import type { Conversation } from "~/types/chat";
import { mockConversations } from "~/lib/mock-data";

interface ChatStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
  createConversation: () => void;

  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  conversations: mockConversations,
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  createConversation: () =>
    set((s) => {
      const newConv: Conversation = {
        id: String(Date.now()),
        title: "新对话",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        conversations: [newConv, ...s.conversations],
        activeConversationId: newConv.id,
        inputValue: "",
      };
    }),

  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
}));
