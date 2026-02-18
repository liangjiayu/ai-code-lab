import { useRef, useCallback } from "react";
import { useParams } from "react-router";
import { Sparkles, Globe, Paperclip, ArrowUp } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useCreateConversation, useGenerateTitle } from "@/queries/use-conversations";
import { useSendMessage } from "@/queries/use-messages";


export function ChatInput() {
  const { id } = useParams();
  const inputValue = useChatStore((s) => s.inputValue);
  const setInputValue = useChatStore((s) => s.setInputValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createConversation = useCreateConversation();
  const sendMessage = useSendMessage();
  const generateTitle = useGenerateTitle();
  const isStreaming = useChatStore((s) => s.isStreaming);
  const isSending = createConversation.isPending || sendMessage.isPending || isStreaming;

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
      // 已有对话：直接发送消息
      const parentMessageId = crypto.randomUUID();
      sendMessage.mutate({
        conversation_id: id,
        prompt: text,
        parent_message_id: parentMessageId,
      });
    } else {
      // 新对话：先创建会话，再发送消息
      const conversationId = crypto.randomUUID();
      createConversation.mutate(
        { id: conversationId, title: "新对话" },
        {
          onSuccess: () => {
            const parentMessageId = crypto.randomUUID();
            sendMessage.mutate(
              {
                conversation_id: conversationId,
                prompt: text,
                parent_message_id: parentMessageId,
              },
              {
                onSuccess: () => {
                  generateTitle.mutate({
                    conversation_id: conversationId,
                    message: text,
                  });
                },
              }
            );
          },
        }
      );
    }
  };

  return (
    <div className="px-4 pb-6 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="给 AI 发送消息"
            rows={2}
            disabled={isSending}
            className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-base text-gray-800 placeholder-gray-400 outline-none max-h-36 disabled:opacity-50"
          />
          <div className="flex items-center justify-between px-4 pb-4 pt-1">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors">
                <Sparkles size={15} />
                深度思考
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors">
                <Globe size={15} />
                联网搜索
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="上传文件"
              >
                <Paperclip size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending}
                className="w-9 h-9 rounded-full bg-indigo-400 hover:bg-indigo-500 text-white flex items-center justify-center disabled:opacity-40 transition-colors"
                aria-label="发送"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
