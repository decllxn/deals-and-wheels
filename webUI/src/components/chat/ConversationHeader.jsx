import React from "react";
import { FiPlus, FiSettings, FiSearch } from "react-icons/fi";

export default function ConversationHeader({
  onNewChat,
  onSettings,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          <span className="text-[var(--accent-color)]">Zamara</span>
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewChat}
            className="p-1.5 rounded-full hover:bg-[var(--bg-color)] transition"
            title="Start a new chat"
          >
            <FiPlus size={18} style={{ color: "var(--text-color)" }} />
          </button>
          <button
            onClick={onSettings}
            className="p-1.5 rounded-full hover:bg-[var(--bg-color)] transition"
            title="Settings"
          >
            <FiSettings size={18} style={{ color: "var(--text-color)" }} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          style={{ color: "var(--muted-text)" }}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-md border text-sm outline-none"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 text-sm">
        {["All", "Unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-0.5 border-b-2 font-medium transition-all ${
              activeTab === tab
                ? "border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border-transparent text-[var(--muted-text)] hover:text-[var(--text-color)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}