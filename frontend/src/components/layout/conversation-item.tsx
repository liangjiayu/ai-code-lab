import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { RiMore2Line, RiPencilLine, RiDeleteBinLine } from "@remixicon/react";
import { useUpdateConversation, useDeleteConversation } from "@/queries/use-conversations";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ConversationItemProps {
  conversation: API.ConversationOut;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const navigate = useNavigate();
  const params = useParams();
  const updateMutation = useUpdateConversation();
  const deleteMutation = useDeleteConversation();

  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="group relative">
        <NavLink
          to={`/chat/${conversation.id}`}
          className={({ isActive }) =>
            `block w-full text-left px-3 py-2.5 rounded-full text-sm truncate transition-colors pr-8 ${
              isActive
                ? "bg-sidebar-active text-sidebar-text font-medium"
                : "text-sidebar-text hover:bg-sidebar-hover"
            }`
          }
        >
          {conversation.title}
        </NavLink>

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 rounded-md hover:bg-black/10 text-sidebar-text cursor-pointer transition-opacity ${
                menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <RiMore2Line size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
              <RiPencilLine size={16} />
              重命名
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
              <RiDeleteBinLine size={16} />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 重命名弹窗 */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>重命名会话</DialogTitle>
          </DialogHeader>
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
            }}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRename} disabled={updateMutation.isPending}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认弹窗 */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="sm:max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>删除会话</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除「{conversation.title}」吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
