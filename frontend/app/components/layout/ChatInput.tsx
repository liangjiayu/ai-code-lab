import { useRef, useCallback } from "react";
import { useChatStore } from "~/stores/chat-store";

export function ChatInput() {
  const inputValue = useChatStore((s) => s.inputValue);
  const setInputValue = useChatStore((s) => s.setInputValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 6 * 24; // ~6 lines
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

  const isEmpty = !inputValue.trim();

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end rounded-2xl bg-input-bg shadow-sm border border-gray-200/60">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-4 py-3 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none max-h-36"
          />
          <button
            onClick={handleSend}
            disabled={isEmpty}
            className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
              isEmpty
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-accent text-white hover:bg-accent/90 cursor-pointer"
            }`}
            aria-label="发送"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Gemini 可能会显示不准确的信息，包括有关人物的信息，因此请仔细核实其回答。
        </p>
      </div>
    </div>
  );
}
