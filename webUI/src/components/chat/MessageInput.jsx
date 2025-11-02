import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Send, XCircle } from "lucide-react";

export default function MessageInput({
  conversationId,
  quotedMessage,
  clearQuotedMessage,
  onMessageSent,
  ws,
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const { access } = useAuth();
  const API_BASE = "http://127.0.0.1:8000/chat";

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    const payload = {
      conversation_id: conversationId,
      text,
      quoted_message_id: quotedMessage?.id || null,
    };

    try {
      setSending(true);

      // REST POST for reliability
      const res = await axios.post(`${API_BASE}/messages/send/`, payload, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const newMsg = res.data;

      // WebSocket optional dispatch
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(newMsg));
      }

      onMessageSent(newMsg);
      setText("");
      clearQuotedMessage();
    } catch (err) {
      console.error("Failed to send message:", err.response?.data || err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="flex flex-col border-t pt-3 mt-auto"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--surface-color)",
      }}
    >
      {/* Quoted Message Preview */}
      {quotedMessage && (
        <div
          className="flex items-start justify-between rounded-lg p-2 mb-2"
          style={{
            backgroundColor: "var(--highlight-color)",
            color: "var(--text-color)",
          }}
        >
          <div className="flex-1 text-sm italic truncate">
            Replying to: {quotedMessage.text.slice(0, 100)}
          </div>
          <button
            onClick={clearQuotedMessage}
            className="ml-2 hover:opacity-80 transition"
          >
            <XCircle size={18} style={{ color: "var(--accent-color)" }} />
          </button>
        </div>
      )}

      {/* Input Field & Send Button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={sending}
          className="flex-1 rounded-full px-4 py-2 text-sm shadow-sm transition-all duration-200 focus:ring-2 outline-none"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            border: `1px solid var(--border-color)`,
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        />

        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center justify-center rounded-full p-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
          style={{
            backgroundColor: sending
              ? "var(--muted-text)"
              : "var(--accent-color)",
            color: "#fff",
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}