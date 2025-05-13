import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ImportPage from './pages/ImportPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import Navigation from './components/Navigation';
import { Languages } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('study');

  const renderPage = () => {
    switch (activePage) {
      case 'study':
        return <HomePage />;
      case 'import':
        return <ImportPage />;
      case 'stats':
        return <StatsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Languages className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">FlashLingo</h1>
            </div>
          </div>
        </div>
      </header>
      
      <Navigation activePage={activePage} onNavigate={setActivePage} />
      
      <main className="pb-16 sm:pb-0">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;