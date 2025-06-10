import React from "react";

const recentBids = [
  { id: 1, user: "J. Kihara", car: "2022 Land Cruiser", bid: "$45,500", time: "2 min ago" },
  { id: 2, user: "A. Mwangi", car: "2019 Range Rover", bid: "$38,200", time: "5 min ago" },
  { id: 3, user: "S. Otieno", car: "2020 GLE 450", bid: "$52,600", time: "12 min ago" },
];

export default function BidActivityFeed() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-5 shadow-md h-full">
      <h3 className="text-lg font-semibold text-[var(--text)] mb-4">📈 Bid Activity Feed</h3>
      <ul className="space-y-3">
        {recentBids.map((bid) => (
          <li key={bid.id} className="bg-[var(--bg-secondary)] p-3 rounded-xl hover:shadow transition">
            <div className="text-[var(--text)] font-medium">{bid.user} placed a bid</div>
            <div className="text-sm text-[var(--text-muted)]">{bid.car}</div>
            <div className="text-[var(--accent)] font-bold">{bid.bid}</div>
            <div className="text-xs text-[var(--text-muted)]">{bid.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}