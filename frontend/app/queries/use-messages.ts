import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, createMessage } from "~/services/api/messages";
import { fetchSSE } from "~/lib/sse-fetch";
import { useChatStore } from "~/stores/chat-store";

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

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { conversation_id: string; content: string }) => {
      const store = useChatStore.getState();
      store.startStreaming();

      await fetchSSE(
        "/api/chat/completions",
        {
          conversation_id: params.conversation_id,
          content: params.content,
        },
        {
          onContent: (chunk) => {
            useChatStore.getState().appendStreamingContent(chunk);
          },
          onError: (error) => {
            throw new Error(error);
          },
          onComplete: () => {
            useChatStore.getState().stopStreaming();
          },
        }
      );
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", variables.conversation_id],
      });

      const previousData = queryClient.getQueryData<API.PageDataMessageOut_>(["messages", variables.conversation_id]);

      const optimisticMessage: API.MessageOut = {
        id: `temp-${Date.now()}`,
        conversation_id: variables.conversation_id,
        role: "user" as API.MessageRole,
        content: variables.content,
        status: "success" as API.MessageStatus,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<API.PageDataMessageOut_>(
        ["messages", variables.conversation_id],
        (old) => ({
          ...old,
          list: [...(old?.list ?? []), optimisticMessage],
          total: (old?.total ?? 0) + 1,
          page: old?.page ?? 1,
          page_size: old?.page_size ?? 20,
        })
      );

      return { previousData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["messages", variables.conversation_id],
          context.previousData
        );
      }
      useChatStore.getState().resetStreaming();
    },
    onSuccess: (_data, variables) => {
      useChatStore.getState().resetStreaming();
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
}
