import React, { useState } from 'react';
import Badge from './Common/Badge.jsx';
import { SUBJECT_OPTIONS } from '../data/initialData.js';

export default function TasksPage({
  tasks = [],
  onAddTask,
  onToggleTask,
  onDeleteTask
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    onAddTask({
      title: title.trim(),
      subject,
      priority
    });

    setTitle('');
    setError('');
  };

  // Filter tasks based on selected tab
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="tasks-page-container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Study Tasks
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Organize your daily study goals by subject and priority. Check them off as you conquer each topic.
        </p>
      </div>

      {/* Add Task Form */}
      <div className="form-card">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>➕</span>
          <span>Add New Study Task</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="task-title-input" className="form-label">
                Task Title / Topic *
              </label>
              <input
                id="task-title-input"
                type="text"
                className="input-control"
                placeholder="e.g. Implement Dijkstra's Algorithm, Solve Calculus Chapter 3..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-subject-select" className="form-label">
                Subject
              </label>
              <select
                id="task-subject-select"
                className="select-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {SUBJECT_OPTIONS.map(subj => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">
                Priority
              </label>
              <select
                id="task-priority-select"
                className="select-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
            </div>

            <button
              id="btn-add-task-submit"
              type="submit"
              className="btn-primary"
            >
              Add Task
            </button>
          </div>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.6rem' }}>
              ⚠️ {error}
            </p>
          )}
        </form>
      </div>

      {/* Filter & Task List */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            id="filter-all"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            id="filter-pending"
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button
            id="filter-completed"
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredTasks.length}</strong> {filter} task{filteredTasks.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Task Cards List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {filter === 'completed' ? '⏳' : '🎉'}
          </div>
          <p style={{ fontSize: '1.05rem', fontWeight: 600 }}>
            {filter === 'completed'
              ? 'No completed tasks yet. Keep studying!'
              : filter === 'pending'
              ? 'All pending tasks done! Time for a break or a quick quiz.'
              : 'No tasks found. Add a new task above!'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-left">
                <button
                  id={`task-toggle-${task.id}`}
                  className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => onToggleTask(task.id)}
                  title={task.completed ? 'Mark pending' : 'Mark completed'}
                >
                  {task.completed ? '✓' : ''}
                </button>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="task-title" title={task.title}>
                    {task.title}
                  </div>
                  <div className="task-meta">
                    <Badge type="subject">{task.subject}</Badge>
                    <Badge type={task.priority}>{task.priority}</Badge>
                    {task.completed && (
                      <Badge type="completed">Done</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="task-right">
                <button
                  id={`task-delete-${task.id}`}
                  className="btn-icon"
                  onClick={() => onDeleteTask(task.id)}
                  title="Delete task"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
