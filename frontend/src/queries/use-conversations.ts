import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  getConversations,
  createConversation,
  updateConversation,
  deleteConversation,
} from "@/services/api/conversations";
import { generateTitle } from "@/services/api/chat";

const USER_ID = "xiaoming";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations({ user_id: USER_ID }),
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { id: string; title: string }) =>
      createConversation({ id: params.id, title: params.title, user_id: USER_ID }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      if (data?.id) {
        navigate(`/chat/${data.id}`);
      }
    },
  });
}

export function useGenerateTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { conversation_id: string; message: string }) =>
      generateTitle({ conversation_id: params.conversation_id, message: params.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { conversation_id: string; title: string }) =>
      updateConversation(
        { conversation_id: params.conversation_id },
        { title: params.title }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      deleteConversation({ conversation_id: conversationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
