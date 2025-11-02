import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import { ChatProvider } from "../../context/ChatContext";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";

export default function Chat() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="flex flex-col md:flex-row p-4 gap-4 mt-30">
          <div className="md:w-1/3">
            <ConversationList />
          </div>
          <div className="md:w-2/3 flex-1">
            <MessageThread />
          </div>
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}