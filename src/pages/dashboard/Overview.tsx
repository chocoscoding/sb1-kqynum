import React from 'react';
import { BarChart3, Users, Key, Activity } from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { LineChart } from '../../components/dashboard/LineChart';
import { mockStats } from '../../data/mockData';

export const Overview: React.FC = () => {
  const statCards = [
    {
      title: 'Total Requests',
      value: mockStats.totalRequests.toLocaleString(),
      icon: BarChart3,
      color: 'bg-blue-500',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Active Users',
      value: mockStats.activeUsers.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
      subtitle: 'Currently online'
    },
    {
      title: 'Active Keys',
      value: mockStats.activeKeys.toLocaleString(),
      icon: Key,
      color: 'bg-purple-500',
      subtitle: 'In production'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={mockStats.requestsPerDay}
          title="Requests per Day"
        />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Applications</h3>
          <div className="space-y-4">
            {mockStats.topApplications.map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  <span>{app.name}</span>
                </div>
                <span className="text-gray-600">
                  {app.requests.toLocaleString()} requests
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};