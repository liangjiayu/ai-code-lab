import { create } from "zustand";

interface ChatStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
}));
