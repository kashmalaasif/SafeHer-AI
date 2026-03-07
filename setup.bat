@echo off
echo ========================================
echo   SafeHer AI - Quick Setup Script
echo ========================================
echo.

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found! Install from python.org
    pause
    exit /b 1
)
echo [OK] Python found

:: Check Node
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found! Install from nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js found

:: Setup Backend
echo.
echo [1/4] Setting up backend...
cd backend
pip install -r requirements.txt
cd ..

:: Setup Frontend
echo.
echo [2/4] Setting up frontend...
cd frontend
call npm install
cd ..

:: Create .env if not exists
echo.
echo [3/4] Checking environment...
if not exist .env (
    copy .env.example .env
    echo [OK] Created .env from template
) else (
    echo [OK] .env already exists
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the app, run in separate terminals:
echo.
echo   Backend:  cd backend ^&^& uvicorn main:app --reload
echo   Frontend: cd frontend ^&^& npm start
echo.
echo Then open: http://localhost:3000
echo.
pause
