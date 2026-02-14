// @ts-ignore
/* eslint-disable */
import request from "~/lib/request";

/** Get Conversations GET /api/conversations/ */
export async function getConversations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConversationsParams,
  options?: { [key: string]: any }
) {
  return request<API.PageDataConversationOut_ | null>("/api/conversations/", {
    method: "GET",
    params: {
      // page has a default value: 1
      page: "1",
      // page_size has a default value: 20
      page_size: "20",
      ...params,
    },
    ...(options || {}),
  });
}

/** Create Conversation POST /api/conversations/ */
export async function createConversation(
  body: API.ConversationCreate,
  options?: { [key: string]: any }
) {
  return request<API.ConversationOut | null>("/api/conversations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Conversation GET /api/conversations/${param0} */
export async function getConversation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConversationParams,
  options?: { [key: string]: any }
) {
  const { conversation_id: param0, ...queryParams } = params;
  return request<API.ConversationOut | null>(`/api/conversations/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update Conversation PUT /api/conversations/${param0} */
export async function updateConversation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateConversationParams,
  body: API.ConversationUpdate,
  options?: { [key: string]: any }
) {
  const { conversation_id: param0, ...queryParams } = params;
  return request<API.ConversationOut | null>(`/api/conversations/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete Conversation DELETE /api/conversations/${param0} */
export async function deleteConversation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteConversationParams,
  options?: { [key: string]: any }
) {
  const { conversation_id: param0, ...queryParams } = params;
  return request<null>(`/api/conversations/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
