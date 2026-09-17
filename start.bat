@echo off
set "PATH=%LOCALAPPDATA%\Programs\node-v20.18.0-win-x64;%PATH%"
cd /d "%~dp0"
echo ====================================================
echo Starting CampusAI - AI-Based College Event Management System
echo URL: http://localhost:5173
echo ====================================================
npm run dev
pause
