// charts/PriceAreaChart.js
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PriceAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <AreaChart data={data}>
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="price"
        stroke="var(--accent)"
        fill="var(--accent-light, rgba(255, 99, 132, 0.2))"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default PriceAreaChart;