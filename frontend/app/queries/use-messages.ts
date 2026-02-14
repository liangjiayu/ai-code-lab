import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, createMessage } from "~/services/api/messages";

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages({ conversation_id: conversationId }),
    enabled: !!conversationId,
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: API.MessageCreate) => createMessage(body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
}
