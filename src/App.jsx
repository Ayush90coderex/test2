import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TasksPage from './components/TasksPage.jsx';
import SubjectsPage from './components/SubjectsPage.jsx';
import QuizPage from './components/QuizPage.jsx';
import { storage } from './data/storage.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State initialized from localStorage
  const [tasks, setTasks] = useState(() => storage.getTasks());
  const [subjects, setSubjects] = useState(() => storage.getSubjects());
  const [quizResult, setQuizResult] = useState(() => storage.getQuizResult());
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Sync tasks to localStorage
  useEffect(() => {
    storage.setTasks(tasks);
  }, [tasks]);

  // Sync subjects to localStorage
  useEffect(() => {
    storage.setSubjects(subjects);
  }, [subjects]);

  // Sync quiz result to localStorage
  useEffect(() => {
    if (quizResult !== null) {
      storage.setQuizResult(quizResult);
    }
  }, [quizResult]);

  // Task actions
  const handleAddTask = ({ title, subject, priority }) => {
    const newTask = {
      id: 'task-' + Date.now(),
      title,
      subject,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task added: "${title}"`);
  };

  const handleToggleTask = (taskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const nextState = !task.completed;
          showToast(nextState ? `Marked "${task.title}" as completed! 🎉` : `Task marked pending.`);
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (taskToDelete) {
      showToast(`Deleted "${taskToDelete.title}"`);
    }
  };

  // Subject actions
  const handleUpdateSubjectProgress = (subjectId, newProgress) => {
    setSubjects(prev =>
      prev.map(sub => {
        if (sub.id === subjectId) {
          return { ...sub, progress: newProgress };
        }
        return sub;
      })
    );
    const updatedSub = subjects.find(s => s.id === subjectId);
    if (updatedSub) {
      showToast(`Updated ${updatedSub.name} progress to ${newProgress}%`);
    }
  };

  // Quiz actions
  const handleSaveQuizResult = (result) => {
    setQuizResult(result);
    showToast(`Quiz completed! You scored ${result.score}/${result.total}`);
  };

  // Reset demo data
  const handleResetDemo = () => {
    const { tasks: defaultTasks, subjects: defaultSubjects, quizResult: defaultQuiz } = storage.resetDefaults();
    setTasks(defaultTasks);
    setSubjects(defaultSubjects);
    setQuizResult(defaultQuiz);
    showToast('Reset sample demo data successfully! 🔄');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasks={tasks}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            subjects={subjects}
            quizResult={quizResult}
            onToggleTask={handleToggleTask}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksPage
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectsPage
            subjects={subjects}
            onUpdateSubjectProgress={handleUpdateSubjectProgress}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizPage
            latestResult={quizResult}
            onSaveQuizResult={handleSaveQuizResult}
          />
        )}
      </main>

      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <span>🔔</span>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
