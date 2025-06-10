import React from "react";

const topListings = [
  {
    id: 1,
    title: "2023 Toyota Hilux SR5",
    views: 2123,
    inquiries: 189,
    bids: 12,
    timeToSale: "2 days",
  },
  {
    id: 2,
    title: "Genuine Toyota Oil Filter",
    views: 1043,
    inquiries: 58,
    bids: 0,
    timeToSale: "1 day",
  },
  {
    id: 3,
    title: "2022 BMW X6 M",
    views: 3189,
    inquiries: 212,
    bids: 25,
    timeToSale: "6 hours",
  },
];

export default function TopPerformingListings() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">🏆 Top Performing Listings</h2>
      <div className="space-y-3">
        {topListings.map((item) => (
          <div key={item.id} className="bg-[var(--bg-secondary)] p-4 rounded-xl flex justify-between items-center hover:shadow-lg transition">
            <div>
              <h3 className="text-[var(--text)] font-semibold">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">Views: {item.views} • Inquiries: {item.inquiries} • Bids: {item.bids}</p>
            </div>
            <div className="text-sm text-[var(--accent)] font-bold">{item.timeToSale}</div>
          </div>
        ))}
      </div>
    </div>
  );
}