$Port = 5173

$Process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1

if ($Process) {
    Write-Host "Killing process $($Process.OwningProcess) on port $Port..."
    Stop-Process -Id $Process.OwningProcess -Force
    Write-Host "Done."
} else {
    Write-Host "No process found on port $Port"
}
