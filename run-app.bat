@echo off
setlocal

:: Get the directory where the script is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

:: Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ node.exe could not be found. Please install Node.js.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ npm could not be found. Please install Node.js and npm.
    pause
    exit /b 1
)

:: Handle flags
set "MODE=dev"
if "%~1"=="--prod" set "MODE=prod"
if "%~1"=="--dev" set "MODE=dev"

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo 📦 node_modules not found. Installing dependencies...
    call npm install
)

:: Run the application based on mode
if "%MODE%"=="prod" (
    echo 🏗️ Building for production...
    call npm run build
    echo 🚀 Starting the Server GUI application in production mode...
    call npm run preview
) else (
    echo 🚀 Starting the Server GUI application in development mode (hot reload)...
    call npm run dev
)

pause
