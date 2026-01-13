
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizModuleProps {
  questions: QuizQuestion[];
  onFinish: (score: number, errorCount: number) => void;
  onQuit: () => void;
}

const QuizModule: React.FC<QuizModuleProps> = ({ questions, onFinish, onQuit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuitting, setIsQuitting] = useState(false);
  
  // State tracking for all questions in the current set
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [answeredStatus, setAnsweredStatus] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [hintsStatus, setHintsStatus] = useState<boolean[]>(new Array(questions.length).fill(false));

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentIndex];
  const isAnswered = answeredStatus[currentIndex];
  const showHint = hintsStatus[currentIndex];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = idx;
    setAnswers(newAnswers);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const newStatus = [...answeredStatus];
    newStatus[currentIndex] = true;
    setAnsweredStatus(newStatus);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      let finalScore = 0;
      let finalErrors = 0;
      answeredStatus.forEach((answered, idx) => {
        if (answered) {
          if (answers[idx] === questions[idx].correctAnswer) {
            finalScore++;
          } else {
            finalErrors++;
          }
        }
      });
      onFinish(finalScore, finalErrors);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleHint = () => {
    const newHints = [...hintsStatus];
    newHints[currentIndex] = true;
    setHintsStatus(newHints);
  };

  const isSelectedCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40 shrink-0">
        <div className="flex items-center gap-3">
          {!isQuitting ? (
            <button 
              type="button"
              onClick={() => setIsQuitting(true)}
              className="text-red-500 hover:text-red-700 font-black text-[10px] uppercase tracking-tighter flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shrink-0 cursor-pointer"
            >
              <i className="fa-solid fa-circle-xmark text-sm"></i>
              Quit
            </button>
          ) : (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">Exit Assessment?</span>
              <button 
                onClick={onQuit}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-600 transition-colors shadow-sm active:scale-95"
              >
                Yes, Quit
              </button>
              <button 
                onClick={() => setIsQuitting(false)}
                className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition-colors active:scale-95"
              >
                Cancel
              </button>
            </div>
          )}
          
          <div className="h-4 w-px bg-slate-200 shrink-0"></div>
          
          <h3 className="font-bold text-slate-800 flex items-center gap-2 truncate text-sm">
            Topic Assessment
          </h3>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap bg-slate-100 px-3 py-1 rounded-full">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>
      
      {/* Visual Progress Bar */}
      <div className="w-full h-1 bg-slate-100 shrink-0">
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="p-4 sm:p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = isAnswered && idx === currentQuestion.correctAnswer;
            const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctAnswer;
            
            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={`
                  w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group
                  ${isSelected && !isAnswered ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}
                  ${isCorrect ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${isWrong ? 'border-red-500 bg-red-50 text-red-700' : ''}
                  ${isAnswered && !isSelected && !isCorrect ? 'opacity-40 grayscale' : ''}
                `}
              >
                <span className="font-bold text-sm">{option}</span>
                <div className="flex items-center">
                  {isCorrect && <i className="fa-solid fa-circle-check text-green-600 text-lg"></i>}
                  {isWrong && <i className="fa-solid fa-circle-xmark text-red-600 text-lg"></i>}
                  {!isAnswered && (
                    <div className={`w-5 h-5 rounded-full border-2 transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-200'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-1"></div>}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Support Section: Hints */}
        {!isAnswered && (
          <div className="mb-4">
            {!showHint ? (
              <button 
                type="button"
                onClick={toggleHint}
                className="flex items-center gap-2 text-indigo-600 font-black text-xs hover:text-indigo-700 transition-colors uppercase tracking-widest"
              >
                <i className="fa-solid fa-lightbulb"></i>
                Request Hint
              </button>
            ) : (
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-800 animate-in fade-in slide-in-from-top-2 duration-300 border-dashed">
                <span className="font-black uppercase text-[9px] block mb-1 tracking-widest opacity-70 flex items-center gap-2">
                  <i className="fa-solid fa-brain"></i> Contextual Hint
                </span>
                {currentQuestion.hint}
              </div>
            )}
          </div>
        )}

        {/* Explanation Section */}
        {isAnswered && (
          <div className={`p-4 rounded-xl mb-4 animate-in fade-in slide-in-from-top-2 duration-500 border-l-4 ${
            isSelectedCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                isSelectedCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <i className={`fa-solid ${isSelectedCorrect ? 'fa-check' : 'fa-xmark'} text-xs`}></i>
              </div>
              <div className="flex-1">
                <h5 className={`font-black text-[9px] uppercase tracking-widest mb-1 ${isSelectedCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  Concept Review
                </h5>
                <p className="text-slate-700 text-xs leading-relaxed font-medium bg-white/60 p-3 rounded-lg">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Controls */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3 shrink-0">
        {currentIndex > 0 && (
            <button 
              type="button"
              onClick={handleBack}
              className="w-12 h-12 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-white active:scale-95 transition-all flex items-center justify-center group shrink-0"
              aria-label="Previous Question"
            >
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-0.5 transition-transform"></i>
            </button>
        )}

        {!isAnswered ? (
          <button 
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheckAnswer}
            className="flex-1 bg-slate-800 text-white py-3.5 rounded-xl font-bold disabled:opacity-30 active:scale-95 transition-all shadow-lg shadow-slate-200 text-sm"
          >
            Check Answer
          </button>
        ) : (
          <button 
            type="button"
            onClick={handleNext}
            className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 text-sm"
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizModule;
