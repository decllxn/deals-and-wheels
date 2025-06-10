import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const forecastData = [
  { month: 'Jan', projected: 24000 },
  { month: 'Feb', projected: 28000 },
  { month: 'Mar', projected: 32000 },
  { month: 'Apr', projected: 37000 },
  { month: 'May', projected: 42000 },
];

export default function ForecastingWidget() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-4 shadow-md col-span-2">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">🔮 Forecasting</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={forecastData}>
          <defs>
            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip />
          <Area type="monotone" dataKey="projected" stroke="var(--accent)" fillOpacity={1} fill="url(#colorProjected)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}