@echo off
set "PATH=%LOCALAPPDATA%\Programs\git\cmd;%PATH%"
cd /d "%~dp0"
echo ====================================================
echo Pushing CampusAI to GitHub:
echo https://github.com/srivarshanbala887-hash/Srivarshan.git
echo ====================================================
echo.
echo If prompted, please enter your GitHub Username and Personal Access Token (PAT).
echo.
git push -u origin main
echo.
pause
