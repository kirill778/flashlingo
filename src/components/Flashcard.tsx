import React, { useState } from 'react';

import { type Word } from '../types';

import { RefreshCw } from 'lucide-react';

interface FlashcardProps {
  word: Word;
  onAnswer?: (word: Word, isCorrect: boolean) => void;
  mode?: 'learn' | 'quiz';
  showControls?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  onAnswer,
  mode = 'learn',
  showControls = true
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleFlip = () => {
    if (mode === 'learn') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleCheck = () => {
    const isAnswerCorrect = userInput.toLowerCase().trim() === word.russian.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (onAnswer) {
      onAnswer(word, isAnswerCorrect);
    }

    // Показать правильный ответ, перевернув карточку
    setTimeout(() => {
      setIsFlipped(true);
    }, 500);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setUserInput('');
    setShowFeedback(false);
    // Если нужно, чтобы `onAnswer` вызывался при пропуске/переходе к следующей,
    // то можно передать `isCorrect` или `false` сюда.
    // В текущей логике `onAnswer` уже вызывается в `handleCheck`.
    // Этот вызов, если он нужен, должен быть более явным.
    // Например, `onAnswer(word, false);` если это кнопка "не знаю".
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        // 1. Переносим `transform-style-3d` сюда, чтобы создать 3D-контекст для детей.
        // 2. Здесь происходит основной поворот карточки.
        className={`relative h-56 w-full cursor-pointer perspective-1000 transform-style-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={mode === 'learn' ? handleFlip : undefined}
      >
        {/* Front of card */}
        <div
          // 3. Убираем динамические классы `rotate-y-180` и `opacity` отсюда.
          // `backface-hidden` и поворот родителя сами управляют видимостью.
          className={`absolute inset-0 backface-hidden bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-all duration-500`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{word.english}</h3>
          <p className="text-gray-500 text-sm">Click to reveal translation</p>

          {mode === 'quiz' && (
            <div className="mt-4 w-full">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type the translation..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                onClick={(e) => e.stopPropagation()}
              />

              <button
                className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheck();
                }}
              >
                Check
              </button>

              {showFeedback && (
                <div className={`mt-2 text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Try again!'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back of card */}
        <div
          // 4. Убираем динамические классы `opacity` и `rotate-y-180` отсюда.
          // 5. Добавляем `rotate-y-180` статически, чтобы она всегда была изначально повернута.
          className={`absolute inset-0 backface-hidden bg-indigo-50 rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-all duration-500 rotate-y-180`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{word.russian}</h3>
          <p className="text-gray-500 text-sm">Translation of: {word.english}</p>

          {showControls && (
            <button
              className="mt-4 flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
              onClick={(e) => {
                e.stopPropagation();
                handleNextCard();
              }}
            >
              <RefreshCw size={16} /> Next card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;