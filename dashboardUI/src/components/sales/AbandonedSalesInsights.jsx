// AbandonedSalesInsights.jsx
import React from 'react';

const abandonedUsers = [
  { name: 'Carlos M.', action: 'Added to Watchlist', car: 'Toyota Prado', lastActive: '2h ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Lilian O.', action: 'Viewed & Left', car: 'Nissan Navara', lastActive: '4h ago', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Samuel K.', action: 'Started Checkout', car: 'Mercedes C-Class', lastActive: '6h ago', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Patricia L.', action: 'Added to Cart', car: 'Audi A4', lastActive: '8h ago', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'George B.', action: 'Viewed & Left', car: 'Ford Mustang', lastActive: '10h ago', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export default function AbandonedSalesInsights() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-6">❌ Abandoned Sales</h2>
      <div className="space-y-4">
        {abandonedUsers.map((user, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-[var(--border)]">
            <div className="flex items-center">
              <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="text-[var(--text)] font-medium">{user.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{user.action} – {user.car}</p>
              </div>
            </div>
            <button className="text-xs px-3 py-1 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition">
              Send Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}