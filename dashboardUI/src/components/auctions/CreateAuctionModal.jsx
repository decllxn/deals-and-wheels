import React, { useState } from "react";

export default function CreateAuctionModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Trigger Card */}
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer border border-dashed border-[var(--accent)] rounded-2xl p-6 bg-[var(--bg-secondary)] hover:bg-[var(--bg)] hover:shadow transition"
      >
        <div className="text-center">
          <div className="text-4xl mb-2 text-[var(--accent)]">➕</div>
          <h3 className="font-semibold text-[var(--text)]">Create New Auction</h3>
          <p className="text-sm text-[var(--text-muted)]">Tap to list a new car auction</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-[var(--bg)] rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4">🚀 Launch New Auction</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Car Title"
                className="w-full p-2 border rounded bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text)]"
              />
              <input
                type="number"
                placeholder="Starting Bid ($)"
                className="w-full p-2 border rounded bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text)]"
              />
              <input
                type="file"
                className="w-full p-2 border rounded bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text)]"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Create Auction
              </button>
              <button
                type="button"
                className="text-[var(--text-muted)] text-sm hover:underline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}