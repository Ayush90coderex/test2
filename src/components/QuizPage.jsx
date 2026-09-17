import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/initialData.js';

export default function QuizPage({
  latestResult,
  onSaveQuizResult
}) {
  // selectedAnswers: { [questionId]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(latestResult ? true : false);
  const [currentResult, setCurrentResult] = useState(latestResult);
  const [validationError, setValidationError] = useState('');

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verify all questions are answered
    const unansweredCount = QUIZ_QUESTIONS.filter(q => selectedAnswers[q.id] === undefined).length;
    if (unansweredCount > 0) {
      setValidationError(`Please answer all questions before submitting (${unansweredCount} remaining).`);
      return;
    }

    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    let badge = 'Needs Practice';
    let message = 'Keep reviewing your subjects and try again to build mastery!';
    if (score === 5) {
      badge = 'Perfection';
      message = 'Outstanding! You have complete mastery of CS core fundamentals! 🏆';
    } else if (score >= 4) {
      badge = 'Excellent';
      message = 'Great job! Strong foundation across core subjects. 🎉';
    } else if (score >= 3) {
      badge = 'Good';
      message = 'Solid attempt! Revisit the topics you missed to lock in your knowledge. 💡';
    }

    const result = {
      score,
      total: QUIZ_QUESTIONS.length,
      percentage: Math.round((score / QUIZ_QUESTIONS.length) * 100),
      badge,
      message,
      selectedAnswers,
      date: new Date().toLocaleDateString()
    };

    setCurrentResult(result);
    setSubmitted(true);
    setValidationError('');
    onSaveQuizResult(result);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentResult(null);
    setValidationError('');
  };

  return (
    <div className="quiz-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Quick Computer Science Quiz
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          5 essential questions across Data Structures, DBMS, Computer Networks & Java.
        </p>
      </div>

      {/* Result Hero Banner if Submitted */}
      {submitted && currentResult && (
        <div className="quiz-result-hero">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {currentResult.score >= 4 ? '🎉' : currentResult.score >= 3 ? '👏' : '📖'}
          </div>
          <div className="quiz-score-badge">
            {currentResult.score} / {currentResult.total}
          </div>
          <h2 className="quiz-result-msg">{currentResult.message}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Score: <strong>{currentResult.percentage}%</strong> • Saved to your StudyMate local profile
          </p>

          <button
            id="btn-retake-quiz"
            className="btn-primary"
            onClick={handleRetake}
          >
            <span>🔄 Retake Quiz</span>
          </button>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit}>
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const userAnswer = submitted
            ? currentResult?.selectedAnswers?.[q.id]
            : selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className="quiz-question-card"
              style={{
                borderColor: submitted
                  ? isCorrect
                    ? 'rgba(16, 185, 129, 0.4)'
                    : 'rgba(239, 68, 68, 0.4)'
                  : undefined
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="quiz-question-num">Question {qIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                {submitted && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)',
                      color: isCorrect ? '#34d399' : '#f87171'
                    }}
                  >
                    {isCorrect ? '✓ Correct (+1)' : '✗ Incorrect (0)'}
                  </span>
                )}
              </div>

              <h3 className="quiz-question-title">{q.question}</h3>

              <div className="quiz-options-list">
                {q.options.map((option, optIdx) => {
                  let optionClass = 'quiz-option';
                  const isSelected = userAnswer === optIdx;

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionClass += ' correct';
                    } else if (isSelected && !isCorrect) {
                      optionClass += ' incorrect';
                    }
                  } else if (isSelected) {
                    optionClass += ' selected';
                  }

                  return (
                    <div
                      key={optIdx}
                      id={`quiz-q${q.id}-opt${optIdx}`}
                      className={optionClass}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                    >
                      <div className="option-indicator">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span style={{ flex: 1 }}>{option}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
                          Correct Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div className="quiz-explanation">
                  <strong>Explanation: </strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {validationError && (
          <div style={{ padding: '0.85rem 1rem', background: 'var(--danger-bg)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
            ⚠️ {validationError}
          </div>
        )}

        {!submitted && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              id="btn-submit-quiz"
              type="submit"
              className="btn-primary"
              style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem' }}
            >
              Submit & Check Answers 🚀
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
