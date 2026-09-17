import React from 'react';
import ProgressBar from './Common/ProgressBar.jsx';

export default function SubjectsPage({
  subjects = [],
  onUpdateSubjectProgress
}) {
  const getStatusBadge = (progress) => {
    if (progress >= 80) {
      return {
        label: 'Mastered 🏆',
        style: { background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }
      };
    }
    if (progress >= 50) {
      return {
        label: 'On Track ⚡',
        style: { background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.4)' }
      };
    }
    return {
      label: 'Needs Focus 📖',
      style: { background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)' }
    };
  };

  return (
    <div className="subjects-page-container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Subject Progress
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Track and adjust your syllabus mastery across each core engineering subject. Tap controls to update your progress.
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid-2">
        {subjects.map(subject => {
          const status = getStatusBadge(subject.progress);

          return (
            <div key={subject.id} className="subject-card">
              <div className="subject-header">
                <div className="subject-info">
                  <div className="subject-icon">{subject.icon}</div>
                  <div>
                    <h2 className="subject-name">{subject.name}</h2>
                    <p className="subject-desc">{subject.description}</p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    ...status.style
                  }}
                >
                  {status.label}
                </span>
              </div>

              {/* Progress Bar & Percentage */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Syllabus Completion</span>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: subject.progress >= 80 ? '#34d399' : 'var(--text-main)' }}>
                    {subject.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={subject.progress}
                  variant={subject.progress >= 80 ? 'success' : 'primary'}
                  height={10}
                />
              </div>

              {/* Simple Controls */}
              <div className="subject-controls">
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    id={`btn-sub-${subject.id}-dec`}
                    className="btn-ctrl"
                    disabled={subject.progress <= 0}
                    onClick={() => onUpdateSubjectProgress(subject.id, Math.max(0, subject.progress - 10))}
                    title="Decrease progress by 10%"
                  >
                    −10%
                  </button>
                  <button
                    id={`btn-sub-${subject.id}-inc`}
                    className="btn-ctrl"
                    style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                    disabled={subject.progress >= 100}
                    onClick={() => onUpdateSubjectProgress(subject.id, Math.min(100, subject.progress + 10))}
                    title="Increase progress by 10%"
                  >
                    +10%
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    className="btn-ctrl"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                    onClick={() => onUpdateSubjectProgress(subject.id, 50)}
                  >
                    50%
                  </button>
                  <button
                    className="btn-ctrl"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                    onClick={() => onUpdateSubjectProgress(subject.id, 100)}
                  >
                    100%
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
