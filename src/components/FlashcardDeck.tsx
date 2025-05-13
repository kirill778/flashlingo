import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { Word } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardDeckProps {
  words: Word[];
  mode: 'learn' | 'quiz';
  onComplete?: (results: { correct: number; total: number }) => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ 
  words, 
  mode, 
  onComplete 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  
  // Reset when words or mode changes
  useEffect(() => {
    setCurrentIndex(0);
    setResults([]);
  }, [words, mode]);

  const handleAnswer = (word: Word, isCorrect: boolean) => {
    // Store the result
    const newResults = [...results];
    newResults[currentIndex] = isCorrect;
    setResults(newResults);
    
    // Move to next card after a brief delay
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (onComplete) {
        // Calculate final results
        const correctCount = newResults.filter(Boolean).length;
        onComplete({ correct: correctCount, total: words.length });
      }
    }, mode === 'learn' ? 0 : 1000);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (words.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No words to study. Import words first.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Card {currentIndex + 1} of {words.length}
        </span>
        
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={currentIndex === 0}
            onClick={goToPrevious}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={currentIndex === words.length - 1}
            onClick={goToNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="transition-opacity duration-300">
        <Flashcard 
          word={words[currentIndex]} 
          onAnswer={handleAnswer}
          mode={mode}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FlashcardDeck;