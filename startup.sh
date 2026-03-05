#!/bin/bash

# Navigate to the script directory
cd "$(dirname "$0")"

PID_FILE="app.pid"
LOG_FILE="app.log"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
        echo "⚠️ Application is already running (PID: $PID)"
        exit 1
    else
        echo "🧹 Cleaning up stale PID file."
        rm "$PID_FILE"
    fi
fi

echo "🚀 Starting Server GUI in the background..."
nohup npm run dev > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

echo "✅ Application started with PID: $(cat $PID_FILE)"
echo "📝 Logs are being written to $LOG_FILE"
