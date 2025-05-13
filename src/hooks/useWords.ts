import { useState, useEffect, useCallback } from 'react';
import { Word } from '../types';

export const useWords = () => {
  const [words, setWords] = useState<Word[]>(() => {
    // Initialize from localStorage if available
    const savedWords = localStorage.getItem('flashcard-words');
    return savedWords ? JSON.parse(savedWords) : [];
  });

  // Save to localStorage whenever words change
  useEffect(() => {
    localStorage.setItem('flashcard-words', JSON.stringify(words));
  }, [words]);

  const addWords = useCallback((newWords: { english: string; russian: string }[]) => {
    // Convert to our Word type with additional properties
    const wordsWithStats = newWords.map(word => ({
      ...word,
      id: `${word.english}-${Date.now()}`, // Generate a simple ID
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null,
    }));
    
    setWords(prevWords => {
      // Create a map of existing words for quick lookup
      const existingWordsMap = new Map(prevWords.map(word => [word.english.toLowerCase(), word]));
      
      // Process each new word
      const updatedWords = [...prevWords];
      
      wordsWithStats.forEach(newWord => {
        const key = newWord.english.toLowerCase();
        if (existingWordsMap.has(key)) {
          // Word exists, do nothing (or could update it if desired)
        } else {
          // New word, add it
          updatedWords.push(newWord);
          existingWordsMap.set(key, newWord);
        }
      });
      
      return updatedWords;
    });
  }, []);

  const updateWordStats = useCallback((wordId: string, correct: boolean) => {
    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordId
          ? {
              ...word,
              correctCount: correct ? word.correctCount + 1 : word.correctCount,
              incorrectCount: correct ? word.incorrectCount : word.incorrectCount + 1,
              lastStudied: new Date().toISOString(),
            }
          : word
      )
    );
  }, []);

  const updateWord = useCallback((wordId: string, updates: { english?: string; russian?: string }) => {
    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordId
          ? {
              ...word,
              ...updates,
            }
          : word
      )
    );
  }, []);

  const deleteWord = useCallback((wordId: string) => {
    setWords(prevWords => prevWords.filter(word => word.id !== wordId));
  }, []);

  const clearAllWords = useCallback(() => {
    setWords([]);
  }, []);

  const getStudyWords = useCallback((mode: string) => {
    let studyList = [...words];
    
    if (mode === 'review') {
      // For review mode, prioritize difficult words
      studyList.sort((a, b) => {
        const aScore = a.incorrectCount - a.correctCount;
        const bScore = b.incorrectCount - b.correctCount;
        return bScore - aScore; // Higher score (more incorrect) first
      });
    } else {
      // For other modes, shuffle the words
      studyList = shuffleArray(studyList);
    }
    
    return studyList;
  }, [words]);

  // Helper function to shuffle an array
  const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    words,
    addWords,
    updateWordStats,
    updateWord,
    deleteWord,
    clearAllWords,
    getStudyWords,
  };
};