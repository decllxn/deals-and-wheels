import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, RefreshCcw, TrendingUp, TrendingDown } from 'lucide-react';
// Import your sparkline chart library here

const summaryData = [
  {
    label: 'Total Inspections Completed',
    value: 320,
    icon: CheckCircle,
    trend: 'up',
    change: '+5%',
    sparklineData: [5, 10, 15, 10, 20], // Example data
    gradient: 'from-green-400 to-green-600',
  },
  {
    label: 'Pending Inspections',
    value: 15,
    icon: Clock,
    trend: 'down',
    change: '-3%',
    sparklineData: [10, 5, 8, 12, 7], // Example data
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    label: 'Failed Inspections',
    value: 8,
    icon: AlertCircle,
    trend: 'up',
    change: '+2%',
    sparklineData: [2, 3, 1, 4, 2], // Example data
    gradient: 'from-red-400 to-red-600',
  },
  {
    label: 'Passed Inspections',
    value: 312,
    icon: CheckCircle,
    trend: 'up',
    change: '+4%',
    sparklineData: [15, 20, 25, 22, 30], // Example data
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    label: 'Re-Inspections Scheduled',
    value: 5,
    icon: RefreshCcw,
    trend: 'down',
    change: '-1%',
    sparklineData: [1, 2, 1, 3, 1], // Example data
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    label: 'Avg. Time to Inspect',
    value: '45 mins',
    icon: Clock,
    trend: 'up',
    change: '+2%',
    sparklineData: [40, 42, 44, 43, 45], // Example data
    gradient: 'from-indigo-400 to-indigo-600',
  },
];

const InspectionSummaryCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {summaryData.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="bg-gradient-to-r p-6 rounded-lg shadow-md flex flex-col justify-between"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full text-white bg-gradient-to-r ${item.gradient}`}>
            <item.icon size={24} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-2xl font-semibold">{item.value}</div>
          </div>
        </div>
        <div className="mt-4">
          {/* Render your sparkline chart here using item.sparklineData */}
          <div className="text-xs text-gray-500">Month to Date</div>
          <div className="flex items-center justify-end">
            {item.trend === 'up' ? (
              <TrendingUp size={16} className="text-green-500 mr-1" />
            ) : (
              <TrendingDown size={16} className="text-red-500 mr-1" />
            )}
            <span className={`text-sm ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {item.change}
            </span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default InspectionSummaryCards;