import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import MessageInput from "./MessageInput";
import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";

export default function MessageThread() {
  const { access, user } = useAuth();
  const {
    currentConversation,
    messages,
    setMessages,
    addMessage,
    quotedMessage,
    setQuotedMessage,
    clearQuotedMessage,
  } = useChat();

  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const API_BASE = "http://127.0.0.1:8000/chat";

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!access || !currentConversation) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/messages/${currentConversation.id}/`,
          { headers: { Authorization: `Bearer ${access}` } }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        scrollToBottom();
      }
    };

    fetchMessages();
  }, [access, currentConversation, setMessages]);

  // WebSocket connection
  useEffect(() => {
    if (!access || !currentConversation) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://${window.location.host}/ws/chat/${currentConversation.id}/?token=${access}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addMessage(data);
      scrollToBottom();
    };

    wsRef.current.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [currentConversation, access, addMessage]);

  if (!currentConversation)
    return (
      <div
        className="flex items-center justify-center h-full text-center text-lg font-medium"
        style={{ color: "var(--muted-text)" }}
      >
        Select a conversation to start chatting 💬
      </div>
    );

  const chatPartner =
    currentConversation.participants.find((p) => p.email !== user?.email) || {};

  return (
    <div
      className="flex flex-col h-full rounded-xl shadow-lg border overflow-hidden"
      style={{
        backgroundColor: "var(--surface-color)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 border-b shrink-0"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg-color)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-sm font-medium"
          style={{
            backgroundColor: "var(--accent-color)",
            color: "#fff",
          }}
        >
          {chatPartner?.email ? chatPartner.email.charAt(0).toUpperCase() : <FiUser />}
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-base" style={{ color: "var(--text-color)" }}>
            {chatPartner.email || "Unknown User"}
          </h2>
          <span className="text-xs" style={{ color: "var(--muted-text)" }}>
            Active now
          </span>
        </div>
      </div>

      {/* Scrollable message area */}
      <div
        className="flex-1 p-4 overflow-y-scroll hide-scrollbar flex flex-col space-y-2"
        style={{
          backgroundColor: "var(--surface-color)",
        }}
      >
        <AnimatePresence>
          {messages.map((msg) => {
            const isMine = msg.sender?.email === user?.email;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm shadow-sm ${
                    isMine
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                  style={{
                    backgroundColor: isMine
                      ? "var(--accent-color)"
                      : "var(--highlight-color)",
                    color: isMine ? "#fff" : "var(--text-color)",
                    alignSelf: isMine ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area (fixed at bottom) */}
      <div
        className="border-t p-3 shrink-0"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg-color)",
        }}
      >
        <MessageInput
          conversationId={currentConversation.id}
          quotedMessage={quotedMessage}
          clearQuotedMessage={clearQuotedMessage}
          onMessageSent={addMessage}
          ws={wsRef.current}
        />
      </div>
    </div>
  );
}