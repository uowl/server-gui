param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "prod")]
    [string]$Mode = "dev"
)

# Handle --dev/--prod from command line if passed as raw arguments
if ($args -contains "--prod") { $Mode = "prod" }
if ($args -contains "--dev") { $Mode = "dev" }

# Set working directory to the script's location
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $PSScriptRoot

# Check if node is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ node.exe could not be found. Please install Node.js." -ForegroundColor Red
    Read-Host "Press Enter to continue..."
    exit 1
}

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm could not be found. Please install Node.js and npm." -ForegroundColor Red
    Read-Host "Press Enter to continue..."
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 node_modules not found. Installing dependencies..." -ForegroundColor Cyan
    npm install
}

# Run the application based on mode
if ($Mode -eq "prod") {
    Write-Host "🏗️ Building for production..." -ForegroundColor Cyan
    npm run build
    Write-Host "🚀 Starting the Server GUI application in production mode..." -ForegroundColor Green
    npm run preview
} else {
    Write-Host "🚀 Starting the Server GUI application in development mode (hot reload)..." -ForegroundColor Green
    npm run dev
}

Read-Host "Press Enter to continue..."
