import React from 'react';
import StatisticsDisplay from '../components/StatisticsDisplay';

const StatsPage: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Progress</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <StatisticsDisplay />
      </div>
    </div>
  );
};

export default StatsPage;