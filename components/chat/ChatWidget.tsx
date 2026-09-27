"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { resetSession, streamChat } from "@/lib/chat";

/**
 * ChatWidget — nút mở chat + khung chat với trợ lý ảo (backend: chatbot/backend).
 * Logic port từ chatbot/frontend/components/ChatWidget.tsx, giao diện viết lại bằng
 * Tailwind theo design token của site. Nằm trong cụm nút nổi của StickyContactWidget
 * (trên nút Zalo/Gọi) để các nút góc màn hình không đè nhau.
 * Chỉ đọc dữ liệu, không tạo booking — xem chatbot/README.md.
 */

type Message = { id: string; role: "user" | "assistant"; text: string; error?: boolean };

const SESSION_KEY = "tbg_chat_session";
const MESSAGES_KEY = "tbg_chat_messages";

const TOOL_LABELS: Record<string, string> = {
  list_room_types: "Đang xem danh sách phòng…",
  check_availability: "Đang kiểm tra phòng trống…",
};

const SUGGESTIONS = [
  "Khách sạn có những loại phòng nào?",
  "Cuối tuần này còn phòng cho 2 người không?",
  "Giờ nhận và trả phòng là mấy giờ?",
  "Chính sách huỷ phòng thế nào?",
];

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "Xin chào! Mình là trợ lý ảo của **Túi Ba Gang**. Mình có thể giúp bạn tra cứu phòng, giá và chính sách lưu trú.",
};

function uid() {
  return Math.random().toString(36).slice(2);
}

function load<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 3 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 8.5h8M8 11.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  // Panel chỉ render khi mở (luôn đóng lúc SSR) nên đọc localStorage ngay khi khởi tạo
  // không gây lệch hydration.
  const [messages, setMessages] = useState<Message[]>(() => load<Message[]>(MESSAGES_KEY) ?? [WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const sessionRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    sessionRef.current = load<string>(SESSION_KEY);
  }, []);

  useEffect(() => {
    if (!busy) save(MESSAGES_KEY, messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy, status, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onEsc = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  async function send(text: string) {
    text = text.trim();
    if (!text || busy) return;

    const botId = uid();
    setMessages((m) => [...m, { id: uid(), role: "user", text }, { id: botId, role: "assistant", text: "" }]);
    setInput("");
    setBusy(true);
    setStatus("Đang soạn trả lời…");

    const patchBot = (fn: (msg: Message) => Message) =>
      setMessages((m) => m.map((msg) => (msg.id === botId ? fn(msg) : msg)));

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await streamChat(
        sessionRef.current,
        text,
        (e) => {
          switch (e.type) {
            case "session":
              sessionRef.current = e.sessionId;
              save(SESSION_KEY, e.sessionId);
              break;
            case "delta":
              setStatus(null);
              patchBot((msg) => ({ ...msg, text: msg.text + e.text }));
              break;
            case "tool":
              setStatus(TOOL_LABELS[e.name] ?? "Đang tra cứu…");
              break;
            case "error":
              patchBot((msg) => ({ ...msg, text: msg.text ? `${msg.text}\n\n${e.message}` : e.message, error: true }));
              break;
          }
        },
        controller.signal,
      );
    } catch (err) {
      if (!controller.signal.aborted) {
        const message =
          err instanceof TypeError
            ? "Không kết nối được trợ lý ảo. Vui lòng thử lại sau hoặc liên hệ hotline/Zalo."
            : err instanceof Error
              ? err.message
              : "Không kết nối được máy chủ.";
        patchBot((msg) => ({ ...msg, text: message, error: true }));
      }
    } finally {
      setBusy(false);
      setStatus(null);
      abortRef.current = null;
    }
  }

  async function newConversation() {
    abortRef.current?.abort();
    if (sessionRef.current) await resetSession(sessionRef.current);
    sessionRef.current = null;
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(MESSAGES_KEY);
    } catch {}
    setMessages([WELCOME]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {open && (
        <section
          id="tbg-chat-panel"
          aria-label="Chat với trợ lý Túi Ba Gang"
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-2xl bg-cream-50 text-ink shadow-2xl md:inset-x-auto md:bottom-6 md:right-24 md:h-[min(600px,calc(100dvh-7rem))] md:w-[380px] md:rounded-2xl"
        >
          <header className="flex items-center justify-between bg-brown-800 px-5 py-4 text-cream-50">
            <div>
              <p className="font-heading text-lg leading-tight">Trợ lý Túi Ba Gang</p>
              <p className="text-xs text-cream-50/70">Thường trả lời trong vài giây</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={newConversation}
                title="Cuộc trò chuyện mới"
                aria-label="Cuộc trò chuyện mới"
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 10a6 6 0 1 0 1.8-4.3M4 3.5v3h3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                title="Đóng"
                aria-label="Đóng chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                <CloseIcon />
              </button>
            </div>
          </header>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((m) =>
              m.role === "assistant" && !m.text ? null : (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end rounded-br-sm bg-brown-800 text-cream-50"
                      : m.error
                        ? "self-start rounded-bl-sm border border-ember-accent/30 bg-ember-accent/5 text-ember-accent"
                        : "self-start rounded-bl-sm bg-cream-200/70 text-ink"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="[&>*+*]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_a]:underline">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.text}</span>
                  )}
                </div>
              ),
            )}

            {status && (
              <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-sm bg-cream-200/70 px-4 py-2.5 text-sm text-brown-600">
                <span className="flex gap-1" aria-hidden="true">
                  <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brown-600 [animation-delay:-0.3s]" />
                  <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brown-600 [animation-delay:-0.15s]" />
                  <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brown-600" />
                </span>
                {status}
              </div>
            )}

            {messages.length === 1 && !busy && (
              <div className="mt-1 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-brown-600/30 px-3 py-1.5 text-left text-xs text-brown-800 transition-colors hover:border-brown-800 hover:bg-cream-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-cream-200 bg-cream-50 p-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nhập câu hỏi của bạn…"
              rows={1}
              maxLength={2000}
              aria-label="Tin nhắn"
              className="max-h-32 flex-1 resize-none rounded-xl border border-cream-200 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-brown-600/60 focus:border-brown-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-xl bg-brown-800 px-4 py-2.5 text-sm font-medium text-cream-50 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Gửi
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng chat" : "Chat với trợ lý ảo"}
        aria-expanded={open}
        aria-controls="tbg-chat-panel"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-50 text-brown-800 shadow-lg ring-1 ring-brown-800/15 transition-transform hover:scale-105"
      >
        {open ? <CloseIcon size={20} /> : <ChatIcon />}
      </button>
    </>
  );
}
