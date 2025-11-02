import React, { useState } from "react";
import { FiPlus, FiSettings, FiSearch } from "react-icons/fi";

export default function ConversationHeader({ onNewChat, onSettings, searchTerm, setSearchTerm, activeTab, setActiveTab }) {
  return (
    <div
      className="flex flex-col gap-4 mb-5 border-b pb-4"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {/* Brand Title */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Deals<span className="text-[var(--accent-color)]">&</span>Wheels
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewChat}
            className="p-2 rounded-full hover:bg-[var(--bg-color)] transition"
            title="Start a new chat"
          >
            <FiPlus size={20} style={{ color: "var(--text-color)" }} />
          </button>
          <button
            onClick={onSettings}
            className="p-2 rounded-full hover:bg-[var(--bg-color)] transition"
            title="Settings"
          >
            <FiSettings size={20} style={{ color: "var(--text-color)" }} />
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
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border outline-none text-sm"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mt-1">
        {["All", "Unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 border-b-2 transition-all font-medium ${
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