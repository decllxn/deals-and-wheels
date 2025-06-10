import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Settings } from "lucide-react";
import ToDoPanel from "./RightBarViews/ToDoPanel";
import MessagesPanel from "./RightBarViews/MessagesPanel";
import SettingsPanel from "./RightBarViews/SettingsPanel";

export default function RightBar({ isOpen, isMobile, onClose }) {
  const [activeTab, setActiveTab] = useState("todo");
  const panelRef = useRef();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, isMobile]);

  const renderPanel = () => {
    switch (activeTab) {
      case "todo":
        return <ToDoPanel />;
      case "messages":
        return <MessagesPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[var(--overlay)] backdrop-blur-xs z-40"
          onClick={onClose}
        />
      )}

      <motion.div
        ref={panelRef}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-80 z-50 bg-[var(--bg)] text-[var(--text)] shadow-lg flex flex-col"
      >
        {/* Mini Navbar */}
        <div className="flex items-center justify-around border-b border-[var(--border)] p-3">
          <button onClick={() => setActiveTab("todo")} className="hover:text-[var(--accent)]">
            <ClipboardList className="w-6 h-6" />
          </button>
          <button onClick={() => setActiveTab("messages")} className="hover:text-[var(--accent)]">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button onClick={() => setActiveTab("settings")} className="hover:text-[var(--accent)]">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{renderPanel()}</div>
      </motion.div>
    </>
  );
}