import React from 'react';
import FileImport from '../components/FileImport';
import { useWords } from '../hooks/useWords';
import { ListPlus, AlertCircle, Check } from 'lucide-react';

const ImportPage: React.FC = () => {
  const { words, addWords, clearAllWords } = useWords();
  const [importSuccess, setImportSuccess] = React.useState(false);

  const handleImport = (importedWords: { english: string; russian: string }[]) => {
    addWords(importedWords);
    setImportSuccess(true);
    
    // Hide success message after a delay
    setTimeout(() => {
      setImportSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Import Words</h1>
      
      {importSuccess && (
        <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-sm text-green-700">
            Successfully imported {words.length} words.
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <FileImport onImport={handleImport} />
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Imported Words</h2>
        
        {words.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <ListPlus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No words imported</h3>
            <p className="mt-1 text-xs text-gray-500">
              Import a CSV file with English and Russian word pairs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {words.length} {words.length === 1 ? 'Word' : 'Words'}
                </h3>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      English
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Russian
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {words.slice(0, 50).map((word, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-2 text-sm text-gray-900">
                        {word.english}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-900">
                        {word.russian}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {words.length > 50 && (
                <div className="px-6 py-2 text-center text-sm text-gray-500">
                  Showing 50 of {words.length} words
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">CSV Format Instructions</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Your CSV file should have the following format:</p>
              <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                hello,привет
                goodbye,до свидания
                thank you,спасибо
              </pre>
              <p className="mt-2">Each line should contain an English word or phrase, followed by a comma, followed by its Russian translation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;