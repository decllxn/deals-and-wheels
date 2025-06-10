import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
    LineChart, Line,
} from "recharts";  

const BlogEngagementChart = () => {
  const data = [
    { day: "Mon", views: 150, comments: 15, shares: 5 },
    { day: "Tue", views: 165, comments: 18, shares: 7 },
    { day: "Wed", views: 170, comments: 20, shares: 6 },
    { day: "Thu", views: 172, comments: 19, shares: 8 },
    { day: "Fri", views: 178, comments: 22, shares: 10 },
    { day: "Sat", views: 175, comments: 25, shares: 9 },
    { day: "Sun", views: 180, comments: 23, shares: 12 },
  ];

  return (
    <div className="bg-[--bg-secondary] rounded-lg shadow-md p-6">
      <h3 className="text-md font-semibold text-[--text] mb-4">Blog Engagement Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="day" stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderRadius: '6px', padding: '8px', border: '1px solid var(--border)' }}
            itemStyle={{ color: 'var(--text)' }}
          />
          <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" name="Views" />
          <Area type="monotone" dataKey="comments" stroke="#10b981" fillOpacity={1} fill="url(#colorComments)" name="Comments" />
          <Area type="monotone" dataKey="shares" stroke="#f59e0b" fillOpacity={1} fill="url(#colorShares)" name="Shares" />
          <Legend iconSize={10} textStyle={{ color: 'var(--text-muted)', fontSize: 12 }} wrapperStyle={{ bottom: 0, left: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const BlogCategoriesChart = () => {
  const data = [
    { category: "Tutorials", posts: 35 },
    { category: "News", posts: 50 },
    { category: "Reviews", posts: 40 },
    { category: "Opinions", posts: 25 },
    { category: "Guides", posts: 45 },
  ];

  return (
    <div className="bg-[--bg-secondary] rounded-lg shadow-md p-6">
      <h3 className="text-md font-semibold text-[--text] mb-4">Number of Posts per Category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="category" stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderRadius: '6px', padding: '8px', border: '1px solid var(--border)' }}
            itemStyle={{ color: 'var(--text)' }}
          />
          <Bar dataKey="posts" fill="#ef4444" barSize={30} radius={[8, 8, 0, 0]} name="Posts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const BlogTrafficSourcesChart = () => {
  const data = [
    { source: "Direct", value: 55 },
    { source: "Social Media", value: 30 },
    { source: "Search Engines", value: 25 },
    { source: "Referrals", value: 15 },
  ];

  const COLORS = ["#a855f7", "#34d399", "#f97316", "#f472b6"];

  return (
    <div className="bg-[--bg-secondary] rounded-lg shadow-md p-6">
      <h3 className="text-md font-semibold text-[--text] mb-4">Blog Traffic Sources</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="source"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderRadius: '6px', padding: '8px', border: '1px solid var(--border)' }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={10}
            textStyle={{ color: 'var(--text-muted)', fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const BlogViewsLineChart = () => {
    const data = [
      { date: "Mon", views: 1200 },
      { date: "Tue", views: 1500 },
      { date: "Wed", views: 1350 },
      { date: "Thu", views: 1600 },
      { date: "Fri", views: 1800 },
      { date: "Sat", views: 1400 },
      { date: "Sun", views: 1550 },
    ];
  
    return (
      <div className="bg-[--bg-secondary] rounded-lg shadow-md p-6">
        <h3 className="text-md font-semibold text-[--text] mb-4">Blog Views Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderRadius: '6px', padding: '8px', border: '1px solid var(--border)' }}
              itemStyle={{ color: 'var(--text)' }}
            />
            <Line type="monotone" dataKey="views" stroke="#a855f7" strokeWidth={3} dot={false} name="Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };




const BlogPerformanceCharts = () => (
  <>
    <BlogEngagementChart />
    <BlogCategoriesChart />
    <BlogTrafficSourcesChart />
    <BlogViewsLineChart />
  </>
);

export default BlogPerformanceCharts;