import React from "react";

const data = [
  { name: "Brake Pads", views: 1450, inquiries: 230, orders: 130, daysToSell: 4 },
  { name: "Oil Filter", views: 920, inquiries: 180, orders: 115, daysToSell: 5 },
  { name: "Spark Plugs", views: 870, inquiries: 170, orders: 100, daysToSell: 3 },
];

const TopSparePartsTable = () => (
  <div className="bg-[--bg-secondary] p-6 rounded-xl shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-[--text]">🏆 Top Spare Parts</h2>
    <table className="w-full text-left text-[--text]">
      <thead>
        <tr className="border-b border-[--border] text-sm text-[--text-muted]">
          <th className="py-2">Part</th>
          <th>Views</th>
          <th>Inquiries</th>
          <th>Orders</th>
          <th>Days to Sell</th>
        </tr>
      </thead>
      <tbody>
        {data.map((part, index) => (
          <tr key={index} className="border-b border-[--border] hover:bg-[--bg-hover] transition">
            <td className="py-2">{part.name}</td>
            <td>{part.views}</td>
            <td>{part.inquiries}</td>
            <td>{part.orders}</td>
            <td>{part.daysToSell}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TopSparePartsTable;