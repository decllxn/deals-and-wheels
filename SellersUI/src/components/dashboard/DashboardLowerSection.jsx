import RecentOrders from './RecentOrders';
import UpcomingTasks from './UpcomingTasks';

const DashboardLowerSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 mt-6">
      <RecentOrders />
      <UpcomingTasks />
    </div>
  );
};

export default DashboardLowerSection;