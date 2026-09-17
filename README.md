# 🎓 StudyMate - College Hackathon Project

> **Theme:** Education  
> **Problem:** College students often struggle with deciding what to study each day, keeping track of their syllabus progress across diverse engineering subjects, and assessing their topic retention.  
> **Solution:** A clean, responsive, and distraction-free study planning application with task prioritization, syllabus progress meters, and an instant Computer Science retention quiz.

---

## 🚀 Key Features

1. **Dashboard**
   - Dynamic time-based greeting (*Good morning / afternoon / evening*).
   - High-level metric cards: Overall study progress bar, completed tasks counter, pending tasks counter, and latest quiz score.
   - **"Today's High Priority Focus"**: Direct access to urgent study topics with one-click completion.
   - Quick overview of today's study tasks and subject progress meters.

2. **Study Tasks Page**
   - Add new study tasks with title, subject, and priority (*High 🔥, Medium ⚡, Low 🌱*).
   - Interactive checkbox toggle with completed strike-through and celebration feedback.
   - Filter tasks by **All**, **Pending**, or **Completed**.
   - Delete task action.

3. **Subject Progress Page**
   - 5 core subjects: **Java**, **Data Structures**, **DBMS**, **Computer Networks**, and **Mathematics**.
   - Syllabus mastery status tags (*Needs Focus*, *On Track*, *Mastered 🏆*).
   - Simple controls: `+10%`, `-10%`, `50%`, `100%`.

4. **Quick CS Quiz**
   - 5 multiple-choice questions covering core CS fundamentals.
   - Instant scoring with percentage and mastery badge.
   - Detailed question review with correct answers highlighted in green, mistakes in red, and educational explanations.
   - "Retake Quiz" functionality.

5. **Zero-Config LocalStorage**
   - All tasks, completion statuses, subject percentages, and quiz scores persist in browser `localStorage`.
   - **Reset Demo Data** button in the header navbar to reset sample data anytime during live hackathon demos.

---

## 💻 Quick Start

### Option 1: Double Click
Simply double-click `Start-StudyMate.bat` inside this folder!

### Option 2: Terminal
```bash
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 📁 Project Structure

```
StudyMate/
├── index.html                 # Main HTML entry point
├── package.json               # Dependencies and scripts (React + Vite)
├── vite.config.js             # Vite configuration
├── Start-StudyMate.bat        # One-click startup script
├── dist/                      # Pre-compiled production build bundle
└── src/
    ├── main.jsx               # React DOM entry
    ├── App.jsx                # App layout, state, routing, and notifications
    ├── index.css              # Custom responsive CSS design system
    ├── data/
    │   ├── initialData.js     # Default mock tasks, subjects, and quiz questions
    │   └── storage.js         # LocalStorage persistence wrapper
    └── components/
        ├── Navbar.jsx         # Header with branding and navigation tabs
        ├── Dashboard.jsx      # Metrics, Today's Focus, and Quick Actions
        ├── TasksPage.jsx      # Task creation, filtering, toggling, and deletion
        ├── SubjectsPage.jsx   # Subject cards with progress controls
        ├── QuizPage.jsx       # 5-question CS Quiz with scoring & explanations
        └── Common/
            ├── ProgressBar.jsx# Reusable animated gradient progress bar
            └── Badge.jsx      # Priority and subject pill badges
```
