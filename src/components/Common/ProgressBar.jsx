import React from 'react';

export default function ProgressBar({ value = 0, variant = 'primary', height = 10, showLabel = false }) {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="progress-container">
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{clampedValue}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${variant}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
