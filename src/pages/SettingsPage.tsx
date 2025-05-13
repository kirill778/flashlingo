import React from 'react';
import SettingsPanel from '../components/SettingsPanel';

const SettingsPage: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
      
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;