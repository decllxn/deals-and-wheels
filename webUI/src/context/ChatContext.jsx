import React, { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [quotedMessage, setQuotedMessage] = useState(null);

  // Add new message to messages list
  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  // Clear quoted message
  const clearQuotedMessage = useCallback(() => {
    setQuotedMessage(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentConversation,
        setCurrentConversation,
        messages,
        setMessages,
        addMessage,
        quotedMessage,
        setQuotedMessage,
        clearQuotedMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook for easy access
export const useChat = () => useContext(ChatContext);