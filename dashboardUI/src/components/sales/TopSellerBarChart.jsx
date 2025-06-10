import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { seller: 'AutoMart', sales: 124000 },
  { seller: 'RidesHub', sales: 98000 },
  { seller: 'Elite Motors', sales: 74000 },
];

export default function TopSellersBarChart() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">🏆 Top Sellers</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" stroke="var(--text-muted)" />
          <YAxis dataKey="seller" type="category" stroke="var(--text-muted)" />
          <Tooltip />
          <Bar dataKey="sales" fill="var(--accent)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}