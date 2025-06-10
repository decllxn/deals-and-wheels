import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const paymentData = [
  { name: 'Credit Card', value: 55000 },
  { name: 'Mobile Money', value: 38000 },
  { name: 'Bank Transfer', value: 19000 },
  { name: 'Crypto', value: 7000 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD'];

export default function PaymentMethodBreakdown() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">💳 Payment Methods</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={40}
            label
          >
            {paymentData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}