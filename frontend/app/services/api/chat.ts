// @ts-ignore
/* eslint-disable */
import request from "~/lib/request";

/** Chat Completions POST /api/chat/completions */
export async function chatCompletions(
  body: API.ChatRequest,
  options?: { [key: string]: any }
) {
  return request<any>("/api/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
