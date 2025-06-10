import React, { useState } from "react";

export default function CreateAuctionWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border-2 border-dashed border-[var(--accent)] rounded-2xl p-6 bg-[var(--bg-secondary)] hover:shadow-md hover:bg-[var(--bg)] transition"
      >
        <div className="text-center space-y-1">
          <div className="text-5xl text-[var(--accent)]">➕</div>
          <h3 className="font-semibold text-[var(--text)]">Create Auction</h3>
          <p className="text-sm text-[var(--text-muted)]">
            Instantly list a new vehicle for auction
          </p>
        </div>
      </div>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-[var(--bg)] p-6 rounded-2xl w-full max-w-xl shadow-xl relative">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4">🚀 New Auction</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Car Title"
                className="w-full p-2 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)]"
              />
              <input
                type="number"
                placeholder="Starting Bid ($)"
                className="w-full p-2 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)]"
              />
              <input
                type="file"
                className="w-full p-2 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[var(--accent)] text-white py-2 px-4 rounded hover:opacity-90 transition"
                >
                  Launch Auction
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-[var(--text-muted)] underline hover:text-[var(--text)]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
