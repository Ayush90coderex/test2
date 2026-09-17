import React from 'react';
import ProgressBar from './Common/ProgressBar.jsx';
import Badge from './Common/Badge.jsx';

export default function Dashboard({
  tasks = [],
  subjects = [],
  quizResult = null,
  onToggleTask,
  onNavigate
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate average subject mastery
  const avgSubjectProgress = subjects.length > 0
    ? Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length)
    : 0;

  // High priority focus tasks that are pending
  const focusTasks = tasks.filter(t => !t.completed && t.priority === 'High');

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard-container">
      {/* Greeting Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="greeting-title">
            <span>{getGreeting()}, Student!</span>
            <span role="img" aria-label="sparkles">✨</span>
          </h1>
          <p className="greeting-subtitle">
            Here's your study roadmap for today. Stay focused, complete your tasks, and test your knowledge!
          </p>
        </div>

        <button
          id="btn-dash-start-quiz"
          className="btn-primary"
          onClick={() => onNavigate('quiz')}
        >
          <span>⚡ Take Quick Quiz</span>
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="metric-stat-card">
          <div className="metric-header">
            <span>Today's Progress</span>
            <div className="metric-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              📈
            </div>
          </div>
          <div className="metric-value">{progressPercent}%</div>
          <div style={{ marginTop: '0.5rem' }}>
            <ProgressBar value={progressPercent} variant="primary" height={6} />
          </div>
          <div className="metric-subtext">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-header">
            <span>Pending Tasks</span>
            <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              ⏳
            </div>
          </div>
          <div className="metric-value" style={{ color: pendingTasks > 0 ? '#fbbf24' : '#10b981' }}>
            {pendingTasks}
          </div>
          <div className="metric-subtext">
            {pendingTasks === 0 ? '🎉 All caught up!' : 'Tasks needing your focus today'}
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-header">
            <span>Completed Tasks</span>
            <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              ✅
            </div>
          </div>
          <div className="metric-value" style={{ color: '#34d399' }}>
            {completedTasks}
          </div>
          <div className="metric-subtext">
            Completed study objectives
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-header">
            <span>Latest Quiz Score</span>
            <div className="metric-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              🎯
            </div>
          </div>
          <div className="metric-value" style={{ color: quizResult ? '#a5b4fc' : 'var(--text-dim)' }}>
            {quizResult ? `${quizResult.score}/${quizResult.total}` : '— / 5'}
          </div>
          <div className="metric-subtext">
            {quizResult
              ? `${Math.round((quizResult.score / quizResult.total) * 100)}% accuracy (${quizResult.badge})`
              : 'Take the 5-min CS Quiz'}
          </div>
        </div>
      </div>

      {/* Main Dashboard Two-Column Layout */}
      <div className="grid-2">
        {/* Left Column: Today's Focus & Study Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Focus Box */}
          <div className="card focus-card">
            <div className="focus-badge">
              <span>🎯</span>
              <span>Today's High Priority Focus</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Tackle these high-impact tasks first to make the biggest academic breakthrough today:
            </p>

            {focusTasks.length > 0 ? (
              <div className="focus-list">
                {focusTasks.map(task => (
                  <div key={task.id} className="focus-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button
                        className="custom-checkbox"
                        onClick={() => onToggleTask(task.id)}
                        title="Mark as done"
                      >
                        {task.completed ? '✓' : ''}
                      </button>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{task.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <Badge type="subject">{task.subject}</Badge>
                          <Badge type="High">High Priority</Badge>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn-ctrl"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                      onClick={() => onToggleTask(task.id)}
                    >
                      Mark Done
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#34d399', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🌟</span>
                <span>Awesome! All high-priority tasks are completed for today.</span>
              </div>
            )}
          </div>

          {/* Today's Study Tasks List */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Today's Study Tasks</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick check-off list</span>
              </div>
              <button
                id="btn-dash-view-tasks"
                className="btn-ghost"
                onClick={() => onNavigate('tasks')}
              >
                Manage Tasks →
              </button>
            </div>

            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>No study tasks added yet.</p>
                <button
                  className="btn-primary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => onNavigate('tasks')}
                >
                  Add Your First Task
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-left">
                      <div
                        className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                        onClick={() => onToggleTask(task.id)}
                        title={task.completed ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {task.completed && '✓'}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="task-title">{task.title}</div>
                        <div className="task-meta">
                          <Badge type="subject">{task.subject}</Badge>
                          <Badge type={task.priority}>{task.priority}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Subject Progress Overview & Quick Quiz CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Subject Progress Overview */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Subject Progress</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Average Mastery: <strong style={{ color: 'var(--primary)' }}>{avgSubjectProgress}%</strong>
                </span>
              </div>
              <button
                id="btn-dash-view-subjects"
                className="btn-ghost"
                onClick={() => onNavigate('subjects')}
              >
                View Subjects →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {subjects.map(subject => (
                <div key={subject.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <span>{subject.icon}</span>
                      <span>{subject.name}</span>
                    </span>
                    <span style={{ fontWeight: 700, color: subject.progress >= 75 ? '#34d399' : '#a5b4fc' }}>
                      {subject.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={subject.progress}
                    variant={subject.progress >= 75 ? 'success' : 'primary'}
                    height={8}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick CS Quiz Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1))', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                🧠
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Test Your CS Knowledge</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5 quick questions • Real-time scoring</span>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Reinforce what you studied today across Data Structures, DBMS, Networks, and Java with an instant assessment.
            </p>
            <button
              id="btn-dash-quiz-cta"
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => onNavigate('quiz')}
            >
              {quizResult ? 'Retake Quiz to Improve Score' : 'Start Quick Quiz Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
