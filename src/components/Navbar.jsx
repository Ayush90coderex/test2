import React from 'react';

export default function Navbar({ activeTab, setActiveTab, tasks = [], onResetDemo }) {
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="brand" onClick={() => setActiveTab('dashboard')} title="StudyMate Dashboard">
          <div className="brand-icon">🎓</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-title">StudyMate</span>
              <span className="brand-badge">Hackathon MVP</span>
            </div>
          </div>
        </div>

        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            id="nav-tab-dashboard"
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>

          <button
            id="nav-tab-tasks"
            className={`nav-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <span>📝</span>
            <span>Tasks</span>
            {pendingCount > 0 && (
              <span className="nav-badge-count">{pendingCount}</span>
            )}
          </button>

          <button
            id="nav-tab-subjects"
            className={`nav-tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <span>📚</span>
            <span>Subjects</span>
          </button>

          <button
            id="nav-tab-quiz"
            className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <span>⚡</span>
            <span>Quick Quiz</span>
          </button>
        </nav>

        <div className="nav-actions">
          <button
            id="btn-reset-demo"
            className="btn-ghost"
            onClick={onResetDemo}
            title="Restore sample demonstration data"
          >
            <span>↺</span>
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </header>
  );
}
