import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'SUV', value: 400 },
  { name: 'Sedan', value: 300 },
  { name: 'Pickup', value: 200 },
  { name: 'Luxury', value: 100 },
];

const COLORS = ['#FF5A5F', '#00A699', '#FC642D', '#007A87'];

export default function SalesByCategoryChart() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">🚗 Sales by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={50}
            fill="var(--accent)"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}