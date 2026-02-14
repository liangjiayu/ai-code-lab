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
    mutationFn: (params: { conversation_id: string; content: string }) => {
      // chatCompletions 后端会同时保存用户消息和生成 AI 回复
      return chatCompletions({
        conversation_id: params.conversation_id,
        content: params.content,
      });
    },
    onMutate: async (variables) => {
      // 取消正在进行的查询，避免覆盖乐观更新
      await queryClient.cancelQueries({
        queryKey: ["messages", variables.conversation_id],
      });

      const previousData = queryClient.getQueryData<API.PageDataMessageOut_>(["messages", variables.conversation_id]);

      // 乐观添加用户消息，让用户输入立即显示
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
      // 出错时回滚到之前的数据
      if (context?.previousData) {
        queryClient.setQueryData(
          ["messages", variables.conversation_id],
          context.previousData
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      // 无论成功失败，都重新获取最新数据
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
}
