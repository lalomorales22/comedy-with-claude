import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Users, Star, Clock, ThumbsUp } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const performanceData = [
    { date: '2024-01', laughs: 450, engagement: 78, attendance: 120 },
    { date: '2024-02', laughs: 520, engagement: 82, attendance: 145 },
    { date: '2024-03', laughs: 480, engagement: 75, attendance: 130 },
    { date: '2024-04', laughs: 600, engagement: 85, attendance: 160 },
  ];

  const stats = [
    {
      title: 'Total Performances',
      value: '24',
      change: '+12%',
      icon: Clock,
    },
    {
      title: 'Average Audience',
      value: '138',
      change: '+18%',
      icon: Users,
    },
    {
      title: 'Engagement Rate',
      value: '82%',
      change: '+5%',
      icon: Star,
    },
    {
      title: 'Total Laughs',
      value: '2,050',
      change: '+24%',
      icon: ThumbsUp,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Performance Analytics</h1>
            <p className="text-gray-600 mt-1">Track your comedy metrics and audience engagement</p>
          </div>
          <div className="flex space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="laughs" fill="#4F46E5" name="Laughs" />
              <Bar dataKey="engagement" fill="#10B981" name="Engagement %" />
              <Bar dataKey="attendance" fill="#F59E0B" name="Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Insights</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Audience Engagement Peak</h3>
              <p className="text-gray-600">Your jokes about technology received 45% more laughs than average</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Audience Demographics</h3>
              <p className="text-gray-600">Your content resonates most with the 25-34 age group</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;