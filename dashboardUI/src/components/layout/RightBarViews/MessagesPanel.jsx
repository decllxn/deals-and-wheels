export default function MessagesPanel() {
    return (
      <div>
        <h2 className="font-bold text-lg mb-2">Messages</h2>
        <div className="space-y-3">
          <div className="p-3 bg-[var(--card)] rounded-md shadow">
            <p className="font-semibold">Jane Doe</p>
            <p className="text-sm text-[var(--text-muted)]">Hey! Let’s sync up tomorrow.</p>
          </div>
          <div className="p-3 bg-[var(--card)] rounded-md shadow">
            <p className="font-semibold">John Smith</p>
            <p className="text-sm text-[var(--text-muted)]">Can you review the sales report?</p>
          </div>
        </div>
      </div>
    );
  }
  