import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, createMessage } from "~/services/api/messages";
import { chatCompletions } from "~/services/api/chat";

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
      // 1. 创建用户消息
      await createMessage({
        role: "user",
        content: params.content,
        conversation_id: params.conversation_id,
      });

      // 2. 刷新列表展示用户消息
      await queryClient.invalidateQueries({
        queryKey: ["messages", params.conversation_id],
      });

      // 3. 调用 AI 获取回复
      const aiResponse = await chatCompletions({
        conversation_id: params.conversation_id,
        content: params.content,
      });

      return aiResponse;
    },
    onSuccess: (_data, variables) => {
      // 4. 刷新列表展示 AI 回复
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
}
