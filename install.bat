@echo off
echo ====================================
echo Installing Aircraft Tickets App
echo ====================================
echo.

cd /d "%~dp0"

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ====================================
echo Installation completed successfully!
echo ====================================
echo.
echo To run the application, execute: npm run dev
echo Or double-click on run.bat
echo.
pause

@REM 
