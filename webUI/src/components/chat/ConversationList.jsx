// src/pages/chat/ConversationList.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import ConversationHeader from "./ConversationHeader";

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const { access, user } = useAuth();
  const { currentConversation, setCurrentConversation, setMessages } = useChat();
  const API_BASE = "http://127.0.0.1:8000/chat";

  useEffect(() => {
    if (!access) return;
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/conversations/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch conversations.");
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [access]);

  const handleSelect = (conversation) => {
    setCurrentConversation(conversation);
    setMessages([]);
  };

  const handleNewChat = () => alert("Start a new chat modal coming soon!");
  const handleSettings = () => alert("Settings panel coming soon!");

  const renderAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
        style={{ backgroundColor: "var(--accent-color)", flexShrink: 0 }}
      >
        {initial}
      </div>
    );
  };

  const filteredConversations = useMemo(() => {
    let filtered = conversations.filter((c) =>
      c.participants.some((p) =>
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    if (activeTab === "Unread") {
      filtered = filtered.filter((c) => !c.last_message?.read);
    }
    return filtered;
  }, [conversations, searchTerm, activeTab]);

  if (loading) return <p className="px-4 py-6 text-center">Loading conversations...</p>;
  if (error)
    return <p className="px-4 py-6 text-center text-red-500">{error}</p>;
  if (!conversations.length)
    return <p className="px-4 py-6 text-center">No conversations yet.</p>;

  return (
    <div
      className="w-full max-w-md border rounded-xl shadow-lg flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--surface-color)",
        borderColor: "var(--border-color)",
        height: "calc(100vh - 120px)",
        maxHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Header Section */}
      <div
        className="shrink-0 border-b px-4 py-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <ConversationHeader
          onNewChat={handleNewChat}
          onSettings={handleSettings}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Scrollable List */}
      <ul
        className="flex-1 overflow-y-auto space-y-2 px-4 py-3 
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        style={{
          backgroundColor: "var(--surface-color)",
          WebkitOverflowScrolling: "touch", // smooth mobile scroll
        }}
      >
        {filteredConversations.map((convo) => {
          const otherParticipants = convo.participants.filter(
            (p) => p.email !== user?.email
          );
          const lastMsg = convo.last_message;
          const isActive = currentConversation?.id === convo.id;

          return (
            <li
              key={convo.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${
                isActive
                  ? "bg-[var(--highlight-color)] border-l-4 border-[var(--accent-color)]"
                  : "hover:bg-[var(--bg-color)]"
              }`}
              onClick={() => handleSelect(convo)}
            >
              {renderAvatar(otherParticipants[0]?.email || "U")}

              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <span
                  className="font-medium text-sm truncate"
                  style={{ color: "var(--text-color)" }}
                >
                  {otherParticipants.map((p) => p.email).join(", ")}
                </span>
                {lastMsg && (
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {lastMsg.text?.length > 60
                      ? lastMsg.text.slice(0, 60) + "..."
                      : lastMsg.text || "[no text]"}
                  </p>
                )}
              </div>

              {lastMsg && (
                <span
                  className="text-[10px] ml-2 flex-shrink-0"
                  style={{ color: "var(--muted-text)" }}
                >
                  {new Date(lastMsg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}