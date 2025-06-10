// components/charts/InventoryPieChart.js
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Define the colors for each section
const COLORS = ['#FF6347', '#4CAF50', '#FFC107']; // Example: Red, Green, Yellow

const InventoryPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="type"
          outerRadius={120}
          innerRadius={80}
          fill="var(--accent)"
          label
          animationDuration={800} // Adding animation to the pie chart
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            borderRadius: '5px',
            padding: '10px',
            border: '1px solid var(--accent)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default InventoryPieChart;