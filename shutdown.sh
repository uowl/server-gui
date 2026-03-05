#!/bin/bash

# Navigate to the script directory
cd "$(dirname "$0")"

PID_FILE="app.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "❌ No PID file found. Is the application running?"
    exit 1
fi

PID=$(cat "$PID_FILE")

echo "🛑 Stopping Server GUI (PID: $PID)..."
kill $PID

if [ $? -eq 0 ]; then
    rm "$PID_FILE"
    echo "✅ Application stopped successfully."
else
    echo "❌ Failed to stop the application. You might need to kill it manually."
fi
