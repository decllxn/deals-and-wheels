import React from "react";

const auctions = [
  {
    id: 101,
    title: "2022 Land Cruiser",
    status: "Live",
    bids: 18,
    highestBid: "$45,500",
    dealer: "Luxury Motors",
    startDate: "2023-11-15",
    endDate: "2023-11-22",
  },
  {
    id: 102,
    title: "2019 Range Rover",
    status: "Ended",
    bids: 12,
    highestBid: "$38,200",
    dealer: "Prestige Autos",
    startDate: "2023-11-01",
    endDate: "2023-11-08",
  },
  {
    id: 103,
    title: "2020 GLE 450",
    status: "Live",
    bids: 21,
    highestBid: "$52,600",
    dealer: "Elite Cars",
    startDate: "2023-11-18",
    endDate: "2023-11-25",
  },
  // Add more auction data as needed
];

export default function AuctionManagementTable() {
  return (
    <div className="bg-[var(--bg)] rounded-3xl p-8 shadow-lg overflow-x-auto">
      <h3 className="text-2xl font-semibold text-[var(--text)] mb-6">
        🛠️ Auction Management
      </h3>
      <table className="min-w-full divide-y divide-[var(--border)]">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Auction
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Dealer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Bids
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Highest Bid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              End Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--bg)] divide-y divide-[var(--border)]">
          {auctions.map((auction) => (
            <tr key={auction.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text)]">
                {auction.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                {auction.dealer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    auction.status === "Live"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {auction.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                {auction.bids}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[var(--accent)]">
                {auction.highestBid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                {auction.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                {auction.endDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}