import { useState, useRef, useEffect } from "react";
import {
  FiMessageSquare as MessageSquare,
  FiX as X,
  FiSend as Send,
} from "react-icons/fi";
import MinBot from "../assets/min-bot.webp";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo, Ada yang bisa mimin bantu?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Automatically scroll to the bottom of the chat when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate an automated bot response after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Tunggu sebentar ya, mimin sedang mencari informasi untuk kamu",
          isBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
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
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.isBot
                      ? "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                      : "bg-[rgb(50,160,140)] text-white rounded-br-none"
                  }`}
                >
                  {msg.text}
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
              placeholder="Ketik pesan..."
              className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(50,160,140)] text-white hover:bg-[rgb(38,126,110)] active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none"
              disabled={!inputValue.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-gray-800 rotate-90"
            : "bg-[rgb(50,160,140)] hover:bg-[rgb(38,126,110)]"
        }`}
        aria-label="Toggle chat grid"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
