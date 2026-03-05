@echo off
set PORT=5173

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT% ^| findstr LISTENING') do (
    echo Killing process %%a on port %PORT%...
    taskkill /F /PID %%a
    goto :done
)

echo No process found on port %PORT%

:done
pause
