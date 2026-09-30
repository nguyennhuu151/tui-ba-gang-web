import { chatbotApiUrl as API_URL } from "@/lib/site";

// Client gọi backend chatbot — port từ chatbot/frontend/lib/chat.ts, giữ nguyên giao thức SSE của backend.

/** Lỗi HTTP từ backend. `message` là thông báo backend trả về (có thể rỗng) — UI tự hiển thị câu lỗi theo ngôn ngữ. */
export class ChatHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export type ChatEvent =
  | { type: "session"; sessionId: string }
  | { type: "delta"; text: string }
  | { type: "tool"; name: string }
  | { type: "error"; message: string }
  | { type: "done" };

/**
 * Gửi tin nhắn tới backend và đọc câu trả lời dạng Server-Sent Events.
 * Dùng fetch thay vì EventSource vì EventSource không hỗ trợ POST.
 */
export async function streamChat(
  sessionId: string | null,
  message: string,
  onEvent: (e: ChatEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId ?? "", message }),
    signal,
  });

  if (!res.ok || !res.body) {
    let msg = "";
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new ChatHttpError(res.status, msg);
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const evt = parseEvent(raw);
      if (evt) onEvent(evt);
    }
  }
}

function parseEvent(raw: string): ChatEvent | null {
  let event = "";
  let data = "";
  for (const line of raw.split("\n")) {
    if (line.startsWith("event: ")) event = line.slice(7);
    else if (line.startsWith("data: ")) data += line.slice(6);
  }
  let payload;
  try {
    payload = data ? JSON.parse(data) : {};
  } catch {
    return null;
  }
  switch (event) {
    case "session":
      return { type: "session", sessionId: payload.session_id };
    case "delta":
      return { type: "delta", text: payload.text };
    case "tool":
      return { type: "tool", name: payload.name };
    case "error":
      return { type: "error", message: payload.message };
    case "done":
      return { type: "done" };
  }
  return null;
}

export async function resetSession(sessionId: string): Promise<void> {
  await fetch(`${API_URL}/api/sessions/${sessionId}`, { method: "DELETE" }).catch(() => {});
}
