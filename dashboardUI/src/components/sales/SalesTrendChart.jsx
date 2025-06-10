import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
  { date: 'Mon', revenue: 1200, orders: 80, conversion: 2.5 },
  { date: 'Tue', revenue: 2400, orders: 130, conversion: 3.2 },
  { date: 'Wed', revenue: 1800, orders: 100, conversion: 2.8 },
  // ...
];

export default function SalesTrendChart() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md col-span-2 md:col-span-1">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">📈 Sales Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}