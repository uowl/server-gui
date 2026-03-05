#!/bin/bash

# Script to kill process on port 5173

PORT=5173

PID=$(lsof -t -i:$PORT)

if [ -z "$PID" ]; then
    echo "No process found on port $PORT"
else
    echo "Killing process $PID on port $PORT..."
    kill -9 $PID
    echo "Done."
fi
