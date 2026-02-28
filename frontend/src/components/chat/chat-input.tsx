import {
  RiArrowUpLine,
  RiAttachmentLine,
  RiGlobalLine,
  RiSparklingLine,
} from '@remixicon/react';
import { useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import {
  useCreateConversation,
  useGenerateTitle,
} from '@/queries/use-conversations';
import { useSendMessage } from '@/queries/use-messages';
import { useChatStore } from '@/stores/chat-store';

export function ChatInput() {
  const { id } = useParams();
  const inputValue = useChatStore((s) => s.inputValue);
  const setInputValue = useChatStore((s) => s.setInputValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createConversation = useCreateConversation();
  const sendMessage = useSendMessage();
  const generateTitle = useGenerateTitle();
  const isStreaming = useChatStore((s) => s.isStreaming);
  const isSending =
    createConversation.isPending || sendMessage.isPending || isStreaming;

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const maxHeight = 12 * 24;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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
        { id: conversationId, title: '新对话' },
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
              },
            );
          },
        },
      );
    }
  };

  return (
    <div className="px-4">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white p-3 shadow-xs">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="给 AI 发送消息"
            rows={2}
            disabled={isSending}
            className="w-full resize-none bg-transparent px-3 py-2 text-base text-gray-700 placeholder-gray-400 outline-none disabled:opacity-50"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-gray-700 text-sm transition-colors hover:bg-gray-50"
              >
                <RiSparklingLine size={15} />
                深度思考
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-gray-700 text-sm transition-colors hover:bg-gray-50"
              >
                <RiGlobalLine size={15} />
                联网搜索
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-400 transition-colors hover:text-gray-600"
                aria-label="上传文件"
              >
                <RiAttachmentLine size={20} />
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
                aria-label="发送"
              >
                <RiArrowUpLine size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
