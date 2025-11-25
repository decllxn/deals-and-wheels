// src/pages/chat/Chat.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, MessageCircle, ArrowLeft } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { ChatProvider, useChat } from "../../context/ChatContext";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";

export default function Chat({ setShowAuthModal, setIsSignUp }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <ChatContent
          setShowAuthModal={setShowAuthModal}
          setIsSignUp={setIsSignUp}
        />
      </ChatProvider>
    </AuthProvider>
  );
}

function ChatContent({ setShowAuthModal, setIsSignUp }) {
  const { isAuthenticated, loading } = useAuth();
  const { currentConversation, setCurrentConversation } = useChat();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--muted-text)] text-lg font-medium"
        >
          Loading chat...
        </motion.div>
      </div>
    );

  if (!isAuthenticated)
    return (
      <CenteredFallback
        title="Sign in to chat"
        description="Access your messages and connect with dealers or buyers in real time."
        icon={<LogIn className="w-6 h-6 text-[var(--accent-color)]" />}
        buttonText="Sign In to Chat"
        onButtonClick={() => {
          setIsSignUp(false);
          setShowAuthModal(true);
        }}
      />
    );

  // 💬 Responsive layout
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 mt-10">
      {/* Mobile View Logic */}
      {isMobile ? (
        <>
          {!currentConversation ? (
            <ConversationList />
          ) : (
            <div className="relative w-full">
              {/* Back Button */}
              <button
                onClick={() => setCurrentConversation(null)}
                className="absolute top-4 left-3 z-10 bg-[var(--bg-color)] p-2 rounded-full shadow-md hover:bg-[var(--surface-color)] transition"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--text-color)]" />
              </button>
              <MessageThread />
            </div>
          )}
        </>
      ) : (
        // Desktop layout: side-by-side
        <>
          <div className="md:w-1/3">
            <ConversationList />
          </div>
          <div className="md:w-2/3 flex-1">
            <MessageThread />
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------
   📦 Shared fallback (matches Dashboard design)
--------------------------------------------- */
function CenteredFallback({ title, description, icon, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-center items-center h-[70vh] px-4">
      <GlassPanel
        className="max-w-md w-full text-center p-8 rounded-2xl border border-[var(--border-color)] 
                   bg-[var(--surface-color)]/80 shadow-[0_4px_16px_var(--shadow-color)] backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center space-y-5"
        >
          <div className="p-3 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center">
            {icon || <MessageCircle className="w-6 h-6 text-[var(--accent-color)]" />}
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-color)]">{title}</h2>
          <p className="text-[var(--muted-text)] text-sm leading-relaxed max-w-sm">
            {description}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onButtonClick}
            className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white 
                       bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] 
                       shadow-md hover:shadow-lg transition"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </GlassPanel>
    </div>
  );
}