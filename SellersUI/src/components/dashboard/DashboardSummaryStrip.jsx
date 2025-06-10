import React from 'react';
import {
  DollarSign,
  Truck,
  List,
  TrendingUp,
  Hammer,
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardSummaryStrip = () => {
  const stats = [
    {
      title: 'Revenue this month',
      metric: '$54,321',
      icon: DollarSign,
      delta: '+12%',
      color: 'green',
    },
    {
      title: 'Vehicles sold',
      metric: '125',
      icon: Truck,
      delta: '-5%',
      color: 'red',
    },
    {
      title: 'New listings',
      metric: '32',
      icon: List,
      delta: '+8%',
      color: 'blue',
    },
    {
      title: 'Active auctions',
      metric: '15',
      icon: Hammer,
      delta: '+3%',
      color: 'purple',
    },
    {
      title: 'Avg. sale price',
      metric: '$12,500',
      icon: TrendingUp,
      delta: '+6%',
      color: 'orange',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full overflow-x-hidden">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[var(--card)] rounded-md shadow-sm p-4 flex items-center space-x-4"
        >
          <div className={`p-2 rounded-full text-${stat.color}-500 bg-${stat.color}-100`}>
            <stat.icon size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm text-[var(--text-muted)] truncate">{stat.title}</h3>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-[var(--text)] mr-2">
                {stat.metric}
              </span>
              <span
                className={`text-sm ${
                  stat.delta.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.delta}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardSummaryStrip;