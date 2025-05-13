import React from 'react';
import { BookOpen, Brain, PenTool } from 'lucide-react';

interface StudyModeSelectorProps {
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

const StudyModeSelector: React.FC<StudyModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
}) => {
  const modes = [
    {
      id: 'learn',
      name: 'Learn',
      description: 'Flip cards to learn and memorize',
      icon: BookOpen,
    },
    {
      id: 'quiz',
      name: 'Quiz',
      description: 'Test your knowledge by typing translations',
      icon: PenTool,
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Focus on words you find difficult',
      icon: Brain,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {modes.map((mode) => (
        <div
          key={mode.id}
          className={`p-4 rounded-lg border transition-all cursor-pointer ${
            selectedMode === mode.id
              ? 'border-indigo-600 bg-indigo-50 shadow-sm'
              : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
          }`}
          onClick={() => onSelectMode(mode.id)}
        >
          <div className="flex items-start">
            <div
              className={`p-2 rounded-full ${
                selectedMode === mode.id
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <mode.icon size={20} />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{mode.name}</h3>
              <p className="mt-1 text-xs text-gray-500">{mode.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyModeSelector;