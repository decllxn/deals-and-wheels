// components/RecentOrders.js
import { useEffect, useState } from 'react';
import { Clock, Truck, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const orders = [
  { id: '#ORD1023', customer: 'Alice Johnson', amount: '$1,250.00', status: 'Shipped', date: 'Apr 13, 2025' },
  { id: '#ORD1022', customer: 'Michael Lee', amount: '$980.00', status: 'Processing', date: 'Apr 12, 2025' },
  { id: '#ORD1021', customer: 'Samantha White', amount: '$2,450.00', status: 'Delivered', date: 'Apr 11, 2025' },
  { id: '#ORD1020', customer: 'David Kim', amount: '$740.00', status: 'Cancelled', date: 'Apr 10, 2025' },
];

const statusStyles = {
  Shipped: { icon: <Truck size={16} />, color: 'bg-blue-500' },
  Delivered: { icon: <CheckCircle size={16} />, color: 'bg-green-500' },
  Processing: { icon: <Loader2 size={16} className="animate-spin" />, color: 'bg-yellow-500' },
  Cancelled: { icon: <XCircle size={16} />, color: 'bg-red-500' },
};

const RecentOrders = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="rounded-xl shadow-md bg-[var(--bg-secondary)] p-6 w-full lg:w-[70%] overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">Recent Orders</h3>
        <button className="text-sm text-[var(--accent)] hover:underline">View All</button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10 text-[var(--text-muted)]">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {orders.map((order) => (
            <li key={order.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-[var(--text)]">{order.id}</p>
                <p className="text-sm text-[var(--text-muted)]">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[var(--text)]">{order.amount}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <span
                    className={`flex items-center gap-1 px-2 py-1 text-xs text-white rounded-full ${statusStyles[order.status].color}`}
                  >
                    {statusStyles[order.status].icon}
                    {order.status}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{order.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;