import React from 'react';
import { BookOpen, Upload, BarChart2, Settings } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'stats', label: 'Progress', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm">
      {/* Desktop navigation */}
      <div className="hidden sm:flex justify-center border-b">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-4 text-sm font-medium transition-colors relative ${
                activePage === item.id
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-1">
                <item.icon size={16} />
                {item.label}
              </span>
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-3 flex flex-col items-center text-xs font-medium ${
                activePage === item.id
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              <span className="mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;