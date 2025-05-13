import { useState, useEffect, useCallback } from 'react';
import { useWords } from './useWords';

interface WordStats {
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  difficultWords: number;
  recentPerformance: number[]; // percentages
}

export const useWordStats = () => {
  const { words } = useWords();
  const [stats, setStats] = useState<WordStats>(() => {
    // Initialize from localStorage if available
    const savedStats = localStorage.getItem('flashcard-stats');
    return savedStats 
      ? JSON.parse(savedStats) 
      : {
          totalWords: 0,
          masteredWords: 0,
          learningWords: 0,
          difficultWords: 0,
          recentPerformance: [],
        };
  });

  // Save to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('flashcard-stats', JSON.stringify(stats));
  }, [stats]);

  // Update stats whenever words change
  useEffect(() => {
    const masteredWords = words.filter(word => word.correctCount >= 3 && word.correctCount > word.incorrectCount * 2).length;
    const difficultWords = words.filter(word => word.incorrectCount > word.correctCount).length;
    const learningWords = words.length - masteredWords - difficultWords;
    
    setStats(prev => ({
      ...prev,
      totalWords: words.length,
      masteredWords,
      learningWords,
      difficultWords,
    }));
  }, [words]);

  const recordStudySession = useCallback((percentage: number) => {
    setStats(prev => {
      const recentPerformance = [...prev.recentPerformance, percentage].slice(-7); // Keep last 7 sessions
      
      return {
        ...prev,
        recentPerformance,
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      totalWords: 0,
      masteredWords: 0,
      learningWords: 0,
      difficultWords: 0,
      recentPerformance: [],
    });
  }, []);

  return {
    stats,
    recordStudySession,
    resetStats,
  };
};