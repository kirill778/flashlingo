import React, { useState, useEffect } from 'react';
import FlashcardDeck from '../components/FlashcardDeck';
import StudyModeSelector from '../components/StudyModeSelector';
import { useWords } from '../hooks/useWords';
import { useWordStats } from '../hooks/useWordStats';
import { BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { words, getStudyWords } = useWords();
  const { recordStudySession } = useWordStats();
  const [studyMode, setStudyMode] = useState('learn');
  const [studyWords, setStudyWords] = useState(words);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    // Get appropriate words for study based on mode
    setStudyWords(getStudyWords(studyMode));
    setShowResults(false);
  }, [studyMode, words, getStudyWords]);

  const handleModeSelect = (mode: string) => {
    setStudyMode(mode);
  };

  const handleStudyComplete = (sessionResults: { correct: number; total: number }) => {
    setResults(sessionResults);
    setShowResults(true);
    recordStudySession(sessionResults.correct / sessionResults.total * 100);
  };

  const handleStartAgain = () => {
    setShowResults(false);
    // Refresh study words (might change order or selection based on mode)
    setStudyWords(getStudyWords(studyMode));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Study Flashcards</h1>

      {words.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No words to study</h3>
          <p className="mt-1 text-sm text-gray-500">
            Import vocabulary from the Import tab to get started.
          </p>
        </div>
      ) : showResults ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Study Session Complete!</h2>
          
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-50 mb-4">
            <div className="text-center">
              <span className="block text-3xl font-bold text-indigo-600">
                {Math.round((results.correct / results.total) * 100)}%
              </span>
              <span className="text-gray-500 text-sm">Accuracy</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            You got {results.correct} out of {results.total} words correct.
          </p>
          
          <button
            onClick={handleStartAgain}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Study Again
          </button>
        </div>
      ) : (
        <>
          <StudyModeSelector 
            selectedMode={studyMode} 
            onSelectMode={handleModeSelect} 
          />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <FlashcardDeck 
              words={studyWords}
              mode={studyMode as 'learn' | 'quiz'}
              onComplete={handleStudyComplete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;