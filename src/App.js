import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import HeartRain from './components/HeartRain';
import CatLoveBurst from './components/CatLoveBurst';

function App() {
  const [screen, setScreen] = useState('intro'); // 'intro' | 'question' | 'result'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCatBurst, setShowCatBurst] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lifelinesUsed, setLifelinesUsed] = useState({
    fiftyFifty: false,
    phoneAFriend: false,
    askTheAudience: false
  });

  const question = "Will you be my Valentine?";
  
  const answers = useMemo(() => ([
    { id: 'A', text: 'Yes! Absolutely, with all my heart 💕', correct: true, color: '#FF6B9D' },
    { id: 'B', text: 'Of course, I\'d love to be your Valentine 💖', correct: true, color: '#C77DFF' },
    { id: 'C', text: 'Yes, forever and always yours 💝', correct: true, color: '#FFB6C1' },
    { id: 'D', text: 'Do you see any option that says NO? 💗', correct: true, color: '#FF69B4' }
  ]), []);

  useEffect(() => {
    // Ensure the first entry is the intro screen for consistent back behavior.
    const state = window.history.state;
    if (!state || !state.screen) {
      window.history.replaceState({ screen: 'intro' }, '', '#intro');
    }
  }, []);

  useEffect(() => {
    const onPopState = (e) => {
      const next = e.state?.screen;
      if (next === 'intro' || next === 'question' || next === 'result') {
        setScreen(next);
        if (next !== 'result') setShowCatBurst(false);
      } else {
        setScreen('intro');
        setShowCatBurst(false);
      }
      setModalOpen(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    // Millionaire-style: reveal options one by one (A, B, C, D) every 5 seconds.
    setRevealedCount(0);
    if (screen !== 'question') return;

    const interval = setInterval(() => {
      setRevealedCount((c) => {
        if (c >= 4) return 4;
        return c + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [screen]);

  useEffect(() => {
    // 60s countdown timer for the questionnaire page.
    if (screen !== 'question') return;
    setTimeLeft(60);
    const t = setInterval(() => {
      setTimeLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [screen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('question');
      window.history.pushState({ screen: 'question' }, '', '#question');
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setScreen('result');
      window.history.pushState({ screen: 'result' }, '', '#result');
      setShowCatBurst(true);
    }, 500);
  };

  const handleLifeline = (lifeline) => {
    // Keep lifelines clickable, but nudge her back to the main question.
    setModalOpen(true);
    // Optional: still visually mark a lifeline as "used" after tapping.
    if (lifeline === 'fiftyFifty') setLifelinesUsed((p) => ({ ...p, fiftyFifty: true }));
    if (lifeline === 'phoneAFriend') setLifelinesUsed((p) => ({ ...p, phoneAFriend: true }));
    if (lifeline === 'askTheAudience') setLifelinesUsed((p) => ({ ...p, askTheAudience: true }));
  };

  return (
    <div className="app">
      <HeartRain />
      {showCatBurst && <CatLoveBurst />}
      {modalOpen && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Lifeline message"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-badge">Oops!</div>
            <div className="modal-title">Not so fast, Saanvi</div>
            <div className="modal-body">
              You need to answer the question first 😼💘
            </div>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              Okay, I’ll answer 💖
            </button>
          </div>
        </div>
      )}
      
      <div className="game-container">
        {/* Millionaire-style header */}
        <div className="header">
          <div className="logo">💕</div>
          <h1 className="title">Saanvi, Will You Be My Valentine?</h1>
        </div>

        {/* Lifelines */}
        {screen === 'question' && (
          <div className="lifelines">
            <button 
              className={`lifeline ${lifelinesUsed.fiftyFifty ? 'used' : ''}`}
              onClick={() => handleLifeline('fiftyFifty')}
            >
              <span className="lifeline-icon">50:50</span>
              <span className="lifeline-label">50:50</span>
            </button>
            <button 
              className={`lifeline ${lifelinesUsed.phoneAFriend ? 'used' : ''}`}
              onClick={() => handleLifeline('phoneAFriend')}
            >
              <span className="lifeline-icon">📞</span>
              <span className="lifeline-label">Phone a Friend</span>
            </button>
            <button 
              className={`lifeline ${lifelinesUsed.askTheAudience ? 'used' : ''}`}
              onClick={() => handleLifeline('askTheAudience')}
            >
              <span className="lifeline-icon">👥</span>
              <span className="lifeline-label">Ask the Audience</span>
            </button>
          </div>
        )}

        {/* Question display */}
        {screen !== 'intro' && (
          <div className="question-container">
            <div className="question-number">Final Question for Saanvi</div>

            {screen === 'question' && (
              <div className="timer-wrap" aria-label="Countdown timer">
                <div
                  className={`timer ${timeLeft <= 10 ? 'timer-urgent' : ''}`}
                  style={{ '--progress': `${(timeLeft / 60) * 100}%` }}
                >
                  <div className="timer-ring" aria-hidden="true" />
                  <div className="timer-inner">
                    <div className="timer-label">Time</div>
                    <div className="timer-value">{timeLeft}s</div>
                  </div>
                </div>
              </div>
            )}

            <div className="question-text">{question}</div>
            
            {screen === 'question' && revealedCount > 0 && (
              <div className="answers-grid">
                {answers.slice(0, revealedCount).map((answer) => (
                  <button
                    key={answer.id}
                    className={`answer-button ${selectedAnswer?.id === answer.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerClick(answer)}
                    style={{ '--answer-color': answer.color }}
                  >
                    <span className="answer-letter">{answer.id}</span>
                    <span className="answer-text">{answer.text}</span>
                  </button>
                ))}
              </div>
            )}

            {screen === 'question' && revealedCount < 4 && (
              <div className="answers-wait" aria-live="polite">
                Loading option {String.fromCharCode(65 + revealedCount)} for Miss Saanvi Sharma…
              </div>
            )}

            {/* Result display */}
            {screen === 'result' && selectedAnswer && (
              <div className="result-container">
                <div className="result-icon">😻💖</div>
                <h2 className="result-title">Correct Answer, Miss Saanvi Sharma!</h2>
                <p className="result-message">
                  You chose: <strong>{selectedAnswer.text}</strong>
                </p>
                <p className="result-submessage">
                  <strong>
                    You&apos;ve won my heart forever.<br/>
                    Here is the winning prize: 3 Billion Hugs and Kisses.
                  </strong>
                </p>
                <div className="celebration-text">
                  I Love you Saanvi! You&apos;re my forever prize. 💝
                </div>
              </div>
            )}
          </div>
        )}

        {/* Intro animation */}
        {screen === 'intro' && (
          <div className="intro-container">
            <div className="intro-heart">💕</div>
            <h2 className="intro-text">For the one and only, Saanvi</h2>
            <h1 className="intro-title">Saanvi, Will You Be My Valentine?</h1>
            <div className="intro-subtitle">The most important question of our love story</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
