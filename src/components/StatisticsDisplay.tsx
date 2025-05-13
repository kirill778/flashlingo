import React from 'react';
import { CheckCircle, XCircle, Clock, Star } from 'lucide-react';
import { useWordStats } from '../hooks/useWordStats';

const StatisticsDisplay: React.FC = () => {
  const { stats } = useWordStats();
  
  const calculateLearningProgress = () => {
    if (stats.totalWords === 0) return 0;
    
    // Calculate a weighted score based on correct answers
    const masteredScore = stats.masteredWords * 1.0;
    const learningScore = stats.learningWords * 0.5;
    
    return Math.min(100, Math.round(((masteredScore + learningScore) / stats.totalWords) * 100));
  };

  const progressPercentage = calculateLearningProgress();

  return (
    <div className="w-full">
      {stats.totalWords === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No learning data available yet. Start studying to see your progress!</p>
        </div>
      ) : (
        <>
          {/* Overall progress */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Progress</h3>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-indigo-600 transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{progressPercentage}% Complete</p>
          </div>
          
          {/* Detailed stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<CheckCircle className="text-green-500" size={24} />}
              title="Mastered"
              value={stats.masteredWords}
              description="Words you know well"
            />
            <StatCard 
              icon={<Clock className="text-yellow-500" size={24} />}
              title="Learning"
              value={stats.learningWords}
              description="Words in progress"
            />
            <StatCard 
              icon={<XCircle className="text-red-500" size={24} />}
              title="Difficult"
              value={stats.difficultWords}
              description="Words to focus on"
            />
            <StatCard 
              icon={<Star className="text-indigo-500" size={24} />}
              title="Total"
              value={stats.totalWords}
              description="Total vocabulary"
            />
          </div>
          
          {/* Recent performance */}
          {stats.recentPerformance.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Performance</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-24">
                  {/* Simple graph visualization - in production would use a proper chart library */}
                  <div className="flex h-full items-end justify-between px-2">
                    {stats.recentPerformance.map((score, i) => (
                      <div 
                        key={i} 
                        className="w-full mx-0.5 rounded-t bg-indigo-500 transition-all duration-500"
                        style={{ 
                          height: `${score}%`,
                          opacity: 0.6 + (i / stats.recentPerformance.length) * 0.4
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <p className="text-sm text-gray-500">Your last {stats.recentPerformance.length} study sessions</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="ml-2 text-sm font-medium text-gray-900">{title}</h4>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default StatisticsDisplay;