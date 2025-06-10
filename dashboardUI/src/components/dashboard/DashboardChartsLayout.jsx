// components/DashboardChartsLayout.js
import ChartCard from './ChartCard';
import RevenueLineChart from './charts/RevenueLineChart';
import SalesBarChart from './charts/SalesBarChart';
import ListingsPieChart from './charts/ListingsPieChart';
import PriceAreaChart from './charts/PriceAreaChart';
import PerformanceRadarChart from './charts/PerformanceRadarChart';
import InventoryPieChart from './charts/InventoryPieChart'; // New import for Inventory Pie Chart

import placeholderData from './charts/placeholderData'; // Make sure placeholder data is in the correct path

const DashboardChartsLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 px-4 auto-rows-[minmax(200px,auto)]">
      <ChartCard index={0} title="Revenue Over Time" className="lg:col-span-3">
        <RevenueLineChart data={placeholderData.revenue} />
      </ChartCard>

      <ChartCard index={1} title="Sales by Category" className="lg:col-span-3">
        <SalesBarChart data={placeholderData.sales} />
      </ChartCard>

      <ChartCard index={2} title="Listings Distribution" className="lg:col-span-2">
        <InventoryPieChart data={placeholderData.listings} /> {/* Updated to use Inventory Pie Chart */}
      </ChartCard>

      <ChartCard index={3} title="Average Sale Price Trends" className="lg:col-span-4">
        <PriceAreaChart data={placeholderData.prices} />
      </ChartCard>

      <ChartCard index={4} title="Performance Breakdown" className="lg:col-span-3">
        <PerformanceRadarChart data={placeholderData.performance} />
      </ChartCard>

       {/* Adding the InventoryPieChart */}
       <ChartCard index={3} title="Inventory Status" className="lg:col-span-2">
        <InventoryPieChart data={placeholderData.listings} />
       </ChartCard>
    </div>
  );
};

export default DashboardChartsLayout;