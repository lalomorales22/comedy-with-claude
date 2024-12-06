import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Calendar, ArrowUp, ArrowDown, Activity } from 'lucide-react';

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [performanceData, setPerformanceData] = useState({
    trends: [],
    metrics: {},
    recentPerformances: []
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulated performance data
    const mockData = {
      trends: [
        { date: '2024-01', laughterScore: 85, engagement: 78, timing: 90 },
        { date: '2024-02', laughterScore: 88, engagement: 82, timing: 87 },
        { date: '2024-03', laughterScore: 92, engagement: 85, timing: 89 },
      ],
      metrics: {
        averageLaughterScore: 88.3,
        averageEngagement: 81.7,
        totalPerformances: 15,
        improvement: 8.2
      },
      recentPerformances: [
        {
          date: '2024-03-15',
          venue: 'Comedy Club NYC',
          duration: 15,
          metrics: {
            laughter: 92,
            engagement: 85,
            timing: 89,
            wordChoice: 87,
            stagePresence: 90
          }
        },
        // Add more performances...
      ]
    };

    setPerformanceData(mockData);
  }, [timeRange]);

  const radarData = performanceData.recentPerformances?.[0]?.metrics
    ? [performanceData.recentPerformances[0].metrics]
    : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Laughter Score</p>
              <h3 className="text-2xl font-bold">{performanceData.metrics.averageLaughterScore}%</h3>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Engagement</p>
              <h3 className="text-2xl font-bold">{performanceData.metrics.averageEngagement}%</h3>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Performances</p>
              <h3 className="text-2xl font-bold">{performanceData.metrics.totalPerformances}</h3>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Improvement</p>
              <h3 className="text-2xl font-bold">
                {performanceData.metrics.improvement > 0 ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {performanceData.metrics.improvement}%
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {Math.abs(performanceData.metrics.improvement)}%
                  </span>
                )}
              </h3>
            </div>
            <Activity className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="laughterScore" 
                stroke="#3B82F6" 
                name="Laughter Score"
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#10B981" 
                name="Engagement"
              />
              <Line 
                type="monotone" 
                dataKey="timing" 
                stroke="#8B5CF6" 
                name="Timing"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Metrics Radar */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Latest Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Performances */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Performances</h3>
          <div className="space-y-4">
            {performanceData.recentPerformances.map((performance, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{performance.venue}</h4>
                    <p className="text-sm text-gray-500">{performance.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{performance.duration} mins</p>
                    <p className="text-sm text-gray-500">
                      Score: {Math.round(
                        (performance.metrics.laughter +
                         performance.metrics.engagement +
                         performance.metrics.timing) / 3
                      )}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;