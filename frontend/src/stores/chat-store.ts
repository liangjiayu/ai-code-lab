import { create } from 'zustand';

type ChatStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  inputValue: string;
  setInputValue: (value: string) => void;

  streamingContent: string;
  streamingMessageId: string;
  isStreaming: boolean;
  appendStreamingContent: (chunk: string) => void;
  setStreamingMessageId: (id: string) => void;
  startStreaming: () => void;
  stopStreaming: () => void;
  resetStreaming: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  streamingContent: '',
  streamingMessageId: '',
  isStreaming: false,
  appendStreamingContent: (chunk) =>
    set((s) => ({ streamingContent: s.streamingContent + chunk })),
  setStreamingMessageId: (id) => set({ streamingMessageId: id }),
  startStreaming: () =>
    set({ isStreaming: true, streamingContent: '', streamingMessageId: '' }),
  stopStreaming: () => set({ isStreaming: false }),
  resetStreaming: () =>
    set({ isStreaming: false, streamingContent: '', streamingMessageId: '' }),
}));
