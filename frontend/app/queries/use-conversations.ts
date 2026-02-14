import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  getConversations,
  createConversation,
  deleteConversation,
} from "~/services/api/conversations";

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
    mutationFn: (title: string) =>
      createConversation({ title, user_id: USER_ID }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      if (data?.id) {
        navigate(`/${data.id}`);
      }
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
