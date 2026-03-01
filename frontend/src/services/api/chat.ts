// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

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

/** Edit Completion POST /api/chat/edit_completion */
export async function editCompletion(
  body: API.EditCompletionRequest,
  options?: { [key: string]: any }
) {
  return request<any>("/api/chat/edit_completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Generate Title POST /api/chat/generate_title */
export async function generateTitle(
  body: API.GenerateTitleRequest,
  options?: { [key: string]: any }
) {
  return request<any>("/api/chat/generate_title", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retry Completion POST /api/chat/retry_completion */
export async function retryCompletion(
  body: API.RetryCompletionRequest,
  options?: { [key: string]: any }
) {
  return request<any>("/api/chat/retry_completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
