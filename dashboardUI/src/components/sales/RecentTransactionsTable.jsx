import React, { useState } from 'react';

const transactionsData = [
  { id: 'TX123', car: 'Toyota Land Cruiser', buyer: 'John D.', seller: 'AutoMart', amount: 45000, method: 'Credit Card', status: 'Completed', date: '2025-04-12' },
  { id: 'TX124', car: 'Mazda CX-5', buyer: 'Jane A.', seller: 'RidesHub', amount: 23000, method: 'Mobile Money', status: 'Pending', date: '2025-04-11' },
  { id: 'TX125', car: 'Honda Civic', buyer: 'Mike S.', seller: 'CarZone', amount: 18000, method: 'Bank Transfer', status: 'Completed', date: '2025-04-10' },
  { id: 'TX126', car: 'Ford F-150', buyer: 'Emily R.', seller: 'DriveNow', amount: 38000, method: 'Crypto', status: 'Processing', date: '2025-04-09' },
  { id: 'TX127', car: 'Nissan Leaf', buyer: 'David L.', seller: 'EcoWheels', amount: 28000, method: 'PayPal', status: 'Shipped', date: '2025-04-08' },
  { id: 'TX128', car: 'Audi A4', buyer: 'Sarah M.', seller: 'LuxuryCars', amount: 52000, method: 'Wire Transfer', status: 'Completed', date: '2025-04-07' },
  { id: 'TX129', car: 'Chevrolet Silverado', buyer: 'Kevin P.', seller: 'TruckWorld', amount: 41000, method: 'Credit Card', status: 'Delivered', date: '2025-04-06' },
  { id: 'TX130', car: 'Hyundai Tucson', buyer: 'Lisa K.', seller: 'GlobalAutos', amount: 26000, method: 'Mobile Money', status: 'Pending', date: '2025-04-05' },
];

export default function RecentTransactionsTable() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions.filter((tx) =>
    Object.values(tx).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  let sortedTransactions = [...filteredTransactions];
  if (sortConfig !== null) {
    sortedTransactions.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig) return '';
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md overflow-auto custom-scrollbar">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">📄 Recent Transactions</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded w-full border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)]"
        />
      </div>

      <table className="min-w-[800px] w-full text-sm">
        <thead className="text-[var(--text-muted)]">
          <tr>
            {['id', 'car', 'buyer', 'seller', 'amount', 'method', 'status', 'date'].map((key) => (
              <th
                key={key}
                onClick={() => requestSort(key)}
                className={`text-left py-2 cursor-pointer capitalize ${getClassNamesFor(key)}`}
              >
                {key === 'id' ? 'Order ID' : key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((tx, i) => (
            <tr key={i} className="border-t border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors">
              <td className="py-2">{tx.id}</td>
              <td className="py-2">{tx.car}</td>
              <td className="py-2">{tx.buyer}</td>
              <td className="py-2">{tx.seller}</td>
              <td className="py-2">${tx.amount.toLocaleString()}</td>
              <td className="py-2">{tx.method}</td>
              <td className="py-2">{tx.status}</td>
              <td className="py-2">{tx.date}</td>
            </tr>
          ))}
          {sortedTransactions.length === 0 && (
            <tr>
              <td colSpan="8" className="py-4 text-center text-[var(--text-muted)]">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}