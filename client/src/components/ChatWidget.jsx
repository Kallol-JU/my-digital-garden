import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi there! I'm Kallol's personal assistant. While he's away from the keyboard, you can ask me anything about his experience, ongoing projects, or background. What would you like to know?",
    },
  ]);

  const widgetRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query.trim();
    setQuery("");

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const formattedHistory = messages.slice(1).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          message: userText,
          history: formattedHistory,
        },
      );

      setMessages([
        ...newMessages,
        { role: "model", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "model",
          text: "Oops, my connection dropped. Please try again in a moment!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-fade-in">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-5 py-4 flex justify-between items-center z-10">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm tracking-wide">
                Garden's Guide Ai
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Ask about Kallol</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-full hover:bg-gray-50"
            >
              ✕
            </button>
          </div>

          {/* Message History Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-[#fafafa] space-y-5 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 text-[14px] leading-relaxed max-w-[85%] shadow-sm ${
                    msg.role === "user"
                      ? "bg-gray-900 text-white rounded-2xl rounded-tr-sm"
                      : "bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {/* 2. Conditionally render markdown for the AI, plain text for the user */}
                  {msg.role === "user" ? (
                    msg.text
                  ) : (
                    <div className="space-y-2 [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:ml-4 [&>li]:mb-1 [&>strong]:font-semibold [&>strong]:text-gray-900">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-tl-sm px-5 py-3 text-[14px] shadow-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-50">
            <form className="flex gap-2 relative" onSubmit={handleSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-[#fafafa] border border-gray-200 rounded-full pl-5 pr-12 py-3 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 placeholder-gray-400 shadow-inner"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-gray-900 text-white rounded-full aspect-square flex items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                ↑
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Tree Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center gap-2 rounded-full transition-all duration-300 transform shadow-md border hover:shadow-lg hover:-translate-y-1 ${
          isOpen
            ? "w-12 h-12 bg-white text-gray-500 border-gray-200" // Collapses to a circle when open
            : "px-5 py-2.5 bg-white text-gray-800 border-gray-100" // Expands to a pill when closed
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className="text-xl">↓</span>
        ) : (
          <>
            <span className="text-lg group-hover:animate-pulse">🌳</span>
            <span className="text-sm font-medium pr-1">Ask my AI</span>
          </>
        )}
      </button>
    </div>
  );
}
