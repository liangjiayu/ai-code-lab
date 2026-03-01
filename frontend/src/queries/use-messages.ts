import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSSE } from '@/lib/sse-fetch';
import { createMessage, getMessages } from '@/services/api/messages';
import { useChatStore } from '@/stores/chat-store';

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ['messages', conversationId],
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
        queryKey: ['messages', variables.conversation_id],
      });
    },
  });
}

export function useEditMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      conversation_id: string;
      message_id: string;
      prompt: string;
    }) => {
      const store = useChatStore.getState();
      store.startStreaming();

      await fetchSSE(
        '/api/chat/edit_completion',
        {
          conversation_id: params.conversation_id,
          message_id: params.message_id,
          prompt: params.prompt,
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
        },
      );
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['messages', variables.conversation_id],
      });

      const previousData = queryClient.getQueryData<API.MessageOut[]>([
        'messages',
        variables.conversation_id,
      ]);

      queryClient.setQueryData<API.MessageOut[]>(
        ['messages', variables.conversation_id],
        (old) => {
          if (!old) return [];
          const idx = old.findIndex((m) => m.id === variables.message_id);
          if (idx === -1) return old;
          const updated = old.slice(0, idx + 1);
          updated[idx] = { ...updated[idx], content: variables.prompt };
          return updated;
        },
      );

      return { previousData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['messages', variables.conversation_id],
          context.previousData,
        );
      }
      useChatStore.getState().resetStreaming();
    },
    onSuccess: (_data, variables) => {
      const { streamingContent } = useChatStore.getState();

      if (streamingContent) {
        const assistantMessage: API.MessageOut = {
          id: `assistant-${variables.message_id}`,
          conversation_id: variables.conversation_id,
          role: 'assistant' as API.MessageRole,
          content: streamingContent,
          status: 'success' as API.MessageStatus,
          created_at: new Date().toISOString(),
        };

        queryClient.setQueryData<API.MessageOut[]>(
          ['messages', variables.conversation_id],
          (old) => [...(old ?? []), assistantMessage],
        );
      }

      useChatStore.getState().resetStreaming();
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      conversation_id: string;
      prompt: string;
      parent_message_id: string;
    }) => {
      const store = useChatStore.getState();
      store.startStreaming();

      await fetchSSE(
        '/api/chat/completions',
        {
          conversation_id: params.conversation_id,
          prompt: params.prompt,
          parent_message_id: params.parent_message_id,
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
        },
      );
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['messages', variables.conversation_id],
      });

      const previousData = queryClient.getQueryData<API.MessageOut[]>([
        'messages',
        variables.conversation_id,
      ]);

      const optimisticMessage: API.MessageOut = {
        id: variables.parent_message_id,
        conversation_id: variables.conversation_id,
        role: 'user' as API.MessageRole,
        content: variables.prompt,
        status: 'success' as API.MessageStatus,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<API.MessageOut[]>(
        ['messages', variables.conversation_id],
        (old) => [...(old ?? []), optimisticMessage],
      );

      return { previousData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['messages', variables.conversation_id],
          context.previousData,
        );
      }
      useChatStore.getState().resetStreaming();
    },
    onSuccess: (_data, variables) => {
      const { streamingContent } = useChatStore.getState();

      // 将流式内容作为 assistant 消息写入 React Query 缓存
      if (streamingContent) {
        const assistantMessage: API.MessageOut = {
          id: `assistant-${variables.parent_message_id}`,
          conversation_id: variables.conversation_id,
          role: 'assistant' as API.MessageRole,
          content: streamingContent,
          status: 'success' as API.MessageStatus,
          created_at: new Date().toISOString(),
        };

        queryClient.setQueryData<API.MessageOut[]>(
          ['messages', variables.conversation_id],
          (old) => [...(old ?? []), assistantMessage],
        );
      }

      useChatStore.getState().resetStreaming();
    },
  });
}
