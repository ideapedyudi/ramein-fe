import { useEffect, useRef, useState } from "react";
import {
  FiX as X,
  FiSend as Send,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MinBot from "../assets/min-bot.webp";
import { apiRequest } from "../lib/http";

export default function FloatingChat() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo, Ada yang bisa mimin bantu?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimersRef = useRef([]);

  // Automatically scroll to the bottom of the chat when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      typingTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      typingTimersRef.current = [];
    };
  }, []);

  const formatEventDate = (date) => {
    if (!date) return "Tanggal belum tersedia";

    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const handleOpenEvent = (eventId) => {
    if (!eventId) return;

    navigate(`/event/${eventId}`);
  };

  const startTypingReply = (messageId, reply, events = []) => {
    const safeReply =
      reply?.trim() || "Maaf, balasan dari mimin lagi kosong. Coba kirim lagi ya.";

    const typeNextCharacter = (index) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                text: safeReply.slice(0, index),
                isPending: false,
                showEvents: index >= safeReply.length,
                events: index >= safeReply.length ? events : msg.events,
              }
            : msg
        )
      );

      if (index >= safeReply.length) {
        return;
      }

      const timer = window.setTimeout(() => typeNextCharacter(index + 1), 18);
      typingTimersRef.current.push(timer);
    };

    typeNextCharacter(1);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || isSending) return;

    const userMessage = {
      id: Date.now(),
      text: trimmedMessage,
      isBot: false,
    };
    const botMessageId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: botMessageId,
        text: "",
        isBot: true,
        isPending: true,
      },
    ]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await apiRequest("/event-chat", {
        method: "POST",
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const chatData = response?.data ?? response;
      const reply = chatData?.reply;
      const events = Array.isArray(chatData?.events) ? chatData.events : [];

      startTypingReply(botMessageId, reply, events);
    } catch (error) {
      startTypingReply(
        botMessageId,
        error instanceof Error
          ? error.message
          : "Terjadi kendala saat menghubungi mimin. Coba lagi ya."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end font-sans md:bottom-16">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="mb-4 flex h-112.5 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 transition-all duration-300 ease-in-out md:w-96">
          {/* Header */}
          <div className="flex items-center justify-between bg-[rgb(50,160,140)] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <img src={MinBot} alt="MinBot" className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-semibold text-sm">Mimin</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-[rgb(38,126,110)] transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.isBot
                      ? "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                      : "bg-[rgb(50,160,140)] text-white rounded-br-none"
                  }`}
                >
                  {msg.isPending ? (
                    <span className="text-gray-400">Mimin sedang mengetik...</span>
                  ) : (
                    <>
                      <div className="whitespace-pre-line">{msg.text}</div>
                      {msg.showEvents && msg.events?.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.events.map((event) => (
                            <button
                              key={event.id}
                              type="button"
                              onClick={() => handleOpenEvent(event.id)}
                              className="w-full rounded-xl border border-teal-100 bg-teal-50 p-3 text-left transition hover:border-[rgb(50,160,140)] hover:bg-teal-100"
                            >
                              <p className="font-semibold text-gray-900">
                                {event.title || "Event tanpa judul"}
                              </p>
                              <p className="mt-1 text-xs text-gray-600">
                                {event.category_name || "Kategori belum tersedia"} • {event.city_name || "Kota belum tersedia"}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {formatEventDate(event.start_datetime)}
                              </p>
                              <p className="mt-2 text-xs font-semibold text-[rgb(50,160,140)]">
                                Lihat detail event
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isSending ? "Tunggu jawaban mimin..." : "Ketik pesan..."}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(50,160,140)]"
              disabled={isSending}
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(50,160,140)] text-white hover:bg-[rgb(38,126,110)] active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none"
              disabled={!inputValue.trim() || isSending}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="cursor-pointer rounded-full border border-[rgb(50,160,140)] bg-white px-3 py-1.5 text-xs font-semibold text-[rgb(50,160,140)] shadow-md">
            Tanya Mimin
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-[rgb(50,160,140)] shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen
              ? "rotate-90 bg-gray-800 text-white"
              : "bg-white hover:border-[rgb(38,126,110)]"
          }`}
          aria-label="Toggle chat grid"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <img src={MinBot} alt="Mimin AI" className="h-full w-full object-cover" />
          )}
        </button>
      </div>
    </div>
  );
}
