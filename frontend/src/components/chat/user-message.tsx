import { RiCheckLine, RiEditLine, RiFileCopyLine } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn, copyToClipboard } from '@/lib/utils';
import { useEditMessage } from '@/queries/use-messages';

interface UserMessageProps {
  message: API.MessageOut;
  isLast?: boolean;
}

export function UserMessage({ message, isLast }: UserMessageProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(message.content ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editMessage = useEditMessage();

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }
  }, [isEditing]);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content ?? '');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEdit = () => {
    setEditValue(message.content ?? '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditValue(message.content ?? '');
    setIsEditing(false);
  };

  const handleSend = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      editMessage.mutate({
        conversation_id: message.conversation_id,
        message_id: message.id,
        prompt: trimmed,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="group/user-msg mt-5 mb-1">
      {isEditing ? (
        <div className="rounded-2xl border-2 border-blue-500 bg-white px-4 pt-3 pb-2">
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full resize-none bg-transparent text-base text-gray-800 leading-relaxed outline-none"
            rows={2}
          />
          <div className="flex justify-end gap-2 py-1">
            <button
              type="button"
              className="rounded-full border border-gray-300 px-4 py-1.5 text-gray-700 text-sm hover:bg-gray-50"
              onClick={handleCancel}
            >
              取消
            </button>
            <button
              type="button"
              className="rounded-full bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              onClick={handleSend}
              disabled={!editValue.trim()}
            >
              发送
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end">
          <div className="inline-flex whitespace-pre-wrap rounded-2xl bg-blue-50 px-4 py-3 text-base text-gray-800 leading-relaxed">
            {message.content}
          </div>
          <div
            className={cn(
              'mt-1 flex justify-end gap-1 opacity-0 transition-opacity group-hover/user-msg:opacity-100',
            )}
          >
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? (
                <RiCheckLine className="text-green-500" />
              ) : (
                <RiFileCopyLine />
              )}
            </Button>
            {isLast && (
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <RiEditLine />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
