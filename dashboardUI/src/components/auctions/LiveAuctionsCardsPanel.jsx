import React from "react";

const auctions = [
  {
    id: 1,
    title: "2022 Toyota Land Cruiser VXR",
    currentBid: "$45,000",
    image: "/images/landcruiser.jpg",
    timeLeft: "2h 15m",
  },
  {
    id: 2,
    title: "2019 Range Rover Sport SE",
    currentBid: "$38,000",
    image: "/images/rangerover.jpg",
    timeLeft: "1h 42m",
  },
  {
    id: 3,
    title: "2020 Mercedes-Benz GLE 450",
    currentBid: "$52,300",
    image: "/images/gle.jpg",
    timeLeft: "3h 01m",
  },
];

export default function LiveAuctionCardsPanel() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">Featured Auctions</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-[var(--bg-secondary)]"
          >
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-[var(--text)] font-semibold">{auction.title}</h3>
              <p className="text-[var(--accent)] font-bold">{auction.currentBid}</p>
              <div className="text-sm text-[var(--text-muted)]">
                ⏱ {auction.timeLeft} left
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
