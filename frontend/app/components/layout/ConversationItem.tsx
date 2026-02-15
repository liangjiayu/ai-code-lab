import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { Menu, MenuButton, MenuItems, MenuItem, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiMore2Fill, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { useUpdateConversation, useDeleteConversation } from "~/queries/use-conversations";

interface ConversationItemProps {
  conversation: API.ConversationOut;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const navigate = useNavigate();
  const params = useParams();
  const updateMutation = useUpdateConversation();
  const deleteMutation = useDeleteConversation();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(conversation.title ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renameOpen) {
      setTitle(conversation.title ?? "");
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [renameOpen, conversation.title]);

  const handleRename = () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed === conversation.title) {
      setRenameOpen(false);
      return;
    }
    updateMutation.mutate(
      { conversation_id: conversation.id!, title: trimmed },
      { onSuccess: () => setRenameOpen(false) }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(conversation.id!, {
      onSuccess: () => {
        setDeleteOpen(false);
        if (params.id === conversation.id) {
          navigate("/");
        }
      },
    });
  };

  return (
    <>
      <Menu as="div" className="group relative">
        {({ open }) => (
          <>
            <NavLink
              to={`/chat/${conversation.id}`}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors pr-8 ${
                  isActive
                    ? "bg-sidebar-active text-sidebar-text font-medium"
                    : "text-sidebar-text hover:bg-sidebar-hover"
                }`
              }
            >
              {conversation.title}
            </NavLink>

            <MenuButton
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 rounded-md hover:bg-black/10 text-sidebar-text cursor-pointer transition-opacity ${
                open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <RiMore2Fill size={16} />
            </MenuButton>

            <MenuItems
              anchor="bottom start"
              className="z-50 w-36 rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-1 text-sm"
            >
              <MenuItem>
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 data-[focus]:bg-gray-100"
                  onClick={() => setRenameOpen(true)}
                >
                  <RiEditLine size={16} />
                  重命名
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-red-600 data-[focus]:bg-red-50"
                  onClick={() => setDeleteOpen(true)}
                >
                  <RiDeleteBinLine size={16} />
                  删除
                </button>
              </MenuItem>
            </MenuItems>
          </>
        )}
      </Menu>

      {/* 重命名弹窗 */}
      <Dialog open={renameOpen} onClose={() => setRenameOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-base font-medium mb-4">重命名会话</DialogTitle>
            <input
              ref={inputRef}
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
              }}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setRenameOpen(false)}
              >
                取消
              </button>
              <button
                className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white hover:bg-accent/90 disabled:opacity-50"
                onClick={handleRename}
                disabled={updateMutation.isPending}
              >
                保存
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* 删除确认弹窗 */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-base font-medium mb-2">删除会话</DialogTitle>
            <p className="text-sm text-gray-500 mb-4">
              确定要删除「{conversation.title}」吗？此操作不可撤销。
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setDeleteOpen(false)}
              >
                取消
              </button>
              <button
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                删除
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
