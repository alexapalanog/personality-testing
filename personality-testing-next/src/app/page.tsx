"use client";

import { useState } from 'react';
// These imports are relative to the current file
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import QuizApp from './components/QuizApp';

export default function Home() {
  const [page, setPage] = useState('home');

  const handleStartQuiz = () => setPage('quiz');
  const handleGoHome = () => setPage('home');

  return (
    <>
      <AppHeader page={page} onTakeTest={handleStartQuiz} onGoHome={handleGoHome} />
      <main className={`app-container ${page === 'home' ? 'home-main-container' : ''}`}>
        {page === 'home' ? (
          <HomePage onStartQuiz={handleStartQuiz} />
        ) : (
          <QuizApp onGoHome={handleGoHome} />
        )}
      </main>
      <Footer />
    </>
  );
}