import React from "react";

const dealerData = [
  { dealer: "John's Auto", listings: 45, updates: "2 days ago", status: "Active" },
  { dealer: "Premium Cars", listings: 10, updates: "15 days ago", status: "Inactive" },
  { dealer: "Luxury Motors", listings: 30, updates: "1 week ago", status: "Active" },
  { dealer: "Fast Cars", listings: 18, updates: "3 days ago", status: "Active" },
];

const DealerListingsOverview = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        🧑‍💼
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          Dealer Activity Overview
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Overview of dealer listings and activity.
        </p>
      </div>
    </div>
    <div className="overflow-x-auto"> {/* Added for responsive table */}
      <table className="min-w-full divide-y divide-[var(--border)] text-sm text-left">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium text-[var(--text)] uppercase tracking-wider">
              Dealer
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-[var(--text)] uppercase tracking-wider">
              Listings
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-[var(--text)] uppercase tracking-wider">
              Last Update
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-[var(--text)] uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--bg)] divide-y divide-[var(--border)]">
          {dealerData.map((item, idx) => (
            <tr key={idx} className="hover:bg-[var(--bg-secondary)] transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.dealer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.listings}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text-muted)]">
                {item.updates}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DealerListingsOverview;