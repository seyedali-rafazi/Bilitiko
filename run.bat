@echo off
echo ====================================
echo Starting Aircraft Tickets App
echo ====================================
echo.

cd /d "%~dp0"

echo Starting development server...
echo The app will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

@REM Made with Bob
