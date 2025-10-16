Write-Host "Starting WebCrate Desktop App..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Installing dependencies if needed..." -ForegroundColor Yellow
npm install
Write-Host ""
Write-Host "Launching desktop app in development mode..." -ForegroundColor Green
npm run electron:dev
