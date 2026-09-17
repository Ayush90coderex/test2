import { DEFAULT_TASKS, DEFAULT_SUBJECTS } from './initialData.js';

const STORAGE_KEYS = {
  TASKS: 'studymate_tasks',
  SUBJECTS: 'studymate_subjects',
  QUIZ_RESULT: 'studymate_quiz_result'
};

export const storage = {
  getTasks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) return DEFAULT_TASKS;
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
      return DEFAULT_TASKS;
    }
  },

  setTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  },

  getSubjects: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      if (!data) return DEFAULT_SUBJECTS;
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load subjects from localStorage', e);
      return DEFAULT_SUBJECTS;
    }
  },

  setSubjects: (subjects) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    } catch (e) {
      console.error('Failed to save subjects to localStorage', e);
    }
  },

  getQuizResult: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULT);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load quiz result from localStorage', e);
      return null;
    }
  },

  setQuizResult: (result) => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULT, JSON.stringify(result));
    } catch (e) {
      console.error('Failed to save quiz result to localStorage', e);
    }
  },

  resetDefaults: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULT);
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
    return {
      tasks: DEFAULT_TASKS,
      subjects: DEFAULT_SUBJECTS,
      quizResult: null
    };
  }
};
