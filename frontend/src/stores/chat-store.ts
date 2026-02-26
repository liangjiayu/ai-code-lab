import { create } from 'zustand';

interface ChatStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  inputValue: string;
  setInputValue: (value: string) => void;

  streamingContent: string;
  isStreaming: boolean;
  appendStreamingContent: (chunk: string) => void;
  startStreaming: () => void;
  stopStreaming: () => void;
  resetStreaming: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  streamingContent: '',
  isStreaming: false,
  appendStreamingContent: (chunk) =>
    set((s) => ({ streamingContent: s.streamingContent + chunk })),
  startStreaming: () => set({ isStreaming: true, streamingContent: '' }),
  stopStreaming: () => set({ isStreaming: false }),
  resetStreaming: () => set({ isStreaming: false, streamingContent: '' }),
}));
