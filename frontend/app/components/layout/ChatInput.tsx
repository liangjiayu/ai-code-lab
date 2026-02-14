import { useRef, useCallback } from "react";
import { useParams } from "react-router";
import { RiAddLine, RiMore2Fill, RiArrowDownSLine, RiMicLine } from "@remixicon/react";
import { useChatStore } from "~/stores/chat-store";
import { useCreateConversation } from "~/queries/use-conversations";
import { useSendMessage } from "~/queries/use-messages";

const suggestions = [
  { icon: "🎨", label: "制作图片" },
  { icon: null, label: "帮我学习" },
  { icon: null, label: "给我的一天注入活力" },
  { icon: null, label: "随便写点什么" },
];

export function ChatInput() {
  const { id } = useParams();
  const inputValue = useChatStore((s) => s.inputValue);
  const setInputValue = useChatStore((s) => s.setInputValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createConversation = useCreateConversation();
  const sendMessage = useSendMessage();
  const isSending = createConversation.isPending || sendMessage.isPending;

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
    const text = inputValue.trim();
    if (!text || isSending) return;

    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    if (id) {
      sendMessage.mutate({
        content: text,
        conversation_id: id,
      });
    } else {
      createConversation.mutate(text);
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
            disabled={isSending}
            className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-base text-gray-800 placeholder-gray-400 outline-none max-h-36 disabled:opacity-50"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="添加"
              >
                <RiAddLine size={20} />
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors text-sm"
                aria-label="工具"
              >
                <RiMore2Fill size={18} />
                工具
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors text-sm">
                快速
                <RiArrowDownSLine size={14} />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="语音输入"
              >
                <RiMicLine size={20} />
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
