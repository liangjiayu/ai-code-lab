// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** Create Message POST /api/messages/ */
export async function createMessage(
  body: API.MessageCreate,
  options?: { [key: string]: any }
) {
  return request<API.MessageOut | null>("/api/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Message GET /api/messages/${param0} */
export async function getMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMessageParams,
  options?: { [key: string]: any }
) {
  const { message_id: param0, ...queryParams } = params;
  return request<API.MessageOut | null>(`/api/messages/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update Message PUT /api/messages/${param0} */
export async function updateMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMessageParams,
  body: API.MessageUpdate,
  options?: { [key: string]: any }
) {
  const { message_id: param0, ...queryParams } = params;
  return request<API.MessageOut | null>(`/api/messages/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete Message DELETE /api/messages/${param0} */
export async function deleteMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMessageParams,
  options?: { [key: string]: any }
) {
  const { message_id: param0, ...queryParams } = params;
  return request<null>(`/api/messages/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get Messages GET /api/messages/conversation/${param0} */
export async function getMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMessagesParams,
  options?: { [key: string]: any }
) {
  const { conversation_id: param0, ...queryParams } = params;
  return request<API.MessageOut[] | null>(
    `/api/messages/conversation/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
