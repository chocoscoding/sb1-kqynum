import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
};