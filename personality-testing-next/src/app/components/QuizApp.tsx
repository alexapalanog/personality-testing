"use client";

import React, { useState, useEffect } from 'react';
import { questions, OPTIONS, TOTAL_PAGES, QUESTIONS_PER_PAGE } from '@/data/quizData';
import { Answers } from '@/types/quiz';
import ResultsPage from './ResultsPage'; // We will create this next

interface QuizAppProps {
    onGoHome: () => void;
}

const QuizApp: React.FC<QuizAppProps> = ({ onGoHome }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Answers>({}); // Typed state
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, showResults]);

    const handleAnswerChange = (questionId: number, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleReset = () => {
        setAnswers({});
        setCurrentPage(0);
        setShowResults(false);
    };

    const currentQuestions = questions.slice(
        currentPage * QUESTIONS_PER_PAGE,
        (currentPage + 1) * QUESTIONS_PER_PAGE
    );
    
    const isPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

    const handleNext = () => {
        if (currentPage < TOTAL_PAGES - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };
    
    const handleBack = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };
    
    const progressPercent = showResults ? 100 : (currentPage / (TOTAL_PAGES - 1)) * 100;

    const isQuestionAnswered = (id: number) => answers[id] !== undefined;
    let firstUnansweredFound = false;

    if (showResults) {
        return <ResultsPage answers={answers} onRetake={handleReset} />;
    }

    // The rest of your JSX from QuizApp goes here, it remains unchanged.
    return (
        <>
          <div className="quiz-banner">
              <div className="quiz-header">
              <h1>Committee Test</h1>
              <p>Find your perfect committee in CSS!</p>
          </div>
          </div>
          
          <div className="progress-container">
              <div className="progress-bar">
              <div className="progress-bar-inner" style={{ width: `${progressPercent}%` }}></div>
              <div className="progress-bar-head" style={{ left: `${progressPercent}%` }}></div>
          </div>
          <p className="progress-text">Page {currentPage + 1} of {TOTAL_PAGES}</p>
      
          </div>

          <div className="questions-list">
              {currentQuestions.map(q => {
                  const isAnswered = isQuestionAnswered(q.id);
                  const isActive = !isAnswered && !firstUnansweredFound;
                  if (isActive) {
                      firstUnansweredFound = true;
                  }

                  return (
                      <div key={q.id} className={`question-wrapper ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}>
                          <h2 className="question-text"><span className="question-number">{q.id}.</span>{q.text}</h2>
                          <div className="answer-scale" role="radiogroup" aria-labelledby={`question-${q.id}`}>
                              <span className="scale-label agree">Agree</span>
                              <div className="scale-options">
                                  {OPTIONS.map(opt => (
                                      <label key={opt.value} className="scale-option" data-value={opt.value}>
                                          <input
                                              type="radio"
                                              name={`question-${q.id}`}
                                              value={opt.value}
                                              checked={answers[q.id] === opt.value}
                                              onChange={() => handleAnswerChange(q.id, opt.value)}
                                          />
                                          <span className="scale-circle" aria-hidden="true"></span>
                                      </label>
                                  ))}
                              </div>
                              <span className="scale-label disagree">Disagree</span>
                          </div>
                      </div>
                  )
              })}
          </div>
            
          <div className="navigation-buttons">
              <button className="btn btn-secondary" onClick={currentPage > 0 ? handleBack : onGoHome}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext} disabled={!isPageComplete}>
                {currentPage === TOTAL_PAGES - 1 ? 'See Results' : 'Next'}
              </button>
          </div>
        </>
    );
};

export default QuizApp;