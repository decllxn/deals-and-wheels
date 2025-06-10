import React from "react";
import { Car } from "lucide-react";

const topListingsData = [
  { name: "Toyota Camry", views: 300, inquiries: 75, daysToSell: 10, bids: 50 },
  { name: "Honda Accord", views: 250, inquiries: 60, daysToSell: 7, bids: 35 },
  { name: "Ford Mustang", views: 450, inquiries: 100, daysToSell: 5, bids: 120 },
  { name: "Chevrolet Impala", views: 200, inquiries: 50, daysToSell: 12, bids: 25 },
];

const TopVehicleListingsTable = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <Car />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          🚗 Top Performing Listings
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Most viewed and engaged listings.
        </p>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--border)] text-sm text-left">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold text-[var(--text)] uppercase tracking-wider">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-[var(--text)] uppercase tracking-wider">
              Views
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-[var(--text)] uppercase tracking-wider">
              Inquiries
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-[var(--text)] uppercase tracking-wider">
              Days to Sell
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-[var(--text)] uppercase tracking-wider">
              Bids
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--bg)] divide-y divide-[var(--border)]">
          {topListingsData.map((item, idx) => (
            <tr
              key={idx}
              className={`hover:bg-[var(--bg-secondary)] transition-colors duration-200 ${
                idx % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--bg-secondary)]"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.views}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.inquiries}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.daysToSell}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                {item.bids}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TopVehicleListingsTable;