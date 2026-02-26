interface FetchSSECallbacks {
  onContent: (chunk: string) => void;
  onError: (error: string) => void;
  onComplete: (messageId: string) => void;
}

export async function fetchSSE(
  url: string,
  body: Record<string, unknown>,
  callbacks: FetchSSECallbacks,
  signal?: AbortSignal,
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    // 保留最后一个可能不完整的行
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;

      const payload = trimmed.slice(6);
      if (payload === '[DONE]') return;

      try {
        const data = JSON.parse(payload);
        if (data.error) {
          callbacks.onError(data.error);
        } else if (data.content) {
          callbacks.onContent(data.content);
        } else if (data.message_id) {
          callbacks.onComplete(data.message_id);
        }
      } catch {
        // 忽略无法解析的行
      }
    }
  }
}
