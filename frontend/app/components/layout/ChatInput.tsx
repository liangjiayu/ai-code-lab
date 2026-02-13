import { useRef, useCallback } from "react";
import { useChatStore } from "~/stores/chat-store";

const suggestions = [
  { icon: "🎨", label: "制作图片" },
  { icon: null, label: "帮我学习" },
  { icon: null, label: "给我的一天注入活力" },
  { icon: null, label: "随便写点什么" },
];

export function ChatInput() {
  const inputValue = useChatStore((s) => s.inputValue);
  const setInputValue = useChatStore((s) => s.setInputValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 6 * 24;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="px-4 pb-6 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-input-bg shadow-md border border-gray-200/40 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="问问 Gemini 3"
            rows={1}
            className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-base text-gray-800 placeholder-gray-400 outline-none max-h-36"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="添加"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors text-sm"
                aria-label="工具"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
                工具
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors text-sm">
                快速
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="语音输入"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
          {suggestions.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-gray-200/60 text-sm text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-all"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
