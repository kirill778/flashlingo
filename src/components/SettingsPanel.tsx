import React, { useState, useEffect } from 'react';
import { Save, Download, Trash2, AlertCircle } from 'lucide-react';
import { useWords } from '../hooks/useWords';
import { useWordStats } from '../hooks/useWordStats';

const SettingsPanel: React.FC = () => {
  const { words, clearAllWords } = useWords();
  const { resetStats } = useWordStats();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleExport = () => {
    if (words.length === 0) return;
    
    const csvContent = words.map(word => `${word.english},${word.russian}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vocabulary_export.csv';
    link.click();
    
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    clearAllWords();
    resetStats();
    setShowConfirm(false);
  };
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-500 mt-1">
                Download your vocabulary as a CSV file
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={words.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Reset All Data</h3>
              <p className="text-sm text-gray-500 mt-1">
                Delete all words and progress data
              </p>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900">About</h3>
          <p className="text-sm text-gray-500 mt-1">
            Language Learning Flashcards v1.0.0
          </p>
        </div>
      </div>
      
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Confirm Reset</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              This action will permanently delete all your imported words and progress data. This cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;