#!/bin/bash

# Navigate to the script directory
cd "$(dirname "$0")"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm could not be found. Please install Node.js and npm."
    exit 1
fi

# Handle flags
MODE="dev"
for arg in "$@"; do
    case $arg in
        --prod)
            MODE="prod"
            shift
            ;;
        --dev)
            MODE="dev"
            shift
            ;;
    esac
done

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found. Installing dependencies..."
    npm install
fi

# Run the application based on mode
if [ "$MODE" = "prod" ]; then
    echo "🏗️ Building for production..."
    npm run build
    echo "🚀 Starting the Server GUI application in production mode..."
    npm run preview
else
    echo "🚀 Starting the Server GUI application in development mode (hot reload)..."
    npm run dev
fi
