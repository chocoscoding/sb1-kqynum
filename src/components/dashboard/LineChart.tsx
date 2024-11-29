import React from 'react';

interface DataPoint {
  date: string;
  count: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const maxCount = Math.max(...data.map(d => d.count));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className="w-full bg-blue-500 rounded-t"
              style={{
                height: `${(point.count / maxCount) * 100}%`,
                transition: 'height 0.3s ease'
              }}
            />
            <span className="text-xs mt-2 transform -rotate-45 origin-top-left">
              {new Date(point.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};