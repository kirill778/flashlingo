import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface FileImportProps {
  onImport: (words: { english: string; russian: string }[]) => void;
}

const FileImport: React.FC<FileImportProps> = ({ onImport }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setError(null);
    if (files.length === 0) return;

    const file = files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const words = parseCSV(text);
        onImport(words);
      } catch (err) {
        setError('Failed to parse CSV file. Make sure the format is correct.');
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string): { english: string; russian: string }[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    
    return lines.map(line => {
      const [english, russian] = line.split(',').map(item => item.trim());
      
      if (!english || !russian) {
        throw new Error('Invalid CSV format');
      }
      
      return { english, russian };
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-700">
          Drag and drop your CSV file here, or{' '}
          <label className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
            browse
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileInput}
            />
          </label>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          CSV format: english,russian (one pair per line)
        </p>
      </div>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
};

export default FileImport;