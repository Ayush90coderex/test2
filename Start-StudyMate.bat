@echo off
title StudyMate Dev Server
echo ====================================================
echo          Starting StudyMate - College Hackathon App
echo ====================================================
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting local development server...
start http://localhost:5173
call npm run dev
pause
